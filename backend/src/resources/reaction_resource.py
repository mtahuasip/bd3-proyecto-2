from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.models.reaction import reaction_dao
from src.schemas.reaction_schema import reaction
from src.utils.security.decorators import roles_required

ns = Namespace("reactions")


# Ruta para manejar todas las reacciones
@ns.route("/")
class ReactionList(Resource):
    @ns.doc("get_reactions")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(reaction)
    def get(self):
        """Devuelve todas las reacciones"""
        return reaction_dao.get_all()

    @ns.doc("create_reaction")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.expect(reaction, validate=True)
    @ns.marshal_with(reaction, code=201)
    def post(self):
        """Crea una nueva reacción"""
        return reaction_dao.create(api.payload), 201


# Ruta para manejar una reacción específica
@ns.route("/<string:id>")
@ns.response(404, "Reacción no encontrada")
class Reaction(Resource):
    @ns.doc("get_reaction")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.marshal_with(reaction)
    def get(self, id):
        """Devuelve la reacción con el id proporcionado"""
        return reaction_dao.get(id)

    @ns.doc("delete_reaction")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.response(204, "Reacción eliminada")
    def delete(self, id):
        """Elimina la reacción con el id proporcionado"""
        reaction_dao.delete(id)
        return "", 204

    @ns.doc("update_reaction")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.expect(reaction, validate=True)
    @ns.marshal_with(reaction)
    def patch(self, id):
        """Actualiza parcialmente la reacción con el id proporcionado"""
        return reaction_dao.update(id, api.payload)
