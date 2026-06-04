import { useState } from "react"
import { Brain, Image, Paperclip } from "lucide-react"
import Navbar from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ThreadPublicacao({ publicacaoId = 1 }) {
  const [respostas, setRespostas] = useState([])
  const [novaResposta, setNovaResposta] = useState("")
  const [publicacao, setPublicacao] = useState(null)
  const [carregando, setCarregando] = useState(true)

  // Aqui serão carregados os dados da publicação via API
  // useEffect(() => {
  //   fetch(`/api/publicacoes/${publicacaoId}`)
  //     .then(res => res.json())
  //     .then(data => { setPublicacao(data); setCarregando(false); })
  // }, [publicacaoId])

  const adicionarResposta = async () => {
    if (!novaResposta.trim()) return

    // Aqui será feita a chamada à API para guardar a resposta
    // await fetch(`/api/publicacoes/${publicacaoId}/respostas`, { ... })

    setNovaResposta("")
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar activePage="feed" />
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-400">A carregar...</p>
        </div>
      </div>
    )
  }

  if (!publicacao) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar activePage="feed" />
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-400">Publicação não encontrada</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage="feed" />

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <a href="/feed" className="hover:text-[#1A4BA0]">Feed</a>
          <span>/</span>
          <span className="text-slate-600">Publicação</span>
        </div>

        {/* Publicação original — placeholder */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
          <p className="text-slate-400 text-center py-12">Publicação será carregada aqui</p>
        </div>

        {/* Respostas */}
        <div className="mb-8">
          <h2 className="text-base font-semibold text-[#0D2B6B] mb-4">
            {respostas.length} {respostas.length === 1 ? "resposta" : "respostas"}
          </h2>

          {respostas.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <p className="text-slate-400">Ainda não há respostas</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Respostas virão da API */}
            </div>
          )}
        </div>

        {/* Formulário de resposta */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-[#0D2B6B] mb-4">Escreve a tua resposta</h3>

          <Textarea
            placeholder="Partilha o teu conhecimento..."
            value={novaResposta}
            onChange={(e) => setNovaResposta(e.target.value)}
            className="mb-4 min-h-32"
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-slate-400">
                <Image size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400">
                <Paperclip size={18} />
              </Button>
            </div>
            <Button
              onClick={adicionarResposta}
              className="bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800]"
            >
              Responder
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}