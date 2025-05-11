from flask_restx import fields
from src.extensions import api

user_input = api.model(
    "UserInput",
    {
        "username": fields.String(required=True, pattern=r"^[a-zA-Z0-9_]+$"),
        "email": fields.String(required=True, pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$"),
        "password": fields.String(
            required=True,
            pattern=r"^[a-zA-Z0-9._@!#$%^&*-]{8,}$",
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
