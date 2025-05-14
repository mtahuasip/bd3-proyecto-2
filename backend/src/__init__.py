from flask import Flask
from flask_cors import CORS
from .config import Config
from .utils.connections.mongo import init_mongo
from .utils.connections.redis import init_redis
from .utils.security.jwt import refresh_expiring_jwts
from .extensions import api, jwt
from .resources import namespaces


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.after_request(refresh_expiring_jwts)

    CORS(app, supports_credentials=True, origins=Config.ORIGINS)

    init_redis(app)
    init_mongo(app)

    api.init_app(app)
    jwt.init_app(app)

    for namespace in namespaces:
        api.add_namespace(namespace, path=f"/{Config.API_PREFIX}/{namespace.name}")

    return app
