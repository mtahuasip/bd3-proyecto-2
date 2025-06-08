from flask import jsonify
from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.extensions import api
from src.daos.auth_dao import auth_dao
from src.models.auth_model import register, login, change_password, login_response
from src.models.user_model import user_output, user_update
from src.utils.decorators import roles_required

ns = Namespace("auth")


@ns.route("/register")
class SignUp(Resource):
    @ns.doc("register")
    @ns.expect(register, validate=True)
    @ns.marshal_with(login_response)
    def post(self):
        """Crear una cuenta de usuario, devuelve el token de acceso"""
        return auth_dao.register(api.payload)


@ns.route("/login")
class SignIn(Resource):
    @ns.doc("login")
    @ns.expect(login, validate=True)
    @ns.marshal_with(login_response)
    def post(self):
        """Obtener token de acceso con credenciales"""
        return auth_dao.login(api.payload)


@ns.route("/profile")
class Profile(Resource):
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(user_output)
    def get(self):
        """Obtener mi información de usuario"""
        current_user = get_jwt_identity()
        return auth_dao.profile(current_user)


@ns.route("/update-profile")
class UpdateProfile(Resource):
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.expect(user_update, validate=True)
    @ns.marshal_with(user_output)
    def patch(self):
        """Actualiza mi información. Nombre de usuario y correo electrónico"""
        current_user = get_jwt_identity()
        return auth_dao.update_profile(current_user, data=api.payload)


@ns.route("/change-password")
class ChangePassword(Resource):
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.expect(change_password, validate=True)
    @ns.response(200, "Contraseña cambiada con éxito")
    def patch(self):
        """Actualiza mi contraseña"""
        current_user = get_jwt_identity()
        return auth_dao.change_password(current_user, data=api.payload)
