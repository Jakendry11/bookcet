from groq import Groq
from config import get_settings

settings = get_settings()
client = Groq(api_key=settings.GROQ_API_KEY)

def criar_system_prompt(perfil: dict | None = None) -> str:
    base = """És o assistente académico do BOOKCET, uma plataforma de aprendizagem colaborativa 
para um instituto técnico médio em Angola.

Regras importantes:
- Não dás respostas directas — ensinas o raciocínio passo a passo
- Usas exemplos práticos e do contexto angolano quando possível
- Falas em Português europeu
- Adaptas a linguagem ao nível do estudante
- Quando o estudante errar, corriges com paciência e explicas porquê
"""
    if perfil:
        disciplinas_str = ", ".join(perfil.get("disciplinas", [])) or "Não definidas"
        base += f"""
Perfil do estudante com quem estás a falar:
- Nome: {perfil.get("nome", "Desconhecido")}
- Ano escolar: {perfil.get("ano_escolar", "Desconhecido")}
- Curso: {perfil.get("curso", "Desconhecido")}
- Disciplinas: {disciplinas_str}

Usa este perfil para personalizar as tuas respostas. Não perguntes o curso ou ano — já sabes.
Adapta os exemplos e explicações ao curso e nível do estudante.
"""
    return base

def enviar_mensagem(mensagens: list, perfil: dict | None = None) -> str:
    system_prompt = criar_system_prompt(perfil)

    mensagens_completas = [
        {"role": "system", "content": system_prompt}
    ] + mensagens

    resposta = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=mensagens_completas,  # type: ignore
        max_tokens=1024,
        temperature=0.7,
    )

    return resposta.choices[0].message.content or ""