import sys
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
from pymongo.errors import PyMongoError
from pymongo import MongoClient

load_dotenv()


class DatabaseSeeder:
    def __init__(self):
        self.mongo_client = None
        self.db = None
        self._setup_database()

    def _setup_database(self):
        try:
            MONGO_URI = os.getenv("MONGO_URI")

            self.mongo_client = MongoClient(MONGO_URI)
            self.db = self.mongo_client.get_default_database()

            self.mongo_client.admin.command("ping")
            print("🔗 Conexión a MongoDB establecida correctamente")
        except Exception as e:
            print(f"❌ Error al conectar con MongoDB: {e}")
            sys.exit(1)

    def create_admin_user(self):
        email = "admin@bd3.dev"
        password = "password"

        try:
            existing = self.db.users.find_one({"email": email})
            if existing:
                print(f"⚠️ Usuario administrador ya existe.\n📧 email: {email}")
                return

            hashed_password = generate_password_hash(password)
            self.db.users.insert_one(
                {
                    "username": "admin",
                    "email": email,
                    "password": hashed_password,
                    "roles": ["admin", "staff", "user"],
                }
            )

            print(f"✅ Usuario administrador creado correctamente.\n📧 email: {email}")

        except PyMongoError as e:
            print(f"❌ Error al crear usuario administrador: {e}")

    def run_seeds(self):
        print("🌱 Iniciando proceso de seeds...")
        print("=" * 50)

        self.create_admin_user()

        print("=" * 50)
        print("🎉 Proceso de seeds completado")

    def cleanup(self):
        """Limpia la conexión"""
        if self.mongo_client:
            self.mongo_client.close()
            print("🔌 Conexión a MongoDB cerrada")


def main():
    seeder = None
    try:
        seeder = DatabaseSeeder()
        seeder.run_seeds()
    except KeyboardInterrupt:
        print("\n⏹️ Proceso interrumpido por el usuario")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
    finally:
        if seeder:
            seeder.cleanup()


if __name__ == "__main__":
    main()
