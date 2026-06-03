import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const anos = ["10ª classe", "11ª classe", "12ª classe"]

const cursos = [
  "Técnico de Informática",
  "Gestão dos Sistemas Informáticos",
  "Electrónica e Telecomunicações",
  "Contabilidade e Gestão",
  "Finanças",
  "Desenhador Projetista",
]

// Disciplinas comuns — variam por ano
const disciplinasComuns = {
  "10ª classe": ["Português", "Língua Inglesa", "Matemática", "Formação de Atitudes Integradoras"],
  "11ª classe": ["Português", "Língua Inglesa", "Matemática", "Formação de Atitudes Integradoras"],
  "12ª classe": ["Matemática"], // Sem Português e FAI
}

// Disciplinas específicas por curso e ano
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

const topicosPorDisciplina = {
  "Matemática": ["Álgebra", "Geometria", "Cálculo", "Estatística"],
  "Física": ["Cinemática", "Dinâmica", "Energia", "Ondas"],
  "Química": ["Química Geral", "Química Orgânica", "Reações", "Soluções"],
  "Técnicas E Linguagens De Programação": ["Variáveis", "Loops", "Funções", "POO"],
  "Desenho Técnico": ["Perspectiva", "Projeções", "Escalas", "Símbolos"],
  "Contabilidade Financeira": ["Registos", "Balancetes", "Contas", "Demonstrações"],
  "Geometria Descritiva": ["Projeções", "Perspectiva", "Secções", "Rotações"],
}

export default function Onboarding() {
  const [passo, setPasso] = useState(1)

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [ano, setAno] = useState("")
  const [curso, setCurso] = useState("")

  const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState([])

  const [disciplinaAtual, setDisciplinaAtual] = useState(null)
  const [topicosDados, setTopicosDados] = useState({})
  const [topicosDificuldade, setTopicosDificuldade] = useState({})

  // Disciplinas disponíveis = comuns + específicas
  const disciplinasDisponiveis = [
    ...(disciplinasComuns[ano] || []),
    ...(curso && ano ? disciplinasEspecificasPorCursoAno[curso]?.[ano] || [] : []),
  ]

  const toggleDisciplina = (disc) => {
    setDisciplinasSelecionadas((prev) =>
      prev.includes(disc)
        ? prev.filter((d) => d !== disc)
        : [...prev, disc]
    )
  }

  const avancar = () => {
    if (passo === 1 && (!nome || !email || !ano || !curso)) {
      alert("Preenche todos os campos")
      return
    }
    if (passo === 2 && disciplinasSelecionadas.length === 0) {
      alert("Seleciona pelo menos uma disciplina")
      return
    }
    if (passo < 4) setPasso(passo + 1)
  }

  const voltar = () => {
    if (passo > 1) setPasso(passo - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-8">

        {/* Barra de progresso */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                  passo >= n
                    ? "bg-[#0D2B6B] text-white"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {n}
              </div>
              {n < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full ${
                    passo > n ? "bg-[#0D2B6B]" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* PASSO 1 */}
        {passo === 1 && (
          <div>
            <h1 className="text-2xl font-semibold text-[#0D2B6B] mb-2">Vamos começar</h1>
            <p className="text-sm text-slate-500 mb-6">Conta-nos um pouco sobre ti</p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Nome completo</label>
                <Input placeholder="O teu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Email escolar</label>
                <Input placeholder="nome@escola.ao" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Ano escolar</label>
                <select value={ano} onChange={(e) => { setAno(e.target.value); setCurso("") }} className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0D2B6B]">
                  <option value="">Seleciona o teu ano</option>
                  {anos.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Curso</label>
                <select value={curso} onChange={(e) => { setCurso(e.target.value); setDisciplinasSelecionadas([]) }} className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0D2B6B]">
                  <option value="">Seleciona o teu curso</option>
                  {cursos.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* PASSO 2 */}
        {passo === 2 && (
          <div>
            <h1 className="text-2xl font-semibold text-[#0D2B6B] mb-2">As tuas disciplinas</h1>
            <p className="text-sm text-slate-500 mb-6">Seleciona as disciplinas que tens este ano</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {disciplinasDisponiveis.map((disc) => (
                <button
                  key={disc}
                  onClick={() => toggleDisciplina(disc)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors text-left ${
                    disciplinasSelecionadas.includes(disc)
                      ? "bg-[#EBF2FF] border-[#0D2B6B] text-[#0D2B6B]"
                      : "bg-white border-slate-200 text-slate-700 hover:border-[#0D2B6B]"
                  }`}
                >
                  {disc}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PASSO 3 */}
        {passo === 3 && (
          <div>
            <h1 className="text-2xl font-semibold text-[#0D2B6B] mb-2">Tópicos do trimestre</h1>
            <p className="text-sm text-slate-500 mb-6">Marca os tópicos já dados</p>

            {!disciplinaAtual ? (
              <div className="grid grid-cols-2 gap-3">
                {disciplinasSelecionadas.map((disc) => (
                  <button
                    key={disc}
                    onClick={() => setDisciplinaAtual(disc)}
                    className="p-4 rounded-lg border border-slate-200 hover:border-[#0D2B6B] hover:bg-[#EBF2FF] transition-colors text-left"
                  >
                    <p className="font-medium text-[#0D2B6B] text-sm">{disc}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {topicosPorDisciplina[disc]?.length || 0} tópicos
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setDisciplinaAtual(null)}
                  className="flex items-center gap-2 text-sm text-[#1A4BA0] hover:text-[#0D2B6B] mb-4"
                >
                  <ChevronLeft size={16} />
                  Voltar
                </button>

                <h2 className="font-medium text-[#0D2B6B] mb-4">{disciplinaAtual}</h2>

                <div className="space-y-2">
                  {(topicosPorDisciplina[disciplinaAtual] || ["Tópico 1", "Tópico 2", "Tópico 3"]).map((topico) => (
                    <div key={topico} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                      <input
                        type="checkbox"
                        id={topico}
                        checked={topicosDados[topico] || false}
                        onChange={(e) => setTopicosDados((prev) => ({ ...prev, [topico]: e.target.checked }))}
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                      <label htmlFor={topico} className="flex-1 text-sm cursor-pointer">{topico}</label>
                      {topicosDados[topico] && (
                        <select
                          value={topicosDificuldade[topico] || "Média"}
                          onChange={(e) => setTopicosDificuldade((prev) => ({ ...prev, [topico]: e.target.value }))}
                          className="text-xs border border-slate-200 rounded px-2 py-1"
                        >
                          <option>Dominado</option>
                          <option>Média</option>
                          <option>Alta dificuldade</option>
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PASSO 4 */}
        {passo === 4 && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#0D2B6B] mb-2">Pronto!</h1>
            <p className="text-sm text-slate-500 mb-8">O teu perfil está configurado. A IA está a gerar o teu roadmap.</p>
            <div className="bg-[#EBF2FF] border border-[#2E6DA4] rounded-lg p-6 mb-8 text-left">
              <p className="text-sm font-medium text-[#0D2B6B] mb-3">Resumo</p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li><strong>Nome:</strong> {nome}</li>
                <li><strong>Ano:</strong> {ano}</li>
                <li><strong>Curso:</strong> {curso}</li>
                <li><strong>Disciplinas:</strong> {disciplinasSelecionadas.length}</li>
              </ul>
            </div>
            <Button className="w-full bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800] font-medium">
              Ir para o Feed
            </Button>
          </div>
        )}

        {/* Botões de navegação */}
        {passo < 4 && (
          <div className="flex gap-3 mt-8">
            <Button variant="outline" onClick={voltar} disabled={passo === 1} className="flex-1">
              <ChevronLeft size={16} className="mr-2" />
              Voltar
            </Button>
            <Button onClick={avancar} className="flex-1 bg-[#0D2B6B] text-white hover:bg-[#1A4BA0]">
              Continuar
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}