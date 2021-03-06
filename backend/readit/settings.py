import os


class DB:
    hostname: str = os.environ.get("DB_HOSTNAME", "localhost")
    port: int = int(os.environ.get("DB_PORT", 27017))
    username = os.environ.get("DB_USERNAME")
    password = os.environ.get("DB_PASSWORD")


class Secrets:
    jwt_sign = os.environ.get("JWT_SECRET", "none")
    vk_app = os.environ.get("VK_SECRET", "none")
    google_app = os.environ.get("GOOGLE_SECRET", "none")
    github_app = os.environ.get("GITHUB_SECRET", "none")


class Server:
    host = os.environ.get("SERVER_HOST", "localhost")
    port = int(os.environ.get("SERVER_PORT", 5000))
    in_debug: bool = os.environ.get("APP_DEBUG", "false").lower() == "true"
    frontend_server_url = os.environ.get("FRONTEND_URL", "http://localhost:8080")
