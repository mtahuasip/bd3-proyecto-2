from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.models.favorite import favorite_dao
from src.schemas.favorite_schema import favorite
from src.utils.security.decorators import roles_required

ns = Namespace("favorites")


# Ruta para manejar todos los favoritos
@ns.route("/")
class FavoriteList(Resource):
    @ns.doc("get_favorites")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.marshal_list_with(favorite)
    def get(self):
        """Devuelve todos los favoritos"""
        return favorite_dao.get_all()

    @ns.doc("create_favorite")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.expect(favorite, validate=True)
    @ns.marshal_with(favorite, code=201)
    def post(self):
        """Agrega un nuevo favorito"""
        return favorite_dao.create(api.payload), 201


# Ruta para manejar un favorito específico
@ns.route("/<string:id>")
@ns.response(404, "Favorito no encontrado")
class Favorite(Resource):
    @ns.doc("get_favorite")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(favorite)
    def get(self, id):
        """Devuelve el favorito con el id proporcionado"""
        return favorite_dao.get(id)

    @ns.doc("delete_favorite")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.response(204, "Favorito eliminado")
    def delete(self, id):
        """Elimina el favorito con el id proporcionado"""
        favorite_dao.delete(id)
        return "", 204

    # @ns.doc("update_favorite")
    # @ns.expect(favorite, validate=True)
    # @ns.marshal_with(favorite)
    # def patch(self, id):
    #     """Actualiza parcialmente el favorito con el id proporcionado"""
    #     return f"Actualiza el favorito con id {id}"
