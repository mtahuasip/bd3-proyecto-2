from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError, PyMongoError
from src.extensions import mongo


def init_mongo(app):
    try:
        mongo.init_app(app)
        mongo.cx.admin.command("ping")
        print(f"✅ Conexión a MongoDB establecida")
    except (ConnectionFailure, ServerSelectionTimeoutError) as e:
        print(f"❌ Fallo de conexión a MongoDB: {e}")
    except PyMongoError as e:
        print(f"❌ Error general con MongoDB: {e}")
