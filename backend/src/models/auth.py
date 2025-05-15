from flask import jsonify
from pymongo.errors import PyMongoError
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies
from src.extensions import api, mongo
from .user import user_dao


class AuthDAO(object):
    def register(self, data):
        data["roles"] = ["user"]

        new_user = user_dao.create(data)

        if not new_user:
            api.abort(404, "Usuario no encontrado")

        return self.login(data)

    def login(self, data):
        email = data["email"]
        password = data["password"]

        try:
            user_found = mongo.db.users.find_one({"email": email})
        except PyMongoError as e:
            print(f"❌ Error: {e}")
            api.abort(500, "Error interno del servidor")

        if not user_found:
            api.abort(404, "Usuario no encontrado")

        is_valid = check_password_hash(user_found["password"], password)
        if not is_valid:
            api.abort(401, "Credenciales inválidas")

        response = jsonify({"message": "Inicio de sesión exitoso"})
        access_token = create_access_token(
            identity=user_found["email"],
            additional_claims={"roles": user_found["roles"]},
        )

        user_dao.update_login(user_found["email"])

        set_access_cookies(response, access_token)

        return response

    def me(self, current_user):
        user_found = user_dao.get_user_by_email(email=current_user)

        if not user_found:
            api.abort(404, "Usuario no encontrado")

        return user_found

    def update_profile(self, current_user, data):
        user_found = user_dao.get_user_by_email(email=current_user)
        id = user_found["_id"]
        user_dao.update(id, data)

        return user_dao.get(id)

    def change_password(self, current_user, data):
        old_password = data["old_password"]
        new_password = data["new_password"]
        repeat_password = data["repeat_password"]

        if new_password != repeat_password:
            api.abort(400, "Las contraseñas no coinciden")

        user_found = user_dao.get_user_by_email(current_user)
        is_valid = check_password_hash(user_found["password"], old_password)

        if not is_valid:
            api.abort(401, "Contraseña incorrecta")

        user_dao.update_password(current_user, new_password)

        return {"message": "Contraseña cambiada correctamente"}


auth_dao = AuthDAO()
