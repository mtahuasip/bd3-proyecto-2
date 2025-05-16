from datetime import datetime, timedelta
from bson import ObjectId
from pymongo.errors import PyMongoError
from slugify import slugify
from src.extensions import api, mongo
from src.utils.utils import verify_id


class MovieDAO(object):
    def get_all(self):
        try:
            return list(mongo.db.movies.find())
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

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
            return list(mongo.db.movies.aggregate([{"$sample": {"size": limit}}]))
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get_most_viewed(self, timeframe, limit):
        try:
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
                    "Timeframe inválido. Usa 'day', 'week', 'month' o 'year'"
                )

            start_iso = start_time.isoformat()
            query = {
                "$or": [
                    {"created_at": {"$gte": start_time}},
                    {"created_at": {"$gte": start_iso}},
                ]
            }

            return list(mongo.db.movies.find(query).sort("views", -1).limit(limit))

            # return list(
            #     mongo.db.movies.find({"created_at": {"$gte": start_time}})
            #     .sort("views", -1)
            #     .limit(limit)
            # )

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


movie_dao = MovieDAO()
