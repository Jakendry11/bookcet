from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from database import get_db
from models import Publicacao, Resposta, Utilizador
from schemas import PublicacaoCreate, PublicacaoResponse, RespostaCreate, RespostaResponse
from routers.usuarios import get_utilizador_atual

router = APIRouter(prefix="/publicacoes", tags=["Publicações"])

@router.get("/", response_model=list[PublicacaoResponse])
def listar_publicacoes(
    disciplina: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    query = db.query(Publicacao)
    if disciplina and disciplina != "Todas":
        query = query.filter(Publicacao.disciplina == disciplina)
    publicacoes = query.order_by(Publicacao.criado_em.desc()).offset(skip).limit(limit).all()
    
    resultado = []
    for pub in publicacoes:
        resultado.append(PublicacaoResponse(
            id=pub.id,
            titulo=pub.titulo,
            conteudo=pub.conteudo,
            disciplina=pub.disciplina,
            autor_nome=pub.autor_obj.nome,
            votos=pub.votos,
            respondida=pub.respondida,
            criado_em=pub.criado_em,
        ))
    return resultado

@router.post("/", response_model=PublicacaoResponse, status_code=201)
def criar_publicacao(
    dados: PublicacaoCreate,
    utilizador: Utilizador = Depends(get_utilizador_atual),
    db: Session = Depends(get_db)
):
    pub = Publicacao(
        utilizador_id=utilizador.id,
        disciplina=dados.disciplina,
        titulo=dados.titulo,
        conteudo=dados.conteudo,
    )
    db.add(pub)
    db.commit()
    db.refresh(pub)
    
    return PublicacaoResponse(
        id=pub.id,
        titulo=pub.titulo,
        conteudo=pub.conteudo,
        disciplina=pub.disciplina,
        autor_nome=utilizador.nome,
        votos=pub.votos,
        respondida=pub.respondida,
        criado_em=pub.criado_em,
    )

@router.get("/{id}", response_model=PublicacaoResponse)
def obter_publicacao(id: int, db: Session = Depends(get_db)):
    pub = db.query(Publicacao).filter(Publicacao.id == id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Publicação não encontrada")
    return PublicacaoResponse(
        id=pub.id,
        titulo=pub.titulo,
        conteudo=pub.conteudo,
        disciplina=pub.disciplina,
        autor_nome=pub.autor_obj.nome,
        votos=pub.votos,
        respondida=pub.respondida,
        criado_em=pub.criado_em,
    )

@router.post("/{id}/votar")
def votar_publicacao(
    id: int,
    utilizador: Utilizador = Depends(get_utilizador_atual),
    db: Session = Depends(get_db)
):
    pub = db.query(Publicacao).filter(Publicacao.id == id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Publicação não encontrada")
    pub.votos += 1
    db.commit()
    return {"votos": pub.votos}

@router.get("/{id}/respostas", response_model=list[RespostaResponse])
def listar_respostas(id: int, db: Session = Depends(get_db)):
    respostas = db.query(Resposta).filter(Resposta.publicacao_id == id).all()
    return [
        RespostaResponse(
            id=r.id,
            conteudo=r.conteudo,
            autor_nome=r.autor_obj.nome,
            votos=r.votos,
            eh_melhor_resposta=r.eh_melhor_resposta,
            criado_em=r.criado_em,
        ) for r in respostas
    ]

@router.post("/{id}/respostas", response_model=RespostaResponse, status_code=201)
def criar_resposta(
    id: int,
    dados: RespostaCreate,
    utilizador: Utilizador = Depends(get_utilizador_atual),
    db: Session = Depends(get_db)
):
    pub = db.query(Publicacao).filter(Publicacao.id == id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Publicação não encontrada")
    
    resposta = Resposta(
        publicacao_id=id,
        utilizador_id=utilizador.id,
        conteudo=dados.conteudo,
    )
    db.add(resposta)
    db.commit()
    db.refresh(resposta)
    
    return RespostaResponse(
        id=resposta.id,
        conteudo=resposta.conteudo,
        autor_nome=utilizador.nome,
        votos=resposta.votos,
        eh_melhor_resposta=resposta.eh_melhor_resposta,
        criado_em=resposta.criado_em,
    )