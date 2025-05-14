from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.models.user import user_dao
from src.schemas.user_schema import user_input, user_output, user_update
from src.utils.security.decorators import roles_required

ns = Namespace("users")


# Ruta para manejar todos los usuarios
@ns.route("/")
class UserList(Resource):
    @ns.doc("get_users")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.marshal_list_with(user_output)
    def get(self):
        """Devuelve todos los usuarios"""
        return user_dao.get_all()

    @ns.doc("create_user")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.expect(user_input, validate=True)
    @ns.marshal_with(user_output, code=201)
    def post(self):
        """Crea un nuevo usuario"""
        return user_dao.create(api.payload), 201


# Ruta para manejar un usuario específico
@ns.route("/<string:id>")
@ns.response(404, "Usuario no encontrado")
class User(Resource):
    @ns.doc("get_user")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.marshal_with(user_output)
    def get(self, id):
        """Devuelve el usuario con el id proporcionado"""
        return user_dao.get(id)

    @ns.doc("delete_user")
    @jwt_required()
    @roles_required("admin")
    @ns.response(204, "Usuario eliminado")
    def delete(self, id):
        """Elimina el usuario con el id proporcionado"""
        user_dao.delete(id)
        return "", 204

    @ns.doc("update_user")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.expect(user_update, validate=True)
    @ns.marshal_with(user_output)
    def patch(self, id):
        """Actualiza parcialmente el usuario con el id proporcionado"""
        return user_dao.update(id, api.payload)
