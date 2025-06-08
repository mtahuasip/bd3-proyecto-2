from flask_restx import Namespace, Resource, reqparse
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.daos.category_dao import category_dao
from src.models.category_model import category_input, category_output, category_update
from src.utils.decorators import roles_required

ns = Namespace("categories")


@ns.route("/")
class CategoryList(Resource):
    @ns.doc("get_categories")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(category_output)
    def get(self):
        """Devuelve todas las categorías"""
        return category_dao.get_all()

    @ns.doc("create_category")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.expect(category_input, validate=True)
    @ns.marshal_with(category_output, code=201)
    def post(self):
        """Crea una nueva categoría"""
        return category_dao.create(api.payload), 201


@ns.route("/<string:id>")
@ns.response(404, "Categoría no encontrada")
class Category(Resource):
    @ns.doc("get_category")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(category_output)
    def get(self, id):
        """Devuelve la categoría con el id proporcionado"""
        return category_dao.get(id)

    @ns.doc("delete_category")
    @jwt_required()
    @roles_required("admin")
    @ns.response(200, "Categoría eliminada")
    def delete(self, id):
        """Elimina la categoría con el id proporcionado"""
        return category_dao.delete(id)

    @ns.doc("update_category")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.expect(category_update, validate=True)
    @ns.marshal_with(category_output)
    def patch(self, id):
        """Actualiza parcialmente la categoría con el id proporcionado"""
        return category_dao.update(id, api.payload)
