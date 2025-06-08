from bson import ObjectId


def verify_id(id, api):
    if not ObjectId.is_valid(id):
        api.abort(400, "Id invalido")


def str_to_bool(value):
    return str(value).strip().lower() in ("true", "1", "yes", "on")


def movies_build_filter_query(title=None, categories=None, year=None):
    filter_query = {}

    if title:
        filter_query["title"] = {"$regex": title, "$options": "i"}

    if categories:
        if isinstance(categories, str) and "," in categories:
            categories = [c.strip() for c in categories.split(",") if c.strip()]
        if isinstance(categories, list):
            filter_query["categories"] = {"$in": categories}
        else:
            filter_query["categories"] = {"$regex": categories, "$options": "i"}

    if year:
        filter_query["year"] = str(year)

    return filter_query
