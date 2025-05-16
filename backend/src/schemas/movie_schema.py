from flask_restx import fields
from src.extensions import api

movie = api.model(
    "Movie",
    {
        "_id": fields.String(readonly=True),
        "title": fields.String(required=True, min_length=1, max_length=100),
        "description": fields.String(required=True, min_length=1, max_length=500),
        "duration": fields.Integer(required=True),
        "year": fields.Integer(required=True),
        "categories": fields.List(
            fields.String(required=True, min_length=1, max_length=100),
            required=True,
        ),
        "views": fields.Integer(readonly=True),
        "cover_url": fields.String(readonly=True),
        "poster_url": fields.String(readonly=True),
        "thumbnail_url": fields.String(readonly=True),
        "video_url": fields.String(readonly=True),
        "slug": fields.String(readonly=True),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
    },
)

year = api.model(
    "Year",
    {
        "id": fields.String(readonly=True),
        "year": fields.Integer(readonly=True),
    },
)
