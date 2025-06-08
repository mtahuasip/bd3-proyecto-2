import os
from dotenv import load_dotenv
from .utils.utils import str_to_bool

load_dotenv()


class Config:
    DEBUG = str_to_bool(os.getenv("DEBUG"))
    ORIGINS = os.getenv("ORIGINS").split(",")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    MONGO_URI = os.getenv("MONGO_URI")
    REDIS_URL = os.getenv("REDIS_URL")
