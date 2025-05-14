from flask_restx import fields
from src.extensions import api

favorite = api.model(
    "Favorite",
    {
        "_id": fields.String(readonly=True),
        "user": fields.String(required=True, min_length=1, max_length=100),
        "movies": fields.List(
            fields.String(required=True, min_length=1, max_length=100),
            required=True,
        ),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
    },
)
