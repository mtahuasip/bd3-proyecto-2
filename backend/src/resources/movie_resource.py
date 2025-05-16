from flask_restx import Namespace, Resource, reqparse
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.models.movie import movie_dao
from src.schemas.movie_schema import movie, year
from src.utils.security.decorators import roles_required

ns = Namespace("movies")

parser = reqparse.RequestParser()
parser.add_argument(
    "limit", type=int, default=5, help="Limite de resultados para devolver"
)


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
@ns.response(404, "Película no encontrada")
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


@ns.route("/recommended")
@ns.response(404, "Películas no encontradas")
class Recommended(Resource):
    @ns.doc(
        "get_recommended",
        params={"limit": "Limite de resultados para devolver (ejemplo 5, 10, 20)"},
    )
    @ns.expect(parser)
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(movie)
    def get(self):
        """Devuelve películas recomendadas"""
        args = parser.parse_args()
        limit = args["limit"]
        return movie_dao.get_recommended(limit)


@ns.route("/most-viewed/<string:timeframe>")
@ns.doc(params={"timeframe": "Timeframe. Usa 'day', 'week', 'month' o 'year'"})
@ns.response(404, "Películas no encontradas")
class MostViewed(Resource):
    @ns.doc(
        "get_most_viewed",
        params={"limit": "Limite de resultados para devolver (ejemplo 5, 10, 20)"},
    )
    @ns.expect(parser)
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(movie)
    def get(self, timeframe):
        """Devuelve películas recomendadas"""
        args = parser.parse_args()
        limit = args["limit"]
        return movie_dao.get_most_viewed(timeframe, limit)


@ns.route("/samples")
@ns.response(404, "Películas no encontradas")
class Samples(Resource):
    @ns.doc(
        "get_sample",
        params={"limit": "Limite de resultados para devolver (ejemplo 5, 10, 20)"},
    )
    @ns.expect(parser)
    @ns.marshal_list_with(movie)
    def get(self):
        """Devuelve películas de ejemplo"""
        args = parser.parse_args()
        limit = args["limit"]
        return movie_dao.get_samples(limit)


@ns.route("/years")
@ns.response(404, "Años no encontrad0s")
class Years(Resource):
    @ns.doc("get_years")
    @ns.marshal_list_with(year)
    def get(self):
        """Devuelve años de películas"""
        return movie_dao.get_years()
