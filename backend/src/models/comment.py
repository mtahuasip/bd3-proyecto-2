from datetime import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
from src.extensions import api, mongo
from src.utils.utils import verify_id


class CommentDAO(object):
    def get_all(self):
        try:
            return list(mongo.db.comments.find())
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get(self, id):
        verify_id(id, api)

        try:
            comment_found = mongo.db.comments.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

        if comment_found:
            return comment_found

        api.abort(404, "Comentario no encontrado")

    def create(self, data):
        try:
            new_comment = {
                "user": data["user"],
                "content": data["content"],
                "movie": data["movie"],
                "answers": [],
                "created_at": datetime.now(),
                "updated_at": datetime.now(),
            }
            result = mongo.db.comments.insert_one(new_comment)

            return mongo.db.comments.find_one({"_id": result.inserted_id})

        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def update(self, id, data):
        verify_id(id, api)
        self.get(id)

        try:
            comment_update = {
                "content": data["content"],
                "updated_at": datetime.now(),
            }

            mongo.db.comments.update_one(
                {"_id": ObjectId(id)},
                {"$set": comment_update},
            )

            return mongo.db.comments.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def delete(self, id):
        verify_id(id, api)
        self.get(id)

        try:
            mongo.db.comments.delete_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")


comment_dao = CommentDAO()
