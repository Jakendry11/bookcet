import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/Login"
import Feed from "@/pages/Feed"
import Onboarding from "@/pages/Onboarding"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Login />} />
        <Route path="/" element={<Onboarding />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={<Feed />} />
        <Route path="/feed" element={<Feed />} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App