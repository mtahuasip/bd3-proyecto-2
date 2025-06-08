from datetime import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
from src.extensions import api, mongo, redis
from src.utils.utils import verify_id


class ReactionDAO(object):
    def get_all(self):
        try:
            return list(mongo.db.reactions.find())
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get(self, id):
        verify_id(id, api)

        try:
            reaction_found = mongo.db.reactions.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

        if reaction_found:
            return reaction_found

        api.abort(404, "Reacción no encontrada")

    def create(self, data):
        try:
            new_reaction = {
                "type": data["type"],
                "user": data["user"],
                "movie": data["movie"],
                "created_at": datetime.now(),
                "updated_at": datetime.now(),
            }

            result = mongo.db.reactions.insert_one(new_reaction)

            # === REDIS ===
            video_id = data["movie"]["_id"]
            user_id = data["user"]["_id"]
            reaction_type = data["type"]  # "like" o "dislike"

            if reaction_type == "like":
                redis.hset(f"video:{video_id}:likes", user_id, 1)
            elif reaction_type == "dislike":
                redis.hset(f"video:{video_id}:dislikes", user_id, 1)

            # Aumentar popularidad
            redis.zincrby("videos:popular", 1, video_id)

            return mongo.db.reactions.find_one({"_id": result.inserted_id})

        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def update(self, id, data):
        verify_id(id, api)
        old = self.get(id)

        try:
            reaction_update = {
                "type": data["type"],
                "updated_at": datetime.now(),
            }

            mongo.db.reactions.update_one(
                {"_id": ObjectId(id)},
                {"$set": reaction_update},
            )

            # Actualizar en Redis solo si cambia el tipo
            if data["type"] != old["type"]:
                video_id = old["movie"]
                user_id = old["user"]

                # Eliminar la reacción anterior
                if old["type"] == "like":
                    redis.hdel(f"video:{video_id}:likes", user_id)
                elif old["type"] == "dislike":
                    redis.hdel(f"video:{video_id}:dislikes", user_id)

                # Añadir la nueva
                if data["type"] == "like":
                    redis.hset(f"video:{video_id}:likes", user_id, 1)
                elif data["type"] == "dislike":
                    redis.hset(f"video:{video_id}:dislikes", user_id, 1)

            return mongo.db.reactions.find_one({"_id": ObjectId(id)})

        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def delete(self, id):
        verify_id(id, api)
        reaction = self.get(id)

        try:
            mongo.db.reactions.delete_one({"_id": ObjectId(id)})

            # === REDIS ===
            video_id = reaction["movie"]
            user_id = reaction["user"]
            reaction_type = reaction["type"]

            if reaction_type == "like":
                redis.hdel(f"video:{video_id}:likes", user_id)
            elif reaction_type == "dislike":
                redis.hdel(f"video:{video_id}:dislikes", user_id)

            redis.zincrby("videos:popular", -1, video_id)

        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")


reaction_dao = ReactionDAO()
