title = "Plataforma de Streaming"
description = (
    "API RESTful para la Plataforma de Streaming.\n\n"
    "Esta documentación describe los endpoints disponibles, "
    "los métodos HTTP permitidos y los parámetros necesarios "
    "para interactuar con el backend desarrollado en Flask utilizando Flask-RESTx."
)
version = "1.0.0"
security = "Bearer Auth"
authorizations = {
    "Bearer Auth": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
        "description": "Token JWT con el prefijo **Bearer**, por ejemplo: `Bearer eyJhbGci...`",
    }
}
doc = "/api/docs"
prefix = "/api"
