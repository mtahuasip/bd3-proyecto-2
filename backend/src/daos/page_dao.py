from pymongo.errors import PyMongoError
from src.extensions import api, mongo


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


page_dao = PageDAO()
