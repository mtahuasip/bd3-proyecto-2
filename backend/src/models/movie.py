from datetime import datetime
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
            print(f"Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get(self, id):
        verify_id(id, api)

        try:
            movie_found = mongo.db.movies.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"Error de MongoDB: {e}")
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
            print(f"Error: {e}")
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
            print(f"Error: {e}")
            api.abort(500, "Error interno del servidor")

    def delete(self, id):
        verify_id(id, api)
        self.get(id)

        try:
            mongo.db.movies.delete_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"Error: {e}")
            api.abort(500, "Error interno del servidor")


movie_dao = MovieDAO()
