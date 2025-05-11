from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import api, mongo
from .resources import namespaces


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    mongo.init_app(app)

    api.init_app(app)

    for namespace in namespaces:
        api.add_namespace(namespace, path=f"/{Config.API_PREFIX}/{namespace.name}")

    return app
