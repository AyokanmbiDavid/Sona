import React, { useContext, useEffect } from "react"
import Navbar from "./components/Navbar"
import Sidebarr from "./components/Sidebarr"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import { Routes, Route} from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import { all_provider } from "./components/ContextProvider"
import Notify from './components/Notify.jsx'
import ProctectedRoute from "./components/ProctectedRoute.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import Search from "./pages/Search.jsx"
const App = () => {
    const {notifystatus} = useContext(all_provider)
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
       
        <Notify/>
      
      <div className="bg-grid px-3 overflow-hidden flex items-start w-full">
        <Sidebarr/>
        <div className="w-full relative h-screen px-3 dark:text-white overflow-y-auto max-md:pb-20">
          <Navbar/>
          <Routes>
            <Route path='/' element={<ProctectedRoute><HomePage/></ProctectedRoute>} />
            <Route path='/profile' element={<ProctectedRoute><ProfilePage/></ProctectedRoute>} />
            <Route path='/search' element={<ProctectedRoute><Search/></ProctectedRoute>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/signup' element={<SignUpPage/>} />

        </Routes>
        </div>
      </div>
    </>
  )
}

export default App