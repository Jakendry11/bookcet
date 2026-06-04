import anthropic
from config import get_settings

settings = get_settings()
client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

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
    resposta = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=mensagens,
    )
    return resposta.content[0].text  # type: ignore[union-attr]