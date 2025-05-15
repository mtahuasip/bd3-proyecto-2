from datetime import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
from src.extensions import api, mongo
from src.utils.utils import verify_id


class FavoriteDAO(object):
    def get_all(self):
        try:
            return list(mongo.db.favorites.find())
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get(self, id):
        verify_id(id, api)

        try:
            favorite_found = mongo.db.favorites.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

        if favorite_found:
            return favorite_found

        api.abort(404, "Favorito no encontrado")

    def create(self, data):
        if len(data["movies"]) == 0:
            api.abort(400, "El campo 'movies' no puede ser una lista vacía")

        try:
            new_favorite = {
                "user": data["user"],
                "movies": data["movies"],
                "created_at": datetime.now(),
                "updated_at": datetime.now(),
            }
            result = mongo.db.favorites.insert_one(new_favorite)

            return mongo.db.favorites.find_one({"_id": result.inserted_id})

        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    # def update(self, id, data):
    #     verify_id(id, api)
    #     self.get(id)

    #     try:
    #         favorite_update = {
    #             "movies": data["movies"],
    #             "updated_at": datetime.now(),
    #         }

    #         mongo.db.favorites.update_one(
    #             {"_id": ObjectId(id)},
    #             {"$set": favorite_update},
    #         )

    #         return mongo.db.favorites.find_one({"_id": ObjectId(id)})
    #     except PyMongoError as e:
    #         print(f"❌ Error: {e}")
    #         api.abort(500, "Error interno del servidor")

    def delete(self, id):
        verify_id(id, api)
        self.get(id)

        try:
            mongo.db.favorites.delete_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")


favorite_dao = FavoriteDAO()
