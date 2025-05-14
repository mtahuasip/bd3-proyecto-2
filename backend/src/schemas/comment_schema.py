from flask_restx import fields
from src.extensions import api

comment = api.model(
    "Comment",
    {
        "_id": fields.String(readonly=True),
        "user": fields.String(required=True, min_length=1, max_length=100),
        "content": fields.String(required=True, min_length=1, max_length=500),
        "movie": fields.String(required=True, min_length=1, max_length=100),
        "answers": fields.List(fields.String, readonly=True),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
    },
)
