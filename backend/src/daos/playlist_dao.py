from datetime import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
from src.extensions import api, mongo
from src.utils.utils import verify_id


class PlaylistDAO(object):
    def get_all(self):
        try:
            return list(mongo.db.playlists.find())
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get(self, id):
        verify_id(id, api)

        try:
            favorite_found = mongo.db.playlists.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

        if favorite_found:
            return favorite_found

        api.abort(404, "Lista de reproducción no encontrada")

    def create(self, data):
        if len(data["movies"]) == 0:
            api.abort(400, "El campo 'movies' no puede ser una lista vacía")

        try:
            new_playlist = {
                "name": data["name"],
                "description": data["description"],
                "user": data["user"],
                "visibility": data["visibility"],
                "movies": data["movies"],
                "created_at": datetime.now(),
                "updated_at": datetime.now(),
            }
            result = mongo.db.playlists.insert_one(new_playlist)

            return mongo.db.playlists.find_one({"_id": result.inserted_id})

        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def update(self, id, data):
        verify_id(id, api)
        self.get(id)

        try:
            playlist_update = {
                "name": data["name"],
                "description": data["description"],
                "visibility": data["visibility"],
                "updated_at": datetime.now(),
            }

            mongo.db.playlists.update_one(
                {"_id": ObjectId(id)},
                {"$set": playlist_update},
            )

            return mongo.db.playlists.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def delete(self, id):
        verify_id(id, api)
        self.get(id)

        try:
            mongo.db.playlists.delete_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")


playlist_dao = PlaylistDAO()
