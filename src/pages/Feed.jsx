import {useState} from "react"
import {ThumbsUp, MessageCircle, Plus, PaperClip, Image} from "lucide-react"
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


            </div>
        </div>
    )
}