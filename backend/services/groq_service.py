from groq import Groq
from groq.types.chat import ChatCompletionMessageParam
from config import get_settings

settings = get_settings()
client = Groq(api_key=settings.GROQ_API_KEY)

SYSTEM_PROMPT = """És o assistente académico do BOOKCET, uma plataforma de aprendizagem colaborativa 
para um instituto técnico médio em Angola. O teu papel é ajudar estudantes do ensino técnico médio 
(10ª, 11ª, 12ª, 13ª classe) nos cursos de Informática, GSI, Electrónica e Telecomunicações, 
Contabilidade e Gestão, Finanças e Desenhador Projetista.

Regras importantes:
- Não dás respostas directas — ensinas o raciocínio passo a passo
- Usas exemplos práticos e do contexto angolano quando possível
- Falas em Português europeu
- Adaptas a linguagem ao nível do estudante
- Quando o estudante errar, corriges com paciência e explicas porquê
"""

def enviar_mensagem(mensagens: list) -> str:
    # Adiciona system prompt no início
    mensagens_completas = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ] + mensagens

    resposta = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=mensagens_completas,  # type: ignore
        max_tokens=1024,
        temperature=0.7,
    )

    return resposta.choices[0].message.content or ""