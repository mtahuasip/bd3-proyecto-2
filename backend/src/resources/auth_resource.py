from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.extensions import api
from src.models.auth import auth_dao
from src.schemas.auth_schema import register, login, change_password, auth_tokens
from src.schemas.user_schema import user_output, user_update

ns = Namespace("auth")


@ns.route("/register")
class Register(Resource):
    @ns.doc("register_user")
    @ns.expect(register, validate=True)
    @ns.marshal_with(auth_tokens, code=201)
    def post(self):
        """Registra un nuevo usuario"""
        return auth_dao.register(api.payload)


@ns.route("/login")
class Login(Resource):
    @ns.doc("login_user")
    @ns.expect(login, validate=True)
    @ns.marshal_with(auth_tokens, code=201)
    def post(self):
        """Autenticación de usuario"""
        return auth_dao.login(api.payload)


@ns.route("/verify-token")
class VerifyToken(Resource):
    @ns.doc("verify_token", security="Bearer Auth")
    @jwt_required()
    @ns.response(200, "Token válido")
    def get(self):
        """Verificar token"""
        return {"message": "Token válido"}, 200


@ns.route("/refresh-token")
class RefreshToken(Resource):
    @ns.doc("refresh_token", security="Bearer Auth")
    @jwt_required(refresh=True)
    @ns.marshal_with(auth_tokens, code=201)
    def post(self):
        """Refrescar token"""
        current_user = get_jwt_identity()
        return auth_dao.refresh_token(current_user)


@ns.route("/me")
class Me(Resource):
    @ns.doc("get_me", security="Bearer Auth")
    @jwt_required()
    @ns.marshal_with(user_output)
    def get(self):
        """ "Obtener perfil de usuario"""
        current_user = get_jwt_identity()
        return auth_dao.me(current_user)


@ns.route("/update-profile")
class UpdateProfile(Resource):
    @ns.doc("update_profile", security="Bearer Auth")
    @jwt_required()
    @ns.expect(user_update, validate=True)
    @ns.marshal_with(user_output)
    def patch(self):
        """ "Actualiza usuario y email"""
        current_user = get_jwt_identity()
        return auth_dao.update_profile(current_user, data=api.payload)


@ns.route("/change-password")
class ChangePassword(Resource):
    @ns.doc("change_password", security="Bearer Auth")
    @jwt_required()
    @ns.expect(change_password, validate=True)
    @ns.response(200, "Contraseña cambiada correctamente")
    def patch(self):
        """ "Actualiza la contraseña"""
        current_user = get_jwt_identity()
        return auth_dao.change_password(current_user, data=api.payload)
