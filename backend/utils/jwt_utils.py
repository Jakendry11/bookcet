from datetime import datetime, timedelta
from typing import Any, Dict, Optional
from jose import JWTError, jwt
from config import get_settings

settings = get_settings()

def criar_token(data: Dict[str, Any]) -> str:
    payload = data.copy()
    expiracao = datetime.utcnow() + timedelta(hours=settings.JWT_EXPIRATION_HOURS)
    payload.update({"exp": expiracao})
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

def verificar_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        return None