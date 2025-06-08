from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask_restx import abort


def roles_required(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            user_roles = claims.get("roles", [])

            if not any(role in user_roles for role in roles):
                abort(403, "No tienes permisos para acceder a esta ruta")

            return fn(*args, **kwargs)

        return decorator

    return wrapper
