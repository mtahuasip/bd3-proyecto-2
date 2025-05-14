from flask_restx import fields
from src.extensions import api

reaction = api.model(
    "Reaction",
    {
        "_id": fields.String(readonly=True),
        "type": fields.String(required=True, enum=["like", "dislike"]),
        "user": fields.String(required=True, min_length=1, max_length=100),
        "movie": fields.String(required=True, min_length=1, max_length=100),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
    },
)
