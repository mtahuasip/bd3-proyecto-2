from flask import Flask
from flask_cors import CORS
from .config import Config
from .lib.mongo import init_mongo
from .lib.redis import init_redis
from .extensions import api, jwt
from .resources import namespaces


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["ERROR_404_HELP"] = False
    CORS(app, origins=Config.ORIGINS)

    init_redis(app)
    init_mongo(app)

    api.init_app(app)
    jwt.init_app(app)

    for namespace in namespaces:
        api.add_namespace(namespace, path=f"/{namespace.name}")

    return app
