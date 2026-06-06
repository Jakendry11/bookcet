import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { LogOut, User, BookOpen, GraduationCap, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Perfil() {
  const { utilizador, iniciais, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8">

        {/* Avatar e nome */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#0D2B6B] flex items-center justify-center text-white text-2xl font-semibold mb-4">
            {iniciais}
          </div>
          <h1 className="text-2xl font-semibold text-[#0D2B6B]">
            {utilizador?.nome || "—"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">Aluno</p>
        </div>

        {/* Dados */}
        <div className="space-y-4 mb-8">

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-[#EBF2FF] flex items-center justify-center shrink-0">
              <User size={16} className="text-[#0D2B6B]" />
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Nome completo</p>
              <p className="text-sm font-medium text-slate-700">{utilizador?.nome || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-[#EBF2FF] flex items-center justify-center shrink-0">
              <Mail size={16} className="text-[#0D2B6B]" />
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Email</p>
              <p className="text-sm font-medium text-slate-700">{utilizador?.email || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-[#EBF2FF] flex items-center justify-center shrink-0">
              <BookOpen size={16} className="text-[#0D2B6B]" />
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Curso</p>
              <p className="text-sm font-medium text-slate-700">{utilizador?.curso || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-[#EBF2FF] flex items-center justify-center shrink-0">
              <GraduationCap size={16} className="text-[#0D2B6B]" />
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Ano escolar</p>
              <p className="text-sm font-medium text-slate-700">{utilizador?.ano_escolar || "—"}</p>
            </div>
          </div>

        </div>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 font-medium"
          variant="ghost"
        >
          <LogOut size={16} />
          Terminar sessão
        </Button>

      </div>
    </div>
  )
}
