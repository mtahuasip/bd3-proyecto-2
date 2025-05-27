from werkzeug.security import generate_password_hash
from pymongo.errors import PyMongoError
from src.extensions import mongo
from src.config import Config


def create_admin_user():
    email = "admin@bd3.dev"
    password = Config.USERS_PASSWORD

    try:
        existing = mongo.db.users.find_one({"email": email})
        if existing:
            print(f"⚠️ Usuario administrador ya existe.\n📧 email: {email}")
            return

        hashed_password = generate_password_hash(password)
        mongo.db.users.insert_one(
            {
                "username": "admin",
                "email": email,
                "password": hashed_password,
                "roles": ["admin", "staff", "user"],
            }
        )

        print(f"✅ Usuario admin creado correctamente.\n📧 email: {email}")
    except PyMongoError as e:
        print(f"❌ Error al crear usuario admin: {e}")
