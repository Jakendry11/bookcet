from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import ConversaIA, MensagemIA, Utilizador, UtilizadorDisciplina
from schemas import MensagemIACreate
from routers.usuarios import get_utilizador_atual
from services.groq_service import enviar_mensagem

router = APIRouter(prefix="/ia", tags=["IA Académica"])

@router.post("/conversas", status_code=201)
def nova_conversa(
    utilizador: Utilizador = Depends(get_utilizador_atual),
    db: Session = Depends(get_db)
):
    conversa = ConversaIA(utilizador_id=utilizador.id)
    db.add(conversa)
    db.commit()
    db.refresh(conversa)
    return {"id": conversa.id, "titulo": conversa.titulo, "criado_em": conversa.criado_em}

@router.get("/conversas")
def listar_conversas(
    utilizador: Utilizador = Depends(get_utilizador_atual),
    db: Session = Depends(get_db)
):
    conversas = db.query(ConversaIA).filter(
        ConversaIA.utilizador_id == utilizador.id
    ).order_by(ConversaIA.atualizado_em.desc()).all()
    return [{"id": c.id, "titulo": c.titulo, "criado_em": c.criado_em} for c in conversas]

@router.post("/conversas/{conversa_id}/mensagens")
def enviar_mensagem_ia(
    conversa_id: int,
    dados: MensagemIACreate,
    utilizador: Utilizador = Depends(get_utilizador_atual),
    db: Session = Depends(get_db)
):
    conversa = db.query(ConversaIA).filter(
        ConversaIA.id == conversa_id,
        ConversaIA.utilizador_id == utilizador.id
    ).first()
    if not conversa:
        raise HTTPException(status_code=404, detail="Conversa não encontrada")

    # Guarda mensagem do utilizador
    msg_user = MensagemIA(conversa_id=conversa_id, papel="user", conteudo=dados.conteudo)
    db.add(msg_user)
    db.commit()

    # Busca histórico
    historico = db.query(MensagemIA).filter(
        MensagemIA.conversa_id == conversa_id
    ).order_by(MensagemIA.criado_em).all()

    mensagens = [{"role": m.papel, "content": m.conteudo} for m in historico]

    # Busca disciplinas do utilizador
    disciplinas = db.query(UtilizadorDisciplina).filter(
        UtilizadorDisciplina.utilizador_id == utilizador.id
    ).all()

    perfil = {
        "nome": utilizador.nome,
        "ano_escolar": utilizador.ano_escolar,
        "curso": utilizador.curso,
        "disciplinas": [d.disciplina for d in disciplinas]
    }

    # Chama Groq com perfil do utilizador
    try:
        resposta_texto = enviar_mensagem(mensagens, perfil)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Erro na IA: {str(e)}")

    # Guarda resposta
    msg_assistant = MensagemIA(conversa_id=conversa_id, papel="assistant", conteudo=resposta_texto)
    db.add(msg_assistant)

    if len(historico) == 1:
        conversa.titulo = dados.conteudo[:60]  # type: ignore[assignment]

    db.commit()

    return {"papel": "assistant", "conteudo": resposta_texto}