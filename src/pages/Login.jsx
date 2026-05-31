import { useState } from "react"
import { Brain, Map, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Login() {
  const [tab, setTab] = useState("entrar")

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid grid-cols-2 gap-12 items-center">

        <div>
          <span className="text-[#F5C200] font-bold text-3xl tracking-wide bg-[#0D2B6B] px-4 py-2 rounded-md inline-block mb-6">
            BOOKCET
          </span>
          <h1 className="text-2xl font-semibold text-[#0D2B6B] mb-3">
            Bem-vindo ao BOOKCET
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            A plataforma de aprendizagem colaborativa da tua escola. Tira dúvidas,
            partilha conhecimento e recebe um plano de estudo personalizado.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EBF2FF] flex items-center justify-center flex-shrink-0">
                <Users size={16} className="text-[#1A4BA0]" />
              </div>
              <span className="text-sm text-slate-600">Comunidade da tua escola</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EBF2FF] flex items-center justify-center flex-shrink-0">
                <Brain size={16} className="text-[#1A4BA0]" />
              </div>
              <span className="text-sm text-slate-600">IA académica personalizada</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EBF2FF] flex items-center justify-center flex-shrink-0">
                <Map size={16} className="text-[#1A4BA0]" />
              </div>
              <span className="text-sm text-slate-600">Roadmap do teu percurso</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-8">
          <div className="flex border border-slate-200 rounded-lg overflow-hidden mb-6">
            <button
              onClick={() => setTab("entrar")}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                tab === "entrar" ? "bg-[#0D2B6B] text-white" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setTab("registar")}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                tab === "registar" ? "bg-[#0D2B6B] text-white" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Registar
            </button>
          </div>

          {tab === "entrar" ? (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Email escolar</label>
                <Input placeholder="nome@escola.ao" type="email" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Palavra-passe</label>
                <Input placeholder="••••••••" type="password" />
              </div>
              <Button className="w-full bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800] font-medium mt-2">
                Entrar
              </Button>
              <p className="text-center text-xs text-slate-400 cursor-pointer hover:text-slate-600">
                Esqueci a palavra-passe
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Nome completo</label>
                <Input placeholder="O teu nome" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Email escolar</label>
                <Input placeholder="nome@escola.ao" type="email" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Palavra-passe</label>
                <Input placeholder="••••••••" type="password" />
              </div>
              <Button className="w-full bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800] font-medium mt-2">
                Criar conta
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}