from datetime import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
from werkzeug.security import generate_password_hash
from src.extensions import api, mongo
from src.utils.utils import verify_id


class UserDAO(object):
    def get_all(self):
        try:
            return list(mongo.db.users.find())
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def get(self, id):
        verify_id(id, api)

        try:
            user_found = mongo.db.users.find_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

        if user_found:
            return user_found

        api.abort(404, "Usuario no encontrado")

    def create(self, data):
        if len(data["roles"]) == 0:
            api.abort(400, "El campo 'roles' no puede ser una lista vacía")

        if self.get_user_by_username(data["username"]):
            api.abort(400, "Nombre de usuario ya existe")

        if self.get_user_by_email(data["email"]):
            api.abort(400, "Email ya existe")

        try:
            new_user = {
                "username": data["username"],
                "email": data["email"],
                "password": generate_password_hash(data["password"]),
                "roles": data["roles"],
                "streaming_history": [],
                "created_at": datetime.now(),
                "updated_at": datetime.now(),
                "last_login": None,
            }
            result = mongo.db.users.insert_one(new_user)

            return mongo.db.users.find_one({"_id": result.inserted_id})

        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def update(self, id, data):
        verify_id(id, api)
        self.get(id)
        object_id = ObjectId(id)

        user_with_same_username = self.get_user_by_username(data["username"])
        if user_with_same_username and user_with_same_username["_id"] != object_id:
            api.abort(400, "Nombre de usuario ya existe")

        user_with_same_email = self.get_user_by_email(data["email"])
        if user_with_same_email and user_with_same_email["_id"] != object_id:
            api.abort(400, "Email ya existe")

        try:
            user_update = {
                "username": data["username"],
                "email": data["email"],
                "updated_at": datetime.now(),
            }

            mongo.db.users.update_one({"_id": object_id}, {"$set": user_update})

            return mongo.db.users.find_one({"_id": object_id})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def delete(self, id):
        verify_id(id, api)
        self.get(id)

        try:
            mongo.db.users.delete_one({"_id": ObjectId(id)})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def get_user_by_email(self, email):
        try:
            return mongo.db.users.find_one({"email": email})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def get_user_by_username(self, username):
        try:
            return mongo.db.users.find_one({"username": username})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def update_login(self, email):
        try:
            mongo.db.users.update_one(
                {"email": email},
                {"$set": {"last_login": datetime.now()}},
            )
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

    def update_password(self, email, new_password):
        try:
            mongo.db.users.update_one(
                {"email": email},
                {"$set": {"password": generate_password_hash(new_password)}},
            )
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")


user_dao = UserDAO()
