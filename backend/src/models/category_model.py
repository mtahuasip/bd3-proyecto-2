from flask_restx import fields
from src.extensions import api


category_input = api.model(
    "CategoryInput",
    {
        "name": fields.String(required=True, min_length=1, max_length=100),
        "description": fields.String(required=True, min_length=1, max_length=500),
    },
)

category_output = api.model(
    "CategoryOutput",
    {
        "_id": fields.String(readonly=True),
        "name": fields.String(required=True, min_length=1, max_length=100),
        "description": fields.String(required=True, min_length=1, max_length=500),
        "slug": fields.String(readonly=True),
        "created_at": fields.DateTime(readonly=True),
        "updated_at": fields.DateTime(readonly=True),
    },
)

category_update = api.model(
    "CategoryUpdate",
    {
        "name": fields.String(required=False, min_length=1, max_length=100),
        "description": fields.String(required=False, min_length=1, max_length=500),
    },
)
