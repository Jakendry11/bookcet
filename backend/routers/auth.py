from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from database import get_db
from models import Utilizador, UtilizadorDisciplina
from schemas import UtilizadorRegisto, UtilizadorLogin, Token, UtilizadorResponse
from utils.jwt_utils import criar_token

router = APIRouter(prefix="/auth", tags=["Autenticação"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/registar", response_model=UtilizadorResponse, status_code=201)
def registar(dados: UtilizadorRegisto, db: Session = Depends(get_db)):
    # Verifica se email já existe
    existente = db.query(Utilizador).filter(Utilizador.email == dados.email).first()
    if existente:
        raise HTTPException(status_code=400, detail="Email já registado")

    # Cria o utilizador
    utilizador = Utilizador(
        nome=dados.nome,
        email=dados.email,
        password_hash=pwd_context.hash(dados.password),
        ano_escolar=dados.ano_escolar,
        curso=dados.curso,
    )
    db.add(utilizador)
    db.commit()
    db.refresh(utilizador)
    return utilizador

@router.post("/login", response_model=Token)
def login(dados: UtilizadorLogin, db: Session = Depends(get_db)):
    utilizador = db.query(Utilizador).filter(Utilizador.email == dados.email).first()
    
    if not utilizador or not pwd_context.verify(dados.password, str(utilizador.password_hash)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou palavra-passe incorrectos"
        )
    
    token = criar_token({"sub": str(utilizador.id), "email": utilizador.email})
    return {"access_token": token, "token_type": "bearer"}