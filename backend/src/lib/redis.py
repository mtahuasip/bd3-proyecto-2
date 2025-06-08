from redis.exceptions import ConnectionError, TimeoutError
from src.extensions import redis


def init_redis(app):
    try:
        redis.init_app(app)
        redis.ping()
        print(f"✅ Conexión a Redis establecida")
    except (ConnectionError, TimeoutError) as e:
        print(f"❌ Fallo de conexión a Redis: {e}")
