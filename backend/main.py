from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models
from routers import auth, usuarios, publicacoes, ia

# Cria as tabelas na base de dados
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BOOKCET API",
    version="1.0.0",
    description="API do BOOKCET — Plataforma de aprendizagem colaborativa"
)

# CORS — permite o frontend aceder ao backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(auth.router)
app.include_router(usuarios.router)
app.include_router(publicacoes.router)
app.include_router(ia.router)

@app.get("/")
def root():
    return {"message": "BOOKCET API online", "version": "1.0.0"}