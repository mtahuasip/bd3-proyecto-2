from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.daos.page_dao import page_dao
from src.models.movie_model import movie
from src.models.category_model import category_output
from src.models.page_model import movie_data
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


@ns.route("/auth/movies")
@ns.response(404, "Datos no encontradas")
class AuthMovies(Resource):
    @ns.doc("auth_movies")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(movie_data)
    def get(self):
        """Devuelve datos para la página de películas"""
        return page_dao.auth_movies()
