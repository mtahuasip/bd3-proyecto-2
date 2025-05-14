from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.models.playlist import playlist_dao
from src.schemas.playlist_schema import playlist
from src.utils.security.decorators import roles_required

ns = Namespace("playlists")


# Ruta para manejar todas las playlists
@ns.route("/")
class PlaylistList(Resource):
    @ns.doc("get_playlists")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.marshal_list_with(playlist)
    def get(self):
        """Devuelve todas las playlists"""
        return playlist_dao.get_all()

    @ns.doc("create_playlist")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.expect(playlist, validate=True)
    @ns.marshal_with(playlist, code=201)
    def post(self):
        """Crea una nueva playlist"""
        return playlist_dao.create(api.payload), 201


# Ruta para manejar una playlist específica
@ns.route("/<string:id>")
@ns.response(404, "Playlist no encontrada")
class Playlist(Resource):
    @ns.doc("get_playlist")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(playlist)
    def get(self, id):
        """Devuelve la playlist con el id proporcionado"""
        return playlist_dao.get(id)

    @ns.doc("delete_playlist")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.response(204, "Playlist eliminada")
    def delete(self, id):
        """Elimina la playlist con el id proporcionado"""
        playlist_dao.delete(id)
        return "", 204

    @ns.doc("update_playlist")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.expect(playlist, validate=True)
    @ns.marshal_with(playlist)
    def patch(self, id):
        """Actualiza parcialmente la playlist con el id proporcionado"""
        return playlist_dao.update(id, api.payload)
