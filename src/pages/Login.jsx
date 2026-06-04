import { useState } from "react"
import { Brain, Map, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

const API_URL = "http://localhost:8000"

export default function Login() {
  const [tab, setTab] = useState("entrar")
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  // Campos de registo
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Campos de login
  const [emailLogin, setEmailLogin] = useState("")
  const [passwordLogin, setPasswordLogin] = useState("")

  const handleRegistar = async () => {
    if (!nome || !email || !password) {
      setErro("Preenche todos os campos")
      return
    }
    setCarregando(true)
    setErro("")
    try {
      const res = await fetch(`${API_URL}/auth/registar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, password, ano_escolar: "", curso: "" }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErro(data.detail || "Erro ao criar conta")
        return
      }
      // Registo feito — agora faz login automático
      await handleLoginAuto(email, password)
    } catch {
      setErro("Erro de ligação ao servidor")
    } finally {
      setCarregando(false)
    }
  }

  const handleLoginAuto = async (e, p) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: e, password: p }),
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem("token", data.access_token)
      navigate("/onboarding")
    }
  }

  const handleEntrar = async () => {
    if (!emailLogin || !passwordLogin) {
      setErro("Preenche todos os campos")
      return
    }
    setCarregando(true)
    setErro("")
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailLogin, password: passwordLogin }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErro(data.detail || "Email ou palavra-passe incorrectos")
        return
      }
      localStorage.setItem("token", data.access_token)
      navigate("/feed")
    } catch {
      setErro("Erro de ligação ao servidor")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid grid-cols-2 gap-12 items-center">

        {/* Lado esquerdo */}
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

        {/* Formulário */}
        <div className="bg-white border border-slate-200 rounded-xl p-8">
          <div className="flex border border-slate-200 rounded-lg overflow-hidden mb-6">
            <button
              onClick={() => { setTab("entrar"); setErro("") }}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                tab === "entrar" ? "bg-[#0D2B6B] text-white" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => { setTab("registar"); setErro("") }}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                tab === "registar" ? "bg-[#0D2B6B] text-white" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Registar
            </button>
          </div>

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg mb-4">
              {erro}
            </div>
          )}

          {tab === "entrar" ? (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Email escolar</label>
                <Input
                  placeholder="nome@escola.ao"
                  type="email"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Palavra-passe</label>
                <Input
                  placeholder="••••••••"
                  type="password"
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEntrar()}
                />
              </div>
              <Button
                onClick={handleEntrar}
                disabled={carregando}
                className="w-full bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800] font-medium mt-2"
              >
                {carregando ? "A entrar..." : "Entrar"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Nome completo</label>
                <Input
                  placeholder="O teu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Email escolar</label>
                <Input
                  placeholder="nome@escola.ao"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Palavra-passe</label>
                <Input
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRegistar()}
                />
              </div>
              <Button
                onClick={handleRegistar}
                disabled={carregando}
                className="w-full bg-[#F5C200] text-[#0D2B6B] hover:bg-[#e6b800] font-medium mt-2"
              >
                {carregando ? "A criar conta..." : "Criar conta"}
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}