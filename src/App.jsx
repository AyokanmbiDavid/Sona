import React from "react"
import Navbar from "./components/Navbar"
import Sidebarr from "./components/Sidebarr"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import { Routes, Route} from "react-router-dom"
const App = () => {

  return (
    <>

      <div className="bg-grid px-3 overflow-hidden flex items-start w-full">
        <Sidebarr/>
        <div className="w-full h-screen">
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<LoginPage/>} />
        </Routes>
        </div>
      </div>
    </>
  )
}

export default App