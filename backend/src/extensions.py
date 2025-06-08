from flask_pymongo import PyMongo
from flask_redis import FlaskRedis
from flask_restx import Api
from flask_jwt_extended import JWTManager
from .utils import metadata

mongo = PyMongo()
redis = FlaskRedis()
api = Api(
    title=metadata.title,
    version=metadata.version,
    description=metadata.description,
    authorizations=metadata.authorizations,
    security=metadata.security,
    doc=metadata.doc,
    prefix=metadata.prefix,
)
jwt = JWTManager()
