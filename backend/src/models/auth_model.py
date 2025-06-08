from flask_restx import fields
from src.extensions import api
from .user_model import user_output

register = api.model(
    "Register",
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
        "repeat_password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
            example="Contraseña.2025",
            description="Repetir la misma contraseña para confirmación.",
        ),
    },
)

login = api.model(
    "Login",
    {
        "email": fields.String(
            required=True,
            pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$",
            example="juan.perez@mail.com",
            description="Correo electrónico registrado.",
        ),
        "password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
            example="Contraseña.2025",
            description="Contraseña correspondiente al correo electrónico.",
        ),
    },
)

login_response = api.model(
    "LoginResponse",
    {
        "token": fields.String(
            required=True,
            readonly=True,
            example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            description="Token de acceso JWT que debe ser enviado en las siguientes peticiones autenticadas.",
        ),
        "user": fields.Nested(user_output, readonly=True),
    },
)

change_password = api.model(
    "ChangePassword",
    {
        "old_password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
            example="Contraseña.2024",
            description="Contraseña actual del usuario.",
        ),
        "new_password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
            example="NuevaContraseña.2025",
            description="Nueva contraseña que desea establecer. Debe cumplir los requisitos mínimos.",
        ),
        "repeat_password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
            example="NuevaContraseña.2025",
            description="Repetición de la nueva contraseña para confirmar.",
        ),
    },
)
