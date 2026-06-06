import { useState } from "react"
import { ChevronRight, ChevronLeft, Check, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

const anos = ["10ª classe", "11ª classe", "12ª classe"]

const cursos = [
  "Técnico de Informática",
  "Gestão dos Sistemas Informáticos",
  "Electrónica e Telecomunicações",
  "Contabilidade e Gestão",
  "Finanças",
  "Desenhador Projetista",
]

const disciplinasComuns = {
  "10ª classe": ["Português", "Língua Inglesa", "Matemática", "Formação de Atitudes Integradoras"],
  "11ª classe": ["Português", "Língua Inglesa", "Matemática", "Formação de Atitudes Integradoras"],
  "12ª classe": ["Matemática"],
}

const disciplinasEspecificasPorCursoAno = {
  "Técnico de Informática": {
    "10ª classe": ["Eletrotecnia", "Tecnologias De Informação E De Comunicação", "Física", "Química", "Empreendedorismo", "Técnicas E Linguagens De Programação", "Sistemas De Exploração E Arquitetura De Computadores"],
    "11ª classe": ["Química", "Eletrotecnia", "Desenho Técnico", "Física", "Empreendedorismo", "Técnicas E Linguagens De Programação", "Sistemas De Exploração E Arquitetura De Computadores"],
    "12ª classe": ["Física", "Empreendedorismo", "Técnicas E Linguagens De Programação", "Sistemas De Exploração E Arquitetura De Computadores", "Técnicas De Reparação De Equipamentos Informáticos", "Organização E Gestão Industrial", "Projeto Tecnológico"],
  },
  "Gestão dos Sistemas Informáticos": {
    "10ª classe": ["Tecnologias De Informação E De Comunicação", "Física", "Química", "Empreendedorismo", "Técnicas E Linguagens De Programação", "Sistemas De Exploração E Arquitetura De Computadores"],
    "11ª classe": ["Química", "Tecnologias De Informação E De Comunicação", "Desenho Técnico", "Física", "Empreendedorismo", "Técnicas E Linguagens De Programação", "Sistemas De Exploração E Arquitetura De Computadores"],
    "12ª classe": ["Física", "Tecnologias De Informação E De Comunicação", "Empreendedorismo", "Técnicas E Linguagens De Programação", "Redes Informáticas", "Técnicas De Reparação De Equipamentos Informáticos", "Organização E Gestão Empresarial", "Projeto Tecnológico"],
  },
  "Electrónica e Telecomunicações": {
    "10ª classe": ["Química", "Física", "Informática Básica", "Eletricidade Eletrônica", "Tecnologia das Telecomunicações", "Práticas Oficinais Laboratoriais", "Empreendedorismo"],
    "11ª classe": ["Sistemas Digitais", "Eletricidade Eletrônica", "Tecnologia das Telecomunicações", "Física", "Química", "Desenho Técnico", "Princípios da Organização Laboral"],
    "12ª classe": ["Física", "Telecomunicações", "Tecnologia das Telecomunicações", "Eletricidade Eletrônica", "Sistemas Digitais", "Princípios da Organização Laboral", "Empreendedorismo"],
  },
  "Contabilidade e Gestão": {
    "10ª classe": ["Contabilidade Financeira", "Economia", "Documentação e Legislação Comercial", "Informática", "Organização e Gestão Empresarial", "Educação Física"],
    "11ª classe": ["Organização e Gestão Empresarial", "Sociologia das Organizações", "Contabilidade Financeira", "Informática", "Direito", "Educação Física"],
    "12ª classe": ["Análise Económica e Financeira", "Contabilidade Analítica", "Projeto Tecnológico", "Técnicas de Cálculo e Estatística", "Documentação e Legislação Fiscal", "Gestão Orçamental", "Organização e Gestão Empresarial"],
  },
  "Finanças": {
    "10ª classe": ["Contabilidade Financeira", "Economia", "Documentação e Legislação Comercial", "Informática", "Análise de Crédito e Financiamento", "Educação Física"],
    "11ª classe": ["Educação Física", "Análise de Crédito, Financiamento e Investimento", "Direito", "Contabilidade Financeira", "Informática", "Técnicas e Recursos Analíticos Contabilísticos"],
    "12ª classe": ["Análise Económica e Financeira", "Planejamento Financeiro Operacional", "Projeto Tecnológico", "Técnicas de Cálculo e Estatística", "Legislação Fiscal e Comercial", "Mercado de Capitais", "Análise de Crédito, Financiamento e Investimento"],
  },
  "Desenhador Projetista": {
    "10ª classe": ["Geometria Descritiva", "Desenho de Projeto", "Informática Aplicada na Construção Civil", "Técnicas de Construção Civil", "Empreendedorismo", "Química", "Educação Física", "Física"],
    "11ª classe": ["Geometria Descritiva", "Desenho de Projeto", "Informática Aplicada na Construção Civil", "Técnicas de Construção Civil", "Empreendedorismo", "Química", "Educação Física", "Física"],
    "12ª classe": ["Técnicas de Medições e Orçamento", "Técnicas de Construção Civil", "Desenho de Projeto", "Informática Aplicada na Construção Civil", "Física", "Empreendedorismo", "Organização e Gestão Industrial"],
  },
}

export default function Onboarding() {
  const { utilizador, recarregarUtilizador } = useAuth()
  const navigate = useNavigate()

  const [passo, setPasso] = useState(1)
  const [ano, setAno] = useState("")
  const [curso, setCurso] = useState("")
  const [topicosPorDisciplina, setTopicosPorDisciplina] = useState({})
  const [disciplinaAtual, setDisciplinaAtual] = useState(null)
  const [novoTopico, setNovoTopico] = useState("")

  const disciplinasDoAluno = ano && curso
    ? [
        ...(disciplinasComuns[ano] || []),
        ...(disciplinasEspecificasPorCursoAno[curso]?.[ano] || []),
      ]
    : []

  const adicionarTopico = () => {
    const texto = novoTopico.trim()
    if (!texto || !disciplinaAtual) return
    setTopicosPorDisciplina((prev) => ({
      ...prev,
      [disciplinaAtual]: [...(prev[disciplinaAtual] || []), texto],
    }))
    setNovoTopico("")
  }

  const removerTopico = (topico) => {
    setTopicosPorDisciplina((prev) => ({
      ...prev,
      [disciplinaAtual]: prev[disciplinaAtual].filter((t) => t !== topico),
    }))
  }

  const totalTopicos = Object.values(topicosPorDisciplina).flat().length

  const avancar = async () => {
    if (passo === 1 && (!ano || !curso)) {
      alert("Seleciona o ano e o curso")
      return
    }

    if (passo === 1) {
      try {
        const token = localStorage.getItem("token")
        await fetch("http://localhost:8000/usuarios/onboarding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ano_escolar: ano, curso }),
        })
      } catch (e) {
        console.error("Erro ao guardar onboarding", e)
      }
    }

    if (passo < 3) setPasso(passo + 1)
  }

  const voltar = () => {
    if (disciplinaAtual) {
      setDisciplinaAtual(null)
      setNovoTopico("")
      return
    }
    if (passo > 1) setPasso(passo - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-8">

        {/* Barra de progresso — 3 passos */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                  passo >= n ? "bg-[#0D2B6B] text-white" : "bg-slate-200 text-slate-400"
                }`}
              >
                {n}
              </div>
              {n < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded-full ${passo > n ? "bg-[#0D2B6B]" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* PASSO 1 — Ano e Curso */}
        {passo === 1 && (
          <div>
            <h1 className="text-2xl font-semibold text-[#0D2B6B] mb-2">
              Vamos personalizar a tua experiência
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              Diz-nos o teu ano e curso para adaptarmos o estudo a ti
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Ano escolar</label>
                <select
                  value={ano}
                  onChange={(e) => { setAno(e.target.value); setCurso(""); setTopicosPorDisciplina({}) }}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0D2B6B]"
                >
                  <option value="">Seleciona o teu ano</option>
                  {anos.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Curso</label>
                <select
                  value={curso}
                  onChange={(e) => { setCurso(e.target.value); setTopicosPorDisciplina({}) }}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0D2B6B]"
                  disabled={!ano}
                >
                  <option value="">Seleciona o teu curso</option>
                  {cursos.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {disciplinasDoAluno.length > 0 && (
                <div className="mt-2 p-4 bg-[#EBF2FF] border border-[#2E6DA4] rounded-lg">
                  <p className="text-xs font-semibold text-[#0D2B6B] mb-2">
                    📚 As tuas disciplinas deste ano ({disciplinasDoAluno.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {disciplinasDoAluno.map((d) => (
                      <span
                        key={d}
                        className="text-xs bg-white border border-[#2E6DA4] text-[#0D2B6B] rounded-full px-2 py-1"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PASSO 2 — Tópicos por disciplina */}
        {passo === 2 && (
          <div>
            {!disciplinaAtual ? (
              <>
                <h1 className="text-2xl font-semibold text-[#0D2B6B] mb-2">Tópicos do trimestre</h1>
                <p className="text-sm text-slate-500 mb-6">
                  Escolhe uma disciplina e adiciona os tópicos que já deste este trimestre
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {disciplinasDoAluno.map((disc) => {
                    const count = topicosPorDisciplina[disc]?.length || 0
                    return (
                      <button
                        key={disc}
                        onClick={() => { setDisciplinaAtual(disc); setNovoTopico("") }}
                        className="p-4 rounded-lg border border-slate-200 hover:border-[#0D2B6B] hover:bg-[#EBF2FF] transition-colors text-left"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-[#0D2B6B] text-sm leading-snug">{disc}</p>
                          {count > 0 && (
                            <span className="shrink-0 text-xs bg-[#0D2B6B] text-white rounded-full px-2 py-0.5">
                              {count}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {count === 0 ? "Sem tópicos ainda" : `${count} tópico${count > 1 ? "s" : ""}`}
                        </p>
                      </button>
                    )
                  })}
                </div>

                {totalTopicos > 0 && (
                  <p className="text-xs text-center text-slate-400 mt-4">
                    {totalTopicos} tópico{totalTopicos > 1 ? "s" : ""} adicionado{totalTopicos > 1 ? "s" : ""} no total
                  </p>
                )}
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold text-[#0D2B6B] mb-1">{disciplinaAtual}</h1>
                <p className="text-sm text-slate-500 mb-6">Adiciona os tópicos que já foram dados</p>

                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Ex: Equações do 2º grau"
                    value={novoTopico}
                    onChange={(e) => setNovoTopico(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && adicionarTopico()}
                    className="flex-1"
                  />
                  <Button
                    onClick={adicionarTopico}
                    className="bg-[#0D2B6B] text-white hover:bg-[#1A4BA0] px-3"
                  >
                    <Plus size={16} />
                  </Button>
                </div>

                <div className="space-y-2">
                  {(topicosPorDisciplina[disciplinaAtual] || []).length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-6">
                      Ainda não adicionaste tópicos
                    </p>
                  ) : (
                    (topicosPorDisciplina[disciplinaAtual] || []).map((topico) => (
                      <div
                        key={topico}
                        className="flex items-center justify-between gap-3 p-3 border border-slate-200 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Check size={14} className="text-[#0D2B6B]" />
                          <span className="text-sm text-slate-700">{topico}</span>
                        </div>
                        <button
                          onClick={() => removerTopico(topico)}
                          className="text-slate-300 hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* PASSO 3 — Conclusão */}
        {passo === 3 && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#0D2B6B] mb-2">Pronto!</h1>
            <p className="text-sm text-slate-500 mb-8">
              O teu perfil está configurado. A IA está a gerar o teu roadmap.
            </p>
            <div className="bg-[#EBF2FF] border border-[#2E6DA4] rounded-lg p-6 mb-8 text-left">
              <p className="text-sm font-medium text-[#0D2B6B] mb-3">Resumo</p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li><strong>Ano:</strong> {ano}</li>
                <li><strong>Curso:</strong> {curso}</li>
                <li><strong>Disciplinas:</strong> {disciplinasDoAluno.length}</li>
                <li><strong>Tópicos adicionados:</strong> {totalTopicos}</li>
              </ul>
            </div>
            <Button
              onClick={async () => {
                await recarregarUtilizador()
                navigate("/feed")
              }}
              className="w-full bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800] font-medium"
            >
              Ir para o Feed
            </Button>
          </div>
        )}

        {/* Botões de navegação */}
        {passo < 3 && (
          <div className="flex gap-3 mt-8">
            <Button
              variant="outline"
              onClick={voltar}
              disabled={passo === 1 && !disciplinaAtual}
              className="flex-1"
            >
              <ChevronLeft size={16} className="mr-2" />
              Voltar
            </Button>
            <Button onClick={avancar} className="flex-1 bg-[#0D2B6B] text-white hover:bg-[#1A4BA0]">
              {passo === 2 && totalTopicos === 0 ? "Saltar" : "Continuar"}
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}
