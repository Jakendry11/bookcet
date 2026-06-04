from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    MYSQL_HOST: str = "localhost"
    MYSQL_PORT: int = 3306
    MYSQL_USER: str = "root"
    MYSQL_PASSWORD: str = "password"
    MYSQL_DB: str = "bookcet_db"
    
    JWT_SECRET_KEY: str = "bookcet_chave_secreta_2024"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 24
    
    ANTHROPIC_API_KEY: str = ""
    
    model_config = {"env_file": ".env"}

@lru_cache()
def get_settings():
    return Settings()