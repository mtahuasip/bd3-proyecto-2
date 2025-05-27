import os

# from datetime import timedelta
from dotenv import load_dotenv
from .utils.utils import str_to_bool

load_dotenv()


class Config:
    API_TITLE = os.getenv("API_TITLE")
    API_DESCRIPTION = os.getenv("API_DESCRIPTION")
    API_VERSION = os.getenv("API_VERSION")
    API_PREFIX = os.getenv("API_PREFIX")

    DEBUG = str_to_bool(os.getenv("DEBUG"))

    ORIGINS = os.getenv("ORIGINS").split(",")

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    MONGO_URI = os.getenv("MONGO_URI")

    REDIS_URL = os.getenv("REDIS_URL")

    USERS_PASSWORD = os.getenv("USERS_PASSWORD")
