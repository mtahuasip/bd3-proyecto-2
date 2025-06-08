from flask_restx import fields
from src.extensions import api
from .movie_model import movie, year
from .category_model import category_output

movie_data = api.model(
    "MovieData",
    {
        "recommended": fields.List(fields.Nested(movie, readonly=True), readonly=True),
        "most_viewed": fields.List(fields.Nested(movie, readonly=True), readonly=True),
        "categories": fields.List(
            fields.Nested(category_output, readonly=True), readonly=True
        ),
        "years": fields.List(fields.Nested(year, readonly=True), readonly=True),
    },
)
