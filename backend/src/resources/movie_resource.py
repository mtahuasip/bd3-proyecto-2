from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.models.movie import movie_dao
from src.schemas.movie_schema import movie
from src.utils.security.decorators import roles_required

ns = Namespace("movies")


# Ruta para manejar todos los películas
@ns.route("/")
class MovieList(Resource):
    @ns.doc("get_movies")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(movie)
    def get(self):
        """Devuelve todos las películas"""
        return movie_dao.get_all()

    @ns.doc("create_movie")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.expect(movie, validate=True)
    @ns.marshal_with(movie, code=201)
    def post(self):
        """Crea una nueva película"""
        return movie_dao.create(api.payload), 201


# Ruta para manejar un película específico
@ns.route("/<string:id>")
@ns.response(404, "Película no encontrado")
class Movie(Resource):
    @ns.doc("get_movie")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(movie)
    def get(self, id):
        """Devuelve la película con el id proporcionado"""
        return movie_dao.get(id)

    @ns.doc("delete_movie")
    @jwt_required()
    @roles_required("admin")
    @ns.response(204, "Catálogo eliminado")
    def delete(self, id):
        """Elimina la película con el id proporcionado"""
        movie_dao.delete(id)
        return "", 204

    @ns.doc("update_movie")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.expect(movie, validate=True)
    @ns.marshal_with(movie)
    def patch(self, id):
        """Actualiza parcialmente la película con el id proporcionado"""
        return movie_dao.update(id, api.payload)
