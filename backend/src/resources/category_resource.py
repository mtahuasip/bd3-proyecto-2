from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.models.category import category_dao
from src.schemas.category_schema import category
from src.utils.security.roles_required import roles_required

ns = Namespace("categories")


# Ruta para manejar todas las categorías
@ns.route("/")
class CategoryList(Resource):
    @ns.doc("get_categories")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(category)
    def get(self):
        """Devuelve todas las categorías"""
        return category_dao.get_all()

    @ns.doc("create_category")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.expect(category, validate=True)
    @ns.marshal_with(category, code=201)
    def post(self):
        """Crea una nueva categoría"""
        return category_dao.create(api.payload), 201


# Ruta para manejar una categoría específica
@ns.route("/<string:id>")
@ns.response(404, "Categoría no encontrada")
class Category(Resource):
    @ns.doc("get_category")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(category)
    def get(self, id):
        """Devuelve la categoría con el id proporcionado"""
        return category_dao.get(id)

    @ns.doc("delete_category")
    @jwt_required()
    @roles_required("admin")
    @ns.response(204, "Categoría eliminada")
    def delete(self, id):
        """Elimina la categoría con el id proporcionado"""
        category_dao.delete(id)
        return "", 204

    @ns.doc("update_category")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.expect(category, validate=True)
    @ns.marshal_with(category)
    def patch(self, id):
        """Actualiza parcialmente la categoría con el id proporcionado"""
        return category_dao.update(id, api.payload)
