from flask_restx import fields
from src.extensions import api
from .movie_schema import movie


playlist = api.model(
    "Playlist",
    {
        "_id": fields.String(readonly=True),
        "name": fields.String(required=True, min_length=1, max_length=100),
        "description": fields.String(required=True, min_length=1, max_length=500),
        "user": fields.String(required=True, min_length=1, max_length=100),
        "visibility": fields.Boolean(required=True),
        "movies": fields.List(fields.Nested(movie, required=True), required=True),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
    },
)
