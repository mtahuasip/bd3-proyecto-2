from flask_restx import fields
from src.extensions import api

user_input = api.model(
    "UserInput",
    {
        "username": fields.String(
            required=True,
            pattern=r"^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+){0,9}$",
            example="Juan Pérez",
            description="Nombre completo del usuario (entre 2 y 4 palabras, solo letras y espacios).",
        ),
        "email": fields.String(
            required=True,
            pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$",
            example="juan.perez@mail.com",
            description="Correo electrónico válido.",
        ),
        "password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
            example="Contraseña.2025",
            description="Contraseña con mínimo 8 caracteres. Puede incluir letras, números y símbolos.",
        ),
        "roles": fields.List(
            fields.String(required=True, enum=["admin", "user", "staff"]),
            required=True,
        ),
    },
)

user_output = api.model(
    "UserOutput",
    {
        "_id": fields.String(readonly=True),
        "username": fields.String(readonly=True),
        "email": fields.String(readonly=True),
        "roles": fields.List(fields.String(readonly=True)),
        "streaming_history": fields.List(fields.String, readonly=True),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
        "last_login": fields.DateTime(readonly=True),
    },
)

user_update = api.model(
    "UserUpdate",
    {
        "username": fields.String(required=True, pattern=r"^[a-zA-Z0-9_]+$"),
        "email": fields.String(required=True, pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$"),
    },
)
