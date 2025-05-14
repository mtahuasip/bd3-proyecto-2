from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.models.comment import comment_dao
from src.schemas.comment_schema import comment
from src.utils.security.decorators import roles_required

ns = Namespace("comments")


# Ruta para manejar todos los comentarios
@ns.route("/")
class CommentList(Resource):
    @ns.doc("get_comments")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(comment)
    def get(self):
        """Devuelve todos los comentarios"""
        return comment_dao.get_all()

    @ns.doc("create_comment")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.expect(comment, validate=True)
    @ns.marshal_with(comment, code=201)
    def post(self):
        """Crea un nuevo comentario"""
        return comment_dao.create(api.payload), 201


# Ruta para manejar un comentario específico
@ns.route("/<string:id>")
@ns.response(404, "Comentario no encontrado")
class Comment(Resource):
    @ns.doc("get_comment")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(comment)
    def get(self, id):
        """Devuelve el comentario con el id proporcionado"""
        return comment_dao.get(id)

    @ns.doc("delete_comment")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.response(204, "Comentario eliminado")
    def delete(self, id):
        """Elimina el comentario con el id proporcionado"""
        comment_dao.delete(id)
        return "", 204

    @ns.doc("update_comment")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.expect(comment, validate=True)
    @ns.marshal_with(comment)
    def patch(self, id):
        """Actualiza parcialmente el comentario con el id proporcionado"""
        return comment_dao.update(id, api.payload)
