from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class UtilizadorRegisto(BaseModel):
    nome: str
    email: EmailStr
    password: str
    ano_escolar: str
    curso: str

class UtilizadorLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UtilizadorResponse(BaseModel):
    id: int
    nome: str
    email: str
    ano_escolar: str
    curso: str
    criado_em: datetime

    model_config = {"from_attributes": True}

class PublicacaoCreate(BaseModel):
    disciplina: str
    titulo: str
    conteudo: str

class PublicacaoResponse(BaseModel):
    id: int
    titulo: str
    conteudo: str
    disciplina: str
    autor_nome: str
    votos: int
    respondida: bool
    criado_em: datetime

    model_config = {"from_attributes": True}

class RespostaCreate(BaseModel):
    conteudo: str

class RespostaResponse(BaseModel):
    id: int
    conteudo: str
    autor_nome: str
    votos: int
    eh_melhor_resposta: bool
    criado_em: datetime

    model_config = {"from_attributes": True}

class MensagemIACreate(BaseModel):
    conteudo: str

class MensagemIAResponse(BaseModel):
    papel: str
    conteudo: str
    criado_em: datetime

    model_config = {"from_attributes": True}

class ConversaIAResponse(BaseModel):
    id: int
    titulo: Optional[str] = None
    mensagens: List[MensagemIAResponse] = []
    criado_em: datetime

    model_config = {"from_attributes": True}