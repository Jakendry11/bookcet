from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Utilizador, UtilizadorDisciplina, RoadmapUtilizador
from schemas import UtilizadorResponse
from utils.jwt_utils import verificar_token
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/usuarios", tags=["Utilizadores"])
oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_utilizador_atual(token: str = Depends(oauth2), db: Session = Depends(get_db)):
    payload = verificar_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido")
    utilizador = db.query(Utilizador).filter(Utilizador.id == int(payload["sub"])).first()
    if not utilizador:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado")
    return utilizador

@router.get("/me", response_model=UtilizadorResponse)
def get_perfil(utilizador: Utilizador = Depends(get_utilizador_atual)):
    return utilizador

@router.post("/disciplinas")
def guardar_disciplinas(
    dados: dict,
    utilizador: Utilizador = Depends(get_utilizador_atual),
    db: Session = Depends(get_db)
):
    # Remove disciplinas antigas
    db.query(UtilizadorDisciplina).filter(
        UtilizadorDisciplina.utilizador_id == utilizador.id
    ).delete()

    # Insere novas
    for disc in dados.get("disciplinas", []):
        nova = UtilizadorDisciplina(
            utilizador_id=utilizador.id,
            disciplina=disc["disciplina"],
            nivel_dificuldade=disc.get("nivel_dificuldade", "Média"),
        )
        db.add(nova)
    
    db.commit()
    return {"message": "Disciplinas guardadas com sucesso"}