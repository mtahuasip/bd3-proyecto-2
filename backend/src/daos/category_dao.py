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
            category = mongo.db.categories.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

        if category:
            return category

        api.abort(404, "Categoría no encontrada")

    def create(self, data):
        name = data.get("name")
        description = data.get("description")

        try:
            exists = mongo.db.categories.find_one({"name": name})

            if exists:
                api.abort(400, f"Categoría {name} ya existe")

            new_category = {
                "name": name,
                "description": description,
                "image_url": None,
                "slug": slugify(name),
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

        try:
            object_id = ObjectId(id)

            category = mongo.db.categories.find_one({"_id": object_id})
            if not category:
                api.abort(404, "Categoría no encontrada")

            name = data.get("name", category["name"])
            description = data.get("description", category["description"])

            duplicate = mongo.db.categories.find_one(
                {
                    "name": name,
                    "_id": {"$ne": object_id},
                }
            )

            if duplicate:
                api.abort(400, f"La categoría '{name}' ya existe.")

            category_update = {
                "name": name,
                "description": description,
                "slug": slugify(name),
                "updated_at": datetime.now(),
            }

            mongo.db.categories.update_one(
                {"_id": object_id},
                {"$set": category_update},
            )

            return mongo.db.categories.find_one({"_id": object_id})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def delete(self, id):
        verify_id(id, api)

        try:
            mongo.db.categories.delete_one({"_id": ObjectId(id)})
            return {"message": "Categoría eliminada"}
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def search(self, name=None, description=None, slug=None, page=None, per_page=None):
        try:
            query = {}

            if name:
                query["name"] = {"$regex": name, "$options": "i"}
            if slug:
                query["slug"] = {"$regex": slug, "$options": "i"}
            if description:
                query["slug"] = {"$regex": description, "$options": "i"}

            if page is not None and page > 0:
                items_per_page = per_page if per_page and per_page > 0 else 10
                skip = (page - 1) * items_per_page
                return list(
                    mongo.db.categories.find(query).skip(skip).limit(items_per_page)
                )
            else:
                return list(mongo.db.categories.find(query))
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")


category_dao = CategoryDAO()
