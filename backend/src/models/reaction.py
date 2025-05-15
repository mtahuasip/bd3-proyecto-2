from datetime import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
from src.extensions import api, mongo
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

            return mongo.db.reactions.find_one({"_id": result.inserted_id})

        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def update(self, id, data):
        verify_id(id, api)
        self.get(id)

        try:
            reaction_update = {
                "type": data["type"],
                "updated_at": datetime.now(),
            }

            mongo.db.reactions.update_one(
                {"_id": ObjectId(id)},
                {"$set": reaction_update},
            )

            return mongo.db.reactions.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def delete(self, id):
        verify_id(id, api)
        self.get(id)

        try:
            mongo.db.reactions.delete_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")


reaction_dao = ReactionDAO()
