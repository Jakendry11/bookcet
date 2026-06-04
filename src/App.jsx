import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/Login"
import Feed from "@/pages/Feed"
import Onboarding from "@/pages/Onboarding"
import Perfil from "@/pages/Perfil"
import AI from "@/pages/AI"
import ThreadS from "@/pages/Threads"  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/threads" element={<ThreadS />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App