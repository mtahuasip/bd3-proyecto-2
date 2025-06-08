from flask_restx import Namespace, Resource, reqparse
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.daos.page_dao import page_dao
from src.models.movie_model import movie
from src.models.category_model import category_output
from src.utils.decorators import roles_required

ns = Namespace("pages")


@ns.route("/no-auth/movies")
@ns.response(404, "Películas no encontradas")
class NoAuthMovies(Resource):
    @ns.doc("no_auth_movies")
    @ns.marshal_list_with(movie)
    def get(self):
        """Devuelve películas sin autenticación"""
        return page_dao.no_auth_movies()


@ns.route("/no-auth/categories")
@ns.response(404, "Categorías no encontradas")
class NoAuthCategories(Resource):
    @ns.doc("no_auth_categories")
    @ns.marshal_list_with(category_output)
    def get(self):
        """Devuelve categorías sin autenticación"""
        return page_dao.no_auth_categories()
