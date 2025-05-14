import os
from datetime import timedelta
from dotenv import load_dotenv
from .utils.utils import str_to_bool

load_dotenv()


class Config:
    API_TITLE = os.getenv("API_TITLE")
    API_DESCRIPTION = os.getenv("API_DESCRIPTION")
    API_VERSION = os.getenv("API_VERSION")
    API_PREFIX = os.getenv("API_PREFIX")

    PORT = int(os.getenv("PORT"))
    DEBUG = str_to_bool(os.getenv("DEBUG"))

    ORIGINS = os.getenv("ORIGINS").split(",")

    minutes = float(os.getenv("JWT_ACCESS_TOKEN_EXPIRES"))

    JWT_COOKIE_SECURE = str_to_bool(os.getenv("JWT_COOKIE_SECURE"))
    JWT_TOKEN_LOCATION = os.getenv("JWT_TOKEN_LOCATION").split(",")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes)
    JWT_COOKIE_CSRF_PROTECT = str_to_bool(os.getenv("JWT_COOKIE_CSRF_PROTECT"))
    JWT_ACCESS_COOKIE_NAME = os.getenv("JWT_ACCESS_COOKIE_NAME")

    MONGO_URI = os.getenv("MONGO_URI")

    REDIS_HOST = os.getenv("REDIS_HOST")
    REDIS_PORT = int(os.getenv("REDIS_PORT"))

    USERS_PASSWORD = os.getenv("USERS_PASSWORD")
