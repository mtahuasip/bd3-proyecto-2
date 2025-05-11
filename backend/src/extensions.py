from flask_pymongo import PyMongo
from flask_restx import Api
from .config import Config

mongo = PyMongo()
api = Api(
    title=Config.API_TITLE,
    description=Config.API_DESCRIPTION,
    version=Config.API_VERSION,
)
