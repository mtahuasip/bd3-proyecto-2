from flask_pymongo import PyMongo
from flask_redis import FlaskRedis
from flask_restx import Api
from flask_jwt_extended import JWTManager
from .config import Config

mongo = PyMongo()
redis = FlaskRedis()
api = Api(
    title=Config.API_TITLE,
    description=Config.API_DESCRIPTION,
    version=Config.API_VERSION,
)
jwt = JWTManager()
