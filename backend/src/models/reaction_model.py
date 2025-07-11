from flask_restx import fields
from src.extensions import api
from .user_model import user_output
from .movie_model import movie

reaction = api.model(
    "Reaction",
    {
        "_id": fields.String(readonly=True),
        "type": fields.String(required=True, enum=["like", "dislike"]),
        "user": fields.Nested(user_output, required=True, skip_none=True),
        "movie": fields.Nested(movie, required=True, skip_none=True),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
    },
)
