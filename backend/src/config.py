import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    API_TITLE = os.getenv("API_TITLE")
    API_DESCRIPTION = os.getenv("API_DESCRIPTION")
    API_VERSION = os.getenv("API_VERSION")
    API_PREFIX = os.getenv("API_PREFIX")

    PORT = int(os.getenv("PORT"))
    DEBUG = bool(os.getenv("DEBUG"))
    SECRET_KEY = os.getenv("SECRET_KEY")

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    MONGO_URI = os.getenv("MONGO_URI")

    REDIS_HOST = os.getenv("REDIS_HOST")
    REDIS_PORT = int(os.getenv("REDIS_PORT"))
