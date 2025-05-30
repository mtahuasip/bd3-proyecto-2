from flask_restx import Namespace, Resource, reqparse
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.models.movie import movie_dao
from src.schemas.movie_schema import movie, year
from src.utils.security.decorators import roles_required

ns = Namespace("movies")

limit_args = reqparse.RequestParser()
limit_args.add_argument(
    "limit", type=int, default=5, help="Limite de resultados para devolver"
)

movies_args = reqparse.RequestParser()
movies_args.add_argument("title", type=str, help="Filtrar por título de la película")
movies_args.add_argument(
    "categories",
    type=str,
    help="Filtrar por categoría (ej: Comedia, Aventura)",
)
movies_args.add_argument("year", type=int, help="Filtrar por año de la película")
movies_args.add_argument(
    "page",
    type=int,
    help="Número de página para paginación (10 resultados por página)",
)
movies_args.add_argument(
    "per_page",
    type=int,
    help="Número de resultados por página (default: 10)",
)


# Ruta para manejar todos los películas
@ns.route("/")
class MovieList(Resource):
    @ns.doc("get_movies")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(movie)
    @ns.expect(movies_args)
    def get(self):
        """Devuelve todos las películas"""
        args = movies_args.parse_args()
        return movie_dao.get_all(
            title=args.get("title"),
            categories=args.get("categories"),
            year=args.get("year"),
            page=args.get("page"),
            per_page=args.get("per_page"),
        )

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
    @ns.expect(limit_args)
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(movie)
    def get(self):
        """Devuelve películas recomendadas"""
        args = limit_args.parse_args()
        limit = args["limit"]
        return movie_dao.get_recommended(limit)


@ns.route("/most-viewed/<string:timeframe>")
@ns.doc(params={"timeframe": "Timeframe. Usa 'day', 'week', 'month', 'year', 'all'"})
@ns.response(404, "Películas no encontradas")
class MostViewed(Resource):
    @ns.doc("get_most_viewed")
    @ns.expect(limit_args)
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(movie)
    def get(self, timeframe):
        """Devuelve películas recomendadas"""
        args = limit_args.parse_args()
        limit = args["limit"]
        return movie_dao.get_most_viewed(timeframe, limit)


@ns.route("/samples")
@ns.response(404, "Películas no encontradas")
class Samples(Resource):
    @ns.doc("get_sample")
    @ns.expect(limit_args)
    @ns.marshal_list_with(movie)
    def get(self):
        """Devuelve películas de ejemplo"""
        args = limit_args.parse_args()
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


@ns.route("/by/<string:slug>")
@ns.response(404, "Película no encontrada")
class MovieBySlug(Resource):
    @ns.doc("get_movie_by_slug")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(movie)
    def get(self, slug):
        """Devuelve la película con el slug proporcionado"""
        return movie_dao.get_by_slug(slug)


@ns.route("/update-views/<string:id>")
@ns.response(404, "Película no encontrada")
class UpdateMovieViews(Resource):
    @ns.doc("update_movie_view")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(movie)
    def patch(self, id):
        """Actualiza la última vista de la película con el id proporcionado"""
        return movie_dao.update_last_views(id)


@ns.route("/update-views/by/<string:slug>")
@ns.response(404, "Película no encontrada")
class UpdateMovieViews(Resource):
    @ns.doc("update_movie_view")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(movie)
    def patch(self, slug):
        """Actualiza la última vista de la película con el slug proporcionado"""
        return movie_dao.update_last_views_by_slug(slug)


@ns.route("/<string:id>/like")
class LikeMovie(Resource):
    @jwt_required()
    @roles_required("admin", "staff", "user")
    def post(self, id):
        """Agrega un like a una película"""
        from flask_jwt_extended import get_jwt_identity

        movie_dao.like_movie(id, get_jwt_identity())
        movie_dao.increment_popularity(id)
        return {"msg": "Like registrado"}


@ns.route("/<string:id>/dislike")
class DislikeMovie(Resource):
    @jwt_required()
    @roles_required("admin", "staff", "user")
    def post(self, id):
        """Agrega un dislike a una película"""
        from flask_jwt_extended import get_jwt_identity

        movie_dao.dislike_movie(id, get_jwt_identity())
        return {"msg": "Dislike registrado"}


@ns.route("/<string:id>/likes")
class MovieLikes(Resource):
    @jwt_required()
    @roles_required("admin", "staff", "user")
    def get(self, id):
        """Obtiene los likes/dislikes de una película"""
        return movie_dao.get_likes_dislikes(id)


@ns.route("/favorites/<string:movie_id>")
class UserFavorites(Resource):
    @jwt_required()
    @roles_required("admin", "staff", "user")
    def post(self, movie_id):
        """Agrega una película a favoritos"""
        from flask_jwt_extended import get_jwt_identity

        movie_dao.add_to_favorites(get_jwt_identity(), movie_id)
        return {"msg": "Película agregada a favoritos"}

    @jwt_required()
    @roles_required("admin", "staff", "user")
    def delete(self, movie_id):
        """Elimina una película de favoritos"""
        from flask_jwt_extended import get_jwt_identity

        movie_dao.remove_from_favorites(get_jwt_identity(), movie_id)
        return {"msg": "Película eliminada de favoritos"}


@ns.route("/favorites")
class GetFavorites(Resource):
    @jwt_required()
    @roles_required("admin", "staff", "user")
    def get(self):
        """Obtiene películas favoritas del usuario"""
        from flask_jwt_extended import get_jwt_identity

        return movie_dao.get_favorites(get_jwt_identity())


@ns.route("/popular")
class PopularMovies(Resource):
    @ns.doc(params={"limit": "Cantidad de resultados"})
    @ns.expect(limit_args)
    @jwt_required()
    @roles_required("admin", "staff", "user")
    def get(self):
        """Películas más populares según ranking Redis"""
        args = limit_args.parse_args()
        return movie_dao.get_popular_movies(args["limit"])
