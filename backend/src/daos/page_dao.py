from flask import jsonify
from pymongo.errors import PyMongoError
from src.extensions import api, mongo
from .movie_dao import movie_dao
from .category_dao import category_dao


class PageDAO(object):
    def no_auth_movies(self):
        try:
            return list(mongo.db.movies.aggregate([{"$sample": {"size": 24}}]))
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def no_auth_categories(self):
        try:
            return list(mongo.db.categories.aggregate([{"$sample": {"size": 12}}]))
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")

    def auth_movies(self):
        try:
            recommended = movie_dao.get_recommended(10)
            mostViewed = movie_dao.get_most_viewed(timeframe="week", limit=10)
            categories = category_dao.get_all()
            years = movie_dao.get_years()

            return {
                "recommended": recommended,
                "most_viewed": mostViewed,
                "categories": categories,
                "years": years,
            }
        except PyMongoError as e:
            print(f"❌ Error de MongoDB: {e}")
            api.abort(500, "Error interno del servidor")


page_dao = PageDAO()
