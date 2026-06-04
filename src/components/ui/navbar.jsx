import { Bell, Brain, BookOpen, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navLinks = [
  { label: "Feed", icon: Home, href: "/feed" },
  { label: "Biblioteca", icon: BookOpen, href: "/biblioteca" },
  { label: "IA", icon: Brain, href: "/ai", accent: true },
]

export default function Navbar({ activePage = "feed" }) {
  return (
    <nav className="w-full bg-[#0D2B6B] px-6 h-14 flex items-center justify-between sticky top-0 z-50">
      <span className="text-[#F5C200] font-bold text-lg tracking-wide">
        BOOKCET
      </span>

      <div className="flex items-center gap-6">
        {navLinks.map(({ label, icon: Icon, href, accent }) => {
          const isActive = activePage === label.toLowerCase()
          return (
            <a
              key={label}
              href={href}
              className={
                "flex items-center gap-2 text-sm transition-colors " +
                (accent
                  ? "text-[#F5C200]"
                  : isActive
                  ? "text-white font-medium"
                  : "text-white/60 hover:text-white")
              }
            >
              <Icon size={16} />
              {label}
            </a>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-md px-3 py-1.5">
          <Search size={14} className="text-white/40" />
          <Input
            placeholder="Pesquisar..."
            className="bg-transparent border-none text-white placeholder:text-white/40 text-sm h-auto p-0 focus-visible:ring-0 w-36"
          />
        </div>

        <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
          <Bell size={18} />
        </Button>

        <Avatar className="w-8 h-8 border-2 border-[#F5C200] cursor-pointer">
          <AvatarFallback className="bg-[#1A4BA0] text-white text-xs font-medium">
            ML
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}