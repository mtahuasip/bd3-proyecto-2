from datetime import datetime, timedelta
from bson import ObjectId
from pymongo.errors import PyMongoError
from slugify import slugify
from src.extensions import api, mongo, redis
from src.utils.utils import verify_id, movies_build_filter_query


class MovieDAO(object):
    def get_all(self, title=None, categories=None, year=None, page=None, per_page=None):
        try:
            filter_query = movies_build_filter_query(title, categories, year)

            if page is not None and page > 0:
                items_per_page = per_page if per_page and per_page > 0 else 10
                skip = (page - 1) * items_per_page
                return list(
                    mongo.db.movies.find(filter_query).skip(skip).limit(items_per_page)
                )
            else:
                return list(mongo.db.movies.find(filter_query))

        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    # def get_all(self):
    #     try:
    #         return list(mongo.db.movies.find())
    #     except PyMongoError as e:
    #         print(f"❌ Error de MongoDB: {e}")
    #         api.abort(500, "Error interno del servidor")

    def get(self, id):
        verify_id(id, api)

        try:
            movie_found = mongo.db.movies.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

        if movie_found:
            return movie_found

        api.abort(404, "Película no encontrado")

    def create(self, data):
        if len(data["categories"]) == 0:
            api.abort(400, "El campo 'categories' no puede ser una lista vacía")

        try:
            new_movie = {
                "title": data["title"],
                "description": data["description"],
                "duration": data["duration"],
                "year": data["year"],
                "categories": data["categories"],
                "views": 0,
                "cover_url": None,
                "poster_url": None,
                "thumbnail_url": None,
                "video_url": None,
                "slug": slugify(data["title"]),
                "last_view": None,
                "created_at": datetime.now(),
                "updated_at": datetime.now(),
            }
            result = mongo.db.movies.insert_one(new_movie)

            return mongo.db.movies.find_one({"_id": result.inserted_id})

        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def update(self, id, data):
        verify_id(id, api)
        self.get(id)

        try:
            movie_update = {
                "title": data["title"],
                "description": data["description"],
                "duration": data["duration"],
                "year": data["year"],
                "categories": data["categories"],
                "slug": slugify(data["title"]),
                "updated_at": datetime.now(),
            }

            mongo.db.movies.update_one(
                {"_id": ObjectId(id)},
                {"$set": movie_update},
            )

            return mongo.db.movies.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def delete(self, id):
        verify_id(id, api)
        self.get(id)

        try:
            mongo.db.movies.delete_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def get_samples(self, limit):
        try:
            return list(mongo.db.movies.aggregate([{"$sample": {"size": limit}}]))
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get_recommended(self, limit):
        try:
            popular_count = int(limit * 0.7)
            random_count = limit - popular_count

            popular = list(
                mongo.db.movies.find().sort("views", -1).limit(popular_count)
            )
            random_movies = list(
                mongo.db.movies.aggregate([{"$sample": {"size": random_count}}])
            )

            return popular + random_movies
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get_most_viewed(self, timeframe, limit):
        try:
            if timeframe and timeframe != "all":
                now = datetime.now()

                if timeframe == "day":
                    start_time = now - timedelta(days=1)
                elif timeframe == "week":
                    start_time = now - timedelta(weeks=1)
                elif timeframe == "month":
                    start_time = now - timedelta(days=30)
                elif timeframe == "year":
                    start_time = now - timedelta(days=365)
                else:
                    raise ValueError(
                        "Timeframe inválido. Usa 'day', 'week', 'month', 'year' o 'all'"
                    )

                query = {"last_view": {"$gte": start_time}}

                return list(mongo.db.movies.find(query).sort("views", -1).limit(limit))
            else:
                print("all", list(mongo.db.movies.find(query)))

                return list(mongo.db.movies.find({}).sort("views", -1).limit(limit))

        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")
        except ValueError as e:
            api.abort(400, str(e))

    def get_years(self):
        try:
            years = mongo.db.movies.distinct("year")
            years = [int(y) for y in years if y and str(y).isdigit()]
            years.sort(reverse=True)
            result = [{"id": str(y), "year": y} for y in years]

            return result
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get_by_slug(self, slug):
        try:
            movie_found = mongo.db.movies.find_one({"slug": slug})
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

        if movie_found:
            return movie_found

        api.abort(404, "Película no encontrada")

    def update_last_views(self, id):
        verify_id(id, api)
        movie_found = self.get(id)

        try:
            views = movie_found["views"]
            movie_update = {
                "views": views + 1,
                "last_view": datetime.now(),
            }

            mongo.db.movies.update_one(
                {"_id": ObjectId(id)},
                {"$set": movie_update},
            )

            return mongo.db.movies.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def update_last_views_by_slug(self, slug):
        movie_found = self.get_by_slug(slug)

        try:
            views = movie_found["views"]
            movie_update = {
                "views": views + 1,
                "last_view": datetime.now(),
            }

            mongo.db.movies.update_one(
                {"slug": slug},
                {"$set": movie_update},
            )

            return mongo.db.movies.find_one({"slug": slug})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def get_total_pages(self, title=None, categories=None, year=None, per_page=None):
        try:
            filter_query = movies_build_filter_query(title, categories, year)

            total_items = mongo.db.movies.count_documents(filter_query)
            items_per_page = per_page if per_page and per_page > 0 else 10
            total_pages = (total_items + items_per_page - 1) // items_per_page
            return {"total_pages": total_pages}

        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def like_movie(self, movie_id, user_id):
        redis.sadd(f"movie:{movie_id}:likes", user_id)
        redis.srem(f"movie:{movie_id}:dislikes", user_id)

    def dislike_movie(self, movie_id, user_id):
        redis.sadd(f"movie:{movie_id}:dislikes", user_id)
        redis.srem(f"movie:{movie_id}:likes", user_id)

    def get_likes_dislikes(self, movie_id):
        likes = redis.scard(f"movie:{movie_id}:likes")
        dislikes = redis.scard(f"movie:{movie_id}:dislikes")
        return {"likes": likes, "dislikes": dislikes}

    def add_to_favorites(self, user_id, movie_id):
        redis.sadd(f"user:{user_id}:favorites", movie_id)

    def remove_from_favorites(self, user_id, movie_id):
        redis.srem(f"user:{user_id}:favorites", movie_id)

    def get_favorites(self, user_id):
        ids = redis.smembers(f"user:{user_id}:favorites")
        object_ids = [ObjectId(id.decode("utf-8")) for id in ids]
        return list(mongo.db.movies.find({"_id": {"$in": object_ids}}))

    def increment_popularity(self, movie_id):
        redis.zincrby("movie:ranking", 1, movie_id)

    def get_popular_movies(self, limit):
        top_movies = redis.zrevrange("movie:ranking", 0, limit - 1)
        object_ids = [ObjectId(id.decode("utf-8")) for id in top_movies]
        return list(mongo.db.movies.find({"_id": {"$in": object_ids}}))

    def get_cached_recommended(self, limit):
        key = f"movie:recommended:{limit}"
        cached = redis.get(key)
        if cached:
            import json

            return json.loads(cached)

        data = self.get_recommended(limit)
        redis.setex(key, timedelta(minutes=10), json.dumps(data, default=str))
        return data

    def get_cached_most_viewed(self, timeframe, limit):
        key = f"movie:most_viewed:{timeframe}:{limit}"
        cached = redis.get(key)
        if cached:
            import json

            return json.loads(cached)

        data = self.get_most_viewed(timeframe, limit)
        redis.setex(key, timedelta(minutes=10), json.dumps(data, default=str))
        return data

    def get_cached_years(self):
        key = "movie:years"
        cached = redis.get(key)
        if cached:
            import json

            return json.loads(cached)

        data = self.get_years()
        redis.setex(key, timedelta(hours=1), json.dumps(data, default=str))
        return data


movie_dao = MovieDAO()
