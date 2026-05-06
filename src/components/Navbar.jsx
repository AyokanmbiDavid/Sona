import React, { useState,useContext, useEffect} from 'react'
import { FastForward, Home, Key, Menu, User, Loader2Icon, User2Icon, Moon, SunIcon} from 'lucide-react'
import {motion} from "framer-motion"
import { Link, useLocation } from 'react-router-dom'
import {all_provider} from './ContextProvider.jsx'

const Navbar = () => {
  const { refresh,Notify} = useContext(all_provider);
  const [islogin,setislogin] = useState(localStorage.getItem('sona_log') || false)
  const [theme,settheme] = useState(localStorage.getItem('theme') || 'light')
  const [loading, setloading] = useState(false)
  const [dropdown,setdropdown]=useState(false)

  useEffect(()=>{
    
  },[])

   useEffect(() => {
          localStorage.setItem('theme',theme)
      },[theme])
  
      const toggletheme = () => {
          if (theme == 'light') {
              document.documentElement.classList.add('dark');
              settheme('dark')
          } else {
              document.documentElement.classList.remove('dark')
              settheme('light')
          }
      }

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
      <div className="w-full p-3 px-0 flex justify-between items-center">
         <div className="xl:hidden w-20 -ml-5">
                <img src="/public/Sona_Icon.png" alt="sona_icon" className='h-10 w-10 rounded-md' />
            </div>
        <div className="w-full ml-2 flex items-center gap-3">
          <input type="search" placeholder='Search here'
          className='w-full p-2 bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-600 rounded-md text-xs' />
        </div>

        <div className="p-2 ml-5 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200 cursor-pointer xl:hidden" onClick={() => toggletheme()}>
        {theme == 'light' ? 
        <Moon size={13}/> :
        <SunIcon size={13} />}
        </div>
        
        <div className="ml-4 relative flex items-center">
         {islogin ? 
         <span className="p-3 cursor-pointer rounded-full shrink-0" 
         onClick={() => setdropdown(prev => !prev)}
         id='dropdownToggle' data-dropdown-trigger="click" data-dropdown-toggle="dropdownMenu">
           <User2Icon/>
         </span> :
         <Link to={'/login'} className='flex justify-center text-xs items-center gap-2 bg-linear-to-br from-blue-500 to-green-500 rounded-md p-2 text-white'>
            <User2Icon size={13}/> Login
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