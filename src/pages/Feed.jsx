import {useState} from "react"
import {ThumbsUp, MessageCircle, Plus, Paperclip, Image, BookOpen} from "lucide-react"
import Navbar from "@/components/ui/navbar"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"

const disciplinas = [
    "Todas", 
    "Matemática",
    "Física",
    "Química",
    "Língua Portuguesa",
    "Língua Inglesa",
    "Informática",
    "Eletrotecnia",
    "Organização e Gestão Industrial",
    "Organização e Gestão Empresarial", 
    "Formação de Atitudes Integradoras", 
    "Técnicas de Reparação de Equipamentos Informáticos",
    "Técnicas de Linguagem de Programação",
    "Sistemas e Estruturas de Arquitetura de Computadores",
    "Projeto Tecnológico",
    "Empreendedorismo",
    "Desenho Técnico",
]

const roadmapItems = [
    {texto: "Tópico 1", estado: "active"},
    {texto: "Tópico 2", estado: "pending"},
    {texto: "Tópico 3", estado: "pending"},
]

export default function Feed({publicacoes = [] }) {
    const [filtro, setFiltro] = useState("Todas")
    const [votados, setVotados] = useState([])

    const publicacoesFiltradas = filtro === "Todas" 
    ? publicacoes
    : publicacoes.filter(pub => pub.disciplina === filtro)

    const toggleVoto = (id) => {
        setVotados(prev =>
            prev.includes(id)
            ? prev.filter(v => v !== id)
            : [...prev, id]
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar activePage="Feed"/>
        
            <div className="max-w-6xl mx-auto px-6 py-8 grid ggrid-cols-3 gap-6">

                {/* Coluna principal */}
                <div className="col-span-2">
                    
                    <div className="flex items-center justify-between mb-4">                    
                        <h1 className="text-base font-semibold text-[#0D2B6B]">Feed da comunidade</h1>
                        <Button className="bg-[F5C200] text-[#0D2B6B] hover:bg-[#e6b800] text-sm font-medium flex items-center gap-2">
                            <Plus size={14} />
                            Nova pergunta
                        </Button>
                    </div>

                </div>
                
                {/* Filtros */}

                <div className="flex gap-2 flex wrap mb-5">
                    {disciplinas.map((d) => (
                        <button
                            key={d}
                            onClick={() => setFiltro(d)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                filtro === d
                                    ? "bg-[#0D2B6B] text-white border-[#0D2B6B]"
                            : "bg-white text-slate-500 border-slate-200 hover:border-[#0D2B6B] hover:text-[#0D2B6B]"
                            }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>

                {/* Cards ou estado vazio */}
                <div>
                {publicacoesFiltradas.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-[#EBF2FF] flex items-center justify-center mb-4">
                            <BookOpen size={22} className="text-[#1A4BA0]"/>
                        </div>
                        <p className="text-sm font-medium text-[#0D2B6B] mb-1">Ainda não há publicações.</p>
                        <p className="text-xs text-slate-400 mb-5">Sê o primeiro a partilhar uma dúvida com a comunidade.</p>
                        <Button className="bg-[F5C200] text-[#0D2B6B] hover:bg-[#e6b800] text-sm font-medium flex items-center gap-2">
                            <Plus size={14} />
                            Nova pergunta
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {publicacoesFiltradas.map((pub) => (
                            <div key={pub.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#2E6DA4] transition-colors cursor-pointer">
                                <div className="flex items-start gap-3 mb-3">
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback className="bg-[#EBF2FF] text-[#1A4BA0] text-xs font-medium">
                                            {pub.iniciais}
                                            </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium text-[#0D2B6B]">{pub.autor}</span>
                                             <span className="text-xs text-slate-400">· {pub.tempo}</span>
                        {pub.respondida && (
                          <span className="ml-auto text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            Respondida
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-800 mb-1">{pub.titulo}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-3 ml-11">{pub.preview}</p>

                  {pub.anexo && (
                    <div className="ml-11 flex items-center gap-2 text-xs text-slate-400 mb-3">
                      {pub.anexo.tipo === "imagem" ? <Image size={13} /> : <Paperclip size={13} />}
                      <span>{pub.anexo.nome}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 ml-11">
                    <Badge variant="secondary" className="bg-[#EBF2FF] text-[#1A4BA0] text-xs">
                      {pub.disciplina}
                    </Badge>
                    <button
                      onClick={() => toggleVoto(pub.id)}
                      className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition-colors ${
                        votados.includes(pub.id)
                          ? "bg-[#EBF2FF] text-[#1A4BA0] border-[#1A4BA0]"
                          : "text-slate-500 border-slate-200 hover:border-[#1A4BA0] hover:text-[#1A4BA0]"
                      }`}
                    >
                      <ThumbsUp size={12} />
                      {votados.includes(pub.id) ? pub.votos + 1 : pub.votos}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border border-slate-200 text-slate-500 hover:border-[#1A4BA0] hover:text-[#1A4BA0] transition-colors">
                      <MessageCircle size={12} />
                      {pub.respostas}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-sm font-medium text-[#0D2B6B] mb-1">O meu roadmap</p>
            <p className="text-xs text-slate-400 mb-4">Completa o onboarding para ver o teu roadmap.</p>
            <div className="flex flex-col gap-2.5">
              {roadmapItems.map((item) => (
                <div key={item.texto} className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.estado === "done" ? "bg-green-500"
                    : item.estado === "active" ? "bg-[#F5C200]"
                    : "bg-slate-200"
                  }`} />
                  <span className="text-xs text-slate-400">{item.texto}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-[#0D2B6B] text-white hover:bg-[#1A4BA0] text-xs">
              Completar onboarding
            </Button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-sm font-medium text-[#0D2B6B] mb-3">Disciplinas ativas</p>
            <p className="text-xs text-slate-400">
              Ainda não há actividade. As disciplinas com mais perguntas aparecem aqui.
            </p>
          </div>

        </div>
      </div>
    
    </div>
  )
}