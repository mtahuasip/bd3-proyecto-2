from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError, PyMongoError
from src.extensions import mongo
from src.utils.seeds.user_seed import create_admin_user


def init_mongo(app):
    try:
        mongo.init_app(app)
        mongo.cx.admin.command("ping")
        print(f"✅ Conexión a MongoDB establecida")
        with app.app_context():
            create_admin_user()
    except (ConnectionFailure, ServerSelectionTimeoutError) as e:
        print(f"❌ Fallo de conexión a MongoDB: {e}")
    except PyMongoError as e:
        print(f"❌ Error general con MongoDB: {e}")
