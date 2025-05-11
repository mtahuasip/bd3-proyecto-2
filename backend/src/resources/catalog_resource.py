from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required
from src.extensions import api
from src.models.catalog import catalog_dao
from src.schemas.catalog_schema import catalog
from src.decorators.roles_required import roles_required

ns = Namespace("catalogs")


# Ruta para manejar todos los catálogos
@ns.route("/")
class CatalogList(Resource):
    @ns.doc("get_catalogs")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_list_with(catalog)
    def get(self):
        """Devuelve todos los catálogos"""
        return catalog_dao.get_all()

    @ns.doc("create_catalog")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.expect(catalog, validate=True)
    @ns.marshal_with(catalog, code=201)
    def post(self):
        """Crea un nuevo catálogo"""
        return catalog_dao.create(api.payload), 201


# Ruta para manejar un catálogo específico
@ns.route("/<string:id>")
@ns.response(404, "Catálogo no encontrado")
class Catalog(Resource):
    @ns.doc("get_catalog")
    @jwt_required()
    @roles_required("admin", "staff", "user")
    @ns.marshal_with(catalog)
    def get(self, id):
        """Devuelve el catálogo con el id proporcionado"""
        return catalog_dao.get(id)

    @ns.doc("delete_catalog")
    @jwt_required()
    @roles_required("admin")
    @ns.response(204, "Catálogo eliminado")
    def delete(self, id):
        """Elimina el catálogo con el id proporcionado"""
        catalog_dao.delete(id)
        return "", 204

    @ns.doc("update_catalog")
    @jwt_required()
    @roles_required("admin", "staff")
    @ns.expect(catalog, validate=True)
    @ns.marshal_with(catalog)
    def patch(self, id):
        """Actualiza parcialmente el catálogo con el id proporcionado"""
        return catalog_dao.update(id, api.payload)
