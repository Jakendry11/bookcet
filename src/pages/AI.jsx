import { useState, useEffect } from "react"
import { Send, Paperclip } from "lucide-react"
import Navbar from "@/components/ui/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"

const API_URL = "http://localhost:8000"

export default function IA() {
  const { iniciais } = useAuth()
  const [mensagens, setMensagens] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [conversaId, setConversaId] = useState(null)

  // Cria uma conversa ao entrar na página
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    fetch(`${API_URL}/ia/conversas`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setConversaId(data.id))
      .catch(() => console.error("Erro ao criar conversa"))
  }, [])

  const enviarMensagem = async () => {
    if (!inputValue.trim() || !conversaId || carregando) return

    const texto = inputValue
    const novaMensagem = { id: Date.now(), papel: "user", conteudo: texto }
    setMensagens(prev => [...prev, novaMensagem])
    setInputValue("")
    setCarregando(true)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/ia/conversas/${conversaId}/mensagens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ conteudo: texto })
      })
      const data = await res.json()
      setMensagens(prev => [
        ...prev,
        { id: Date.now(), papel: "assistant", conteudo: data.conteudo }
      ])
    } catch {
      setMensagens(prev => [
        ...prev,
        { id: Date.now(), papel: "assistant", conteudo: "Erro ao contactar a IA. Tenta novamente." }
      ])
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage="ia" />

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-4 gap-6">

        {/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-4">
          <Button
            onClick={() => {
              const token = localStorage.getItem("token")
              if (!token) return
              fetch(`${API_URL}/ia/conversas`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
              })
                .then(res => res.json())
                .then(data => {
                  setConversaId(data.id)
                  setMensagens([])
                })
            }}
            className="w-full bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800] text-sm"
          >
            + Nova conversa
          </Button>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-medium text-[#0D2B6B] mb-3">Histórico</p>
            <p className="text-xs text-slate-400">Sem conversas ainda</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-medium text-[#0D2B6B] mb-3">Roadmap Actual</p>
            <p className="text-xs text-slate-400">Completa o onboarding para ver o roadmap</p>
          </div>
        </div>

        {/* Chat */}
        <div className="col-span-3 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-[600px]">

          {/* Header */}
          <div className="bg-[#0D2B6B] px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F5C200] flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-[#0D2B6B]">🤖</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">BOOKCET IA</p>
              <p className="text-xs text-white/60">Assistente académico</p>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-6">
            {mensagens.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-slate-400 text-sm">Nenhuma mensagem ainda</p>
                  <p className="text-slate-300 text-xs mt-1">Começa uma conversa</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {mensagens.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.papel === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.papel === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-[#F5C200] flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">🤖</span>
                      </div>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-lg ${
                        msg.papel === "user"
                          ? "bg-[#0D2B6B] text-white rounded-br-none"
                          : "bg-[#EBF2FF] text-[#0D2B6B] rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.conteudo}</p>
                    </div>
                    {msg.papel === "user" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-[#1A4BA0] text-white text-xs font-medium">
                          {iniciais}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {carregando && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F5C200] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🤖</span>
                    </div>
                    <div className="bg-[#EBF2FF] text-[#0D2B6B] px-4 py-2.5 rounded-lg rounded-bl-none">
                      <p className="text-sm">A pensar...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-4 bg-gray-50">
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                <Paperclip size={18} />
              </Button>
              <Input
                placeholder="Faz uma pergunta..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                className="flex-1"
                disabled={carregando}
              />
              <Button
                onClick={enviarMensagem}
                className="bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800]"
                disabled={carregando || !conversaId}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}