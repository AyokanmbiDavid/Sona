import React, { useState,useContext, useEffect} from 'react'
import { FastForward, Home, Key, Menu, User, Loader2Icon, User2Icon} from 'lucide-react'
import {motion} from "framer-motion"
import { Link, useLocation } from 'react-router-dom'
import {all_provider} from './ContextProvider.jsx'

const Navbar = () => {
  const { refresh,Notify} = useContext(all_provider);
  const [islogin,setislogin] = useState(localStorage.getItem('sona_log') || false)
  const [loading, setloading] = useState(false)
  const [dropdown,setdropdown]=useState(false)

  useEffect(()=>{
    
  },[])

  const menus = [
    {name:"Dashboard", icon:<Home className='text-blue-800' size={16}/>,link:'/'},
    {name:"Complain", icon:<User className='text-blue-800' size={16}/>, link:'/complain'},
    {name:"Admin", icon:<Key className='text-blue-800' size={16}/>, link:'/admin'},
  ]

  async function refreshpage () {
      setloading(true)
      await refresh();
      setloading(false)
  }
  const location = useLocation().pathname
  
  return (
    <>
      <div className="w-full p-3 flex justify-between items-center">
         <div className="xl:hidden w-20 -ml-5">
                <img src="/public/Sona_Icon.png" alt="sona_icon" className='h-10 w-10 rounded-md' />
            </div>
        <div className="w-full flex items-center gap-3">
          <input type="search" placeholder='Search here'
          className='w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm' />
        </div>

        <div className="ml-4 relative">
         {islogin ? 
         <span className="p-3 cursor-pointer rounded-full" 
         onClick={() => setdropdown(prev => !prev)}
         id='dropdownToggle' data-dropdown-trigger="click" data-dropdown-toggle="dropdownMenu">
           <User2Icon/>
         </span> :
         <Link to={'/login'} className='flex justify-center text-xs items-center gap-2 bg-linear-to-br from-blue-500 to-green-500 rounded-full p-3 text-white'>
            <User2Icon size={17}/> Login
          </Link>}

         {dropdown && <div id='dropdownMenu' className="absolute top-20 flex bg-white flex-col items-center right-0 rounded-3xl g-white border border-gray-200">
          <div className="w-full p-3 border-b border-gray-200 flex flex-col justify-center items-center gap-3">
            <span className="bg-green-100 p-3 rounded-full">
              <User2Icon />
            </span>
            <h1 className="text-md">Ayokanmbi</h1>
          </div>
          <div className="flex gap-3 w-full p-2">
            <button className="bg-red-500 w-full cursor-pointer p-3 rounded-xl text-white text-xs">
              Logout
            </button>
            <button className="bg-blue-100 w-full cursor-pointer p-3 rounded-xl text-blue-700 font-bold text-xs">
             Admin
            </button>
          </div>
         </div>}
        </div>
      </div>
    </>
  )
}

export default Navbar