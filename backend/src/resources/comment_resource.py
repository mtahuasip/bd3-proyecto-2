from flask_restx import Namespace, Resource
from src.extensions import api
from src.models.comment import comment_dao
from src.schemas.comment_schema import comment

ns = Namespace("comments")


# Ruta para manejar todos los comentarios
@ns.route("/")
class CommentList(Resource):
    @ns.doc("get_comments")
    @ns.marshal_list_with(comment)
    def get(self):
        """Devuelve todos los comentarios"""
        return comment_dao.get_all()

    @ns.doc("create_comment")
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
    @ns.marshal_with(comment)
    def get(self, id):
        """Devuelve el comentario con el id proporcionado"""
        return comment_dao.get(id)

    @ns.doc("delete_comment")
    @ns.response(204, "Comentario eliminado")
    def delete(self, id):
        """Elimina el comentario con el id proporcionado"""
        comment_dao.delete(id)
        return "", 204

    @ns.doc("update_comment")
    @ns.expect(comment, validate=True)
    @ns.marshal_with(comment)
    def patch(self, id):
        """Actualiza parcialmente el comentario con el id proporcionado"""
        return comment_dao.update(id, api.payload)
