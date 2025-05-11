from flask_restx import fields
from src.extensions import api

category = api.model(
    "Category",
    {
        "_id": fields.String(readonly=True),
        "name": fields.String(required=True, min_length=1, max_length=100),
        "description": fields.String(required=True, min_length=1, max_length=500),
        "slug": fields.String(readonly=True),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
    },
)
