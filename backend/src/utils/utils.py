from bson import ObjectId


def verify_id(id, api):
    if not ObjectId.is_valid(id):
        api.abort(400, "Id invalido")


def str_to_bool(value):
    return str(value).strip().lower() in ("true", "1", "yes", "on")
