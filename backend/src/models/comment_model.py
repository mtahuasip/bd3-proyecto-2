from flask_restx import fields
from src.extensions import api
from .user_model import user_output
from .movie_model import movie

answer = api.model(
    "Answer",
    {
        "_id": fields.String(readonly=True),
        "content": fields.String(required=True, min_length=1, max_length=500),
        "comment_id": fields.String(required=True),
        "user": fields.Nested(user_output, required=True),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
    },
)

comment = api.model(
    "Comment",
    {
        "_id": fields.String(readonly=True),
        "content": fields.String(required=True, min_length=1, max_length=500),
        "user": fields.Nested(user_output, required=True, skip_none=True),
        "movie": fields.Nested(movie, required=True, skip_none=True),
        "answers": fields.List(fields.Nested(answer)),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
    },
)
