import React, { useState,useContext, useEffect} from 'react'
import { FastForward, Home, Key, Menu, User, Loader2Icon, User2Icon, Moon, SunIcon, Settings, LogOut, LogIn, SearchIcon, RefreshCw} from 'lucide-react'
import {motion} from "framer-motion"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {all_provider} from './ContextProvider.jsx'
import axios from 'axios'

const Navbar = () => {
  const {refresh,Notify} = useContext(all_provider);
  const [islogin,setislogin] = useState()
  const [theme,settheme] = useState(localStorage.getItem('theme') || 'light')
  const [loading, setloading] = useState(false)
  const [dropdown,setdropdown]=useState(false);
  const navigate = useNavigate()

  useEffect(()=>{
    setislogin(JSON.parse(localStorage.getItem('userlog')) || false)
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

  const handleLogin= async() => {
      const email = islogin.email;
      const password = islogin.password;
      const endpoint ='http://localhost:3000/api/user/login/admin' 
      setloading (true);
      
      if (!islogin) {
        Notify('failure','info not on this, logout and login as admin.')
      } else {
        try{
        let res = await axios.post(endpoint ,{email,password});
        console.log('user login succeas',res);
        Notify('success','login successful');

        if (staylogged) {
          localStorage.setItem('userlog',JSON.stringify({email,password}))
        }
        setTimeout(() => {
          navigate('/')
        }, 2000);
      } catch (e) {
        console.log('login failed');
        console.log(e);
        Notify('failure','login procedure failed') 
      }
      }

      setloading(false)
    }

    const handleLogout = () => {
      localStorage.removeItem('userlog');
      navigate('/login')
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
      <div className=" sticky top-0 left-0 bg-white dark:bg-gray-900 z-20 w-full p-3 px-0 flex justify-between items-center">
        {/* left */}
         <div className="flex items-center justify-start">
          <div className="xl:hidden -ml-5">
                <img src="./Sona_Icon.png" alt="sona_icon" className='h-10 w-10 rounded-md' />
            </div>
          <Link to="/search" className=" flex items-center gap-3 p-2 pl-10 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-full">
              <SearchIcon size={13}/>
          </Link>
         </div>

        {/* right */}
        <div className="flex items-center gap-2">
          {/* refresh */}
          <div className="bg-gray-100 dark:bg-gray-700 cursor-pointer dark:text-gray-200 p-2 rounded-lg">
              <RefreshCw  size={13}/>
          </div>

          {/* theme toggle */}
          <div className="p-2 ml-5 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200 cursor-pointer xl:hidden" onClick={() => toggletheme()}>
        {theme == 'light' ? 
        <Moon size={13}/> :
        <SunIcon size={13} />}
        </div>
        
        <div className="ml-4 relative flex items-center">
         {islogin ? 
         <span className="p-3 cursor-pointer rounded-full dark:text-gray-100 shrink-0" 
         onClick={() => setdropdown(prev => !prev)}
         id='dropdownToggle' data-dropdown-trigger="click" data-dropdown-toggle="dropdownMenu">
           <User2Icon size={13}/>
         </span> :
         <></>}

         {dropdown && <div id='dropdownMenu' className="w-50 absolute top-20 flex dark:bg-gray-800 bg-white flex-col items-center right-0 rounded-md g-white border dark:border-gray-700 border-gray-200">
          <div className="w-full p-3 border-b border-gray-200 dark:border-gray-700 flex flex-col justify-center items-center gap-3">
            <span className="bg-green-100 dark:bg-green-800 dark:text-gray-200 p-3 rounded-full">
              <User2Icon />
            </span>
            <h1 className="text-md dark:text-gray-200 ">Ayokanmbi</h1>
          </div>
          <div className="flex flex-col gap-2 w-full p-2">
            <button className="p-2 text-xs flex justify-center gap-3 items-center dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
              Settings <Settings size={13} /></button>
            <button
            onClick={() => handleLogout()}
            className="bg-red-500 w-full flex justify-center gap-3 cursor-pointer p-2 rounded-md text-white text-xs">
              Logout <LogOut size={13} />
            </button>
            <button 
            onClick={() => handleLogin()}
            className="bg-blue-100 w-full flex justify-center gap-3 cursor-pointer p-2 shrink-0 rounded-md dark:bg-blue-600 dark:text-white text-blue-700 text-xs">
              login as Admin  {loading ?<Loader2Icon size={13} className='animate-spin' /> :<LogIn size={13} />}
            </button>
          </div>
         </div>}
        </div>
        </div>
      </div>
    </>
  )
}

export default Navbar