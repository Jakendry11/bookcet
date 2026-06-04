import { useState, useEffect } from "react"
import { Settings, LogOut } from "lucide-react"
import Navbar from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Perfil() {
  const [aba, setAba] = useState("perguntas")
  const [utilizador, setUtilizador] = useState(null)
  const [carregando, setCarregando] = useState(true)

  // Aqui será carregado o utilizador via API
  // useEffect(() => {
  //   fetch('/api/me')
  //     .then(res => res.json())
  //     .then(data => { setUtilizador(data); setCarregando(false); })
  // }, [])

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar activePage="perfil" />
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-400">A carregar...</p>
        </div>
      </div>
    )
  }

  if (!utilizador) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar activePage="perfil" />
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-400">Por favor faça login</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage="perfil" />

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Banner do perfil */}
        <div className="bg-[#0D2B6B] rounded-xl p-8 mb-8 flex items-center gap-6">
          <Avatar className="w-20 h-20 border-4 border-[#F5C200]">
            <AvatarFallback className="bg-[#1A4BA0] text-white text-2xl font-bold">
              {utilizador?.iniciais || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{utilizador?.nome || "Utilizador"}</h1>
            <p className="text-white/70 text-sm mb-3">
              {utilizador?.ano_escolar} · {utilizador?.curso}
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-[#F5C200] font-bold text-2xl">{utilizador?.total_perguntas || 0}</p>
                <p className="text-white/60 text-xs">perguntas</p>
              </div>
              <div>
                <p className="text-[#F5C200] font-bold text-2xl">{utilizador?.total_respostas || 0}</p>
                <p className="text-white/60 text-xs">respostas</p>
              </div>
              <div>
                <p className="text-[#F5C200] font-bold text-2xl">{utilizador?.pontos || 0}</p>
                <p className="text-white/60 text-xs">pontos</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <LogOut size={18} />
            </Button>
          </div>
        </div>

        {/* Abas */}
        <div className="bg-white border-b border-slate-200 mb-6 rounded-t-xl">
          <div className="flex gap-8 px-6">
            <button
              onClick={() => setAba("perguntas")}
              className={`py-4 font-medium text-sm border-b-2 transition-colors ${
                aba === "perguntas"
                  ? "text-[#0D2B6B] border-[#0D2B6B]"
                  : "text-slate-500 border-transparent hover:text-slate-700"
              }`}
            >
              Minhas Perguntas
            </button>
            <button
              onClick={() => setAba("roadmap")}
              className={`py-4 font-medium text-sm border-b-2 transition-colors ${
                aba === "roadmap"
                  ? "text-[#0D2B6B] border-[#0D2B6B]"
                  : "text-slate-500 border-transparent hover:text-slate-700"
              }`}
            >
              Meu Roadmap
            </button>
          </div>
        </div>

        {/* Conteúdo das abas */}
        <div className="grid grid-cols-3 gap-6">

          {/* Coluna principal */}
          <div className="col-span-2">
            {aba === "perguntas" && (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                <p className="text-slate-400">Nenhuma pergunta ainda</p>
              </div>
            )}

            {aba === "roadmap" && (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                <p className="text-slate-400">Roadmap será carregado aqui</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-1 flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-medium text-[#0D2B6B] mb-3">Informações</p>
              <div className="space-y-2 text-xs text-slate-600">
                <p><strong>Email:</strong> {utilizador?.email}</p>
                <p><strong>Ano:</strong> {utilizador?.ano_escolar}</p>
                <p><strong>Curso:</strong> {utilizador?.curso}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-medium text-[#0D2B6B] mb-3">Disciplinas</p>
              <p className="text-xs text-slate-400">
                {utilizador?.disciplinas?.length || 0} disciplinas registadas
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}