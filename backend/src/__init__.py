from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import mongo, api, jwt
from .resources import namespaces
from .utils.create_user import create_admin_user_if_not_exists


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    mongo.init_app(app)
    api.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        create_admin_user_if_not_exists()

    for namespace in namespaces:
        api.add_namespace(namespace, path=f"/{Config.API_PREFIX}/{namespace.name}")

    return app
