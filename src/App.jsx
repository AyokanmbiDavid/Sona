import React, { useEffect } from "react"
import Navbar from "./components/Navbar"
import Sidebarr from "./components/Sidebarr"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import { Routes, Route} from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
const App = () => {

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    if (theme == 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.add('light')
    }
    
  },[])
  return (
    <>

      <div className="bg-grid px-3 overflow-hidden flex items-start w-full">
        <Sidebarr/>
        <div className="w-full h-screen px-3">
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/signup' element={<SignUpPage/>} />

        </Routes>
        </div>
      </div>
    </>
  )
}

export default App