import { useState } from "react"
import { ThumbsUp, MessageCircle, Plus, BookOpen, Search } from "lucide-react"
import Navbar from "@/components/ui/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const disciplinas = [
  "Todas",
  "Matemática",
  "Física",
  "Química",
  "Português",
  "Inglês",
  "Programação",
  "Desenho",
  "Empreendedorismo",
]

export default function Feed({ publicacoes = [] }) {
  const [filtro, setFiltro] = useState("Todas")
  const [votados, setVotados] = useState([])
  const [pesquisa, setPesquisa] = useState("")

  const publicacoesFiltradas = publicacoes.filter((pub) => {
    const filtroOk = filtro === "Todas" || pub.disciplina === filtro
    const pesquisaOk = pub.titulo.toLowerCase().includes(pesquisa.toLowerCase())
    return filtroOk && pesquisaOk
  })

  const toggleVoto = (id) => {
    setVotados((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar activePage="feed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-[#0D2B6B]">Feed da comunidade</h1>
            <Button className="bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800] font-semibold">
              <Plus size={18} className="mr-2" />
              Nova pergunta
            </Button>
          </div>

          {/* Barra de pesquisa */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <Input
              placeholder="Pesquisar perguntas..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="pl-10 py-2 text-sm"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {disciplinas.map((d) => (
            <button
              key={d}
              onClick={() => setFiltro(d)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filtro === d
                  ? "bg-[#0D2B6B] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-[#0D2B6B] hover:text-[#0D2B6B]"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Layout com grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Feed principal — 2 colunas */}
          <div className="lg:col-span-2">
            {publicacoesFiltradas.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                <div className="w-16 h-16 rounded-full bg-[#EBF2FF] flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={28} className="text-[#1A4BA0]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0D2B6B] mb-2">Nenhuma pergunta encontrada</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Sê o primeiro a partilhar uma dúvida com a comunidade ou ajusta o filtro.
                </p>
                <Button className="bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800] font-semibold">
                  <Plus size={16} className="mr-2" />
                  Nova pergunta
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {publicacoesFiltradas.map((pub) => (
                  <div
                    key={pub.id}
                    className="bg-white rounded-xl p-6 border border-slate-200 hover:border-[#0D2B6B] hover:shadow-lg transition-all cursor-pointer"
                  >
                    {/* Header com autor e tempo */}
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarFallback className="bg-[#EBF2FF] text-[#1A4BA0]"></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}