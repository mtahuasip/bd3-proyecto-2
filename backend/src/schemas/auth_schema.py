from flask_restx import fields
from src.extensions import api

register = api.model(
    "Register",
    {
        "username": fields.String(
            required=True,
            pattern=r"^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+){1,3}$",
        ),
        "email": fields.String(required=True, pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$"),
        "password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
        ),
    },
)


login = api.model(
    "Login",
    {
        "email": fields.String(required=True, pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$"),
        "password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
        ),
    },
)

token_response = api.model(
    "TokenResponse",
    {
        "message": fields.String(required=True, readonly=True),
        "access_token": fields.String(required=True, readonly=True),
        "refresh_token": fields.String(readonly=True),
    },
)

change_password = api.model(
    "ChangePassword",
    {
        "old_password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
        ),
        "new_password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
        ),
        "repeat_password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
        ),
    },
)
