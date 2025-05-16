from datetime import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
from slugify import slugify
from src.extensions import api, mongo
from src.utils.utils import verify_id


class CategoryDAO(object):
    def get_all(self):
        try:
            return list(mongo.db.categories.find())
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get(self, id):
        verify_id(id, api)

        try:
            category_found = mongo.db.categories.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

        if category_found:
            return category_found

        api.abort(404, "Categoría no encontrada")

    def create(self, data):
        try:
            new_category = {
                "name": data["name"],
                "description": data["description"],
                "slug": slugify(data["name"]),
                "created_at": datetime.now(),
                "updated_at": datetime.now(),
            }
            result = mongo.db.categories.insert_one(new_category)

            return mongo.db.categories.find_one({"_id": result.inserted_id})

        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def update(self, id, data):
        verify_id(id, api)
        self.get(id)

        try:
            category_update = {
                "name": data["name"],
                "description": data["description"],
                "slug": slugify(data["name"]),
                "updated_at": datetime.now(),
            }

            mongo.db.categories.update_one(
                {"_id": ObjectId(id)},
                {"$set": category_update},
            )

            return mongo.db.categories.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def delete(self, id):
        verify_id(id, api)
        self.get(id)

        try:
            mongo.db.categories.delete_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def get_samples(self, limit):
        try:
            return list(mongo.db.categories.aggregate([{"$sample": {"size": limit}}]))
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")


category_dao = CategoryDAO()
