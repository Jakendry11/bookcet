from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Utilizador(Base):
    __tablename__ = "utilizadores"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    ano_escolar = Column(String(50), nullable=False)
    curso = Column(String(255), nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow)
    atualizado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    publicacoes = relationship("Publicacao", back_populates="autor_obj")
    respostas = relationship("Resposta", back_populates="autor_obj")
    conversas_ia = relationship("ConversaIA", back_populates="utilizador")

class UtilizadorDisciplina(Base):
    __tablename__ = "utilizador_disciplinas"
    
    id = Column(Integer, primary_key=True, index=True)
    utilizador_id = Column(Integer, ForeignKey("utilizadores.id"), nullable=False)
    disciplina = Column(String(255), nullable=False)
    nivel_dificuldade = Column(String(50), default="Média")

class Publicacao(Base):
    __tablename__ = "publicacoes"
    
    id = Column(Integer, primary_key=True, index=True)
    utilizador_id = Column(Integer, ForeignKey("utilizadores.id"), nullable=False)
    disciplina = Column(String(255), nullable=False, index=True)
    titulo = Column(String(500), nullable=False)
    conteudo = Column(Text, nullable=False)
    respondida = Column(Boolean, default=False)
    votos = Column(Integer, default=0)
    criado_em = Column(DateTime, default=datetime.utcnow, index=True)
    atualizado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    autor_obj = relationship("Utilizador", back_populates="publicacoes")
    respostas = relationship("Resposta", back_populates="publicacao")
    anexos = relationship("PublicacaoAnexo", back_populates="publicacao")

class Resposta(Base):
    __tablename__ = "respostas"
    
    id = Column(Integer, primary_key=True, index=True)
    publicacao_id = Column(Integer, ForeignKey("publicacoes.id"), nullable=False)
    utilizador_id = Column(Integer, ForeignKey("utilizadores.id"), nullable=False)
    conteudo = Column(Text, nullable=False)
    votos = Column(Integer, default=0)
    eh_melhor_resposta = Column(Boolean, default=False)
    criado_em = Column(DateTime, default=datetime.utcnow)
    
    publicacao = relationship("Publicacao", back_populates="respostas")
    autor_obj = relationship("Utilizador", back_populates="respostas")

class PublicacaoAnexo(Base):
    __tablename__ = "publicacao_anexos"
    
    id = Column(Integer, primary_key=True, index=True)
    publicacao_id = Column(Integer, ForeignKey("publicacoes.id"), nullable=False)
    tipo = Column(String(50), nullable=False)  # 'imagem', 'pdf', 'word'
    nome_ficheiro = Column(String(255), nullable=False)
    url_ficheiro = Column(String(500), nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow)
    
    publicacao = relationship("Publicacao", back_populates="anexos")

class ConversaIA(Base):
    __tablename__ = "conversas_ia"
    
    id = Column(Integer, primary_key=True, index=True)
    utilizador_id = Column(Integer, ForeignKey("utilizadores.id"), nullable=False)
    titulo = Column(String(255))
    criado_em = Column(DateTime, default=datetime.utcnow)
    atualizado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    utilizador = relationship("Utilizador", back_populates="conversas_ia")
    mensagens = relationship("MensagemIA", back_populates="conversa")

class MensagemIA(Base):
    __tablename__ = "mensagens_ia"
    
    id = Column(Integer, primary_key=True, index=True)
    conversa_id = Column(Integer, ForeignKey("conversas_ia.id"), nullable=False)
    papel = Column(String(20), nullable=False)  # 'user' ou 'assistant'
    conteudo = Column(Text, nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow)
    
    conversa = relationship("ConversaIA", back_populates="mensagens")

class RoadmapUtilizador(Base):
    __tablename__ = "roadmap_utilizador"
    
    id = Column(Integer, primary_key=True, index=True)
    utilizador_id = Column(Integer, ForeignKey("utilizadores.id"), nullable=False)
    disciplina = Column(String(255), nullable=False)
    topicos_json = Column(JSON, nullable=False)  # Array de tópicos com estado
    progresso_percentagem = Column(Integer, default=0)
    criado_em = Column(DateTime, default=datetime.utcnow)
    atualizado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)