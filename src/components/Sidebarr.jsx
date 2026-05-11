import { Bell, ChartBarIcon, Component, Home, LucideShoppingCart, Moon, Sidebar, SunIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebarr = () => {
    const [ishovered,setishovered] = useState()
    const [theme,settheme] = useState(localStorage.getItem('theme') || 'light')
    const location = useLocation().pathname
    const navs =[
        {name:'Home',icon:<Home size={13}/>,path:'/'},
        {name:'Categories',icon:<Component size={13}/>,path:'/category'},
        {name:'Messages',icon:<LucideShoppingCart size={13}/>,path:'/messages'},
        {name:'Updates',icon:<Bell size={13}/>,path:'/updated'},
    ]

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
  return (
    <div className='h-screen flex flex-col items-center justify-between '>
      <div className=" p-1 pr-3 h-full flex flex-col items-center justify-start max-md:hidden border-r border-gray-200 dark:border-gray-800">
            <div className=" mt-4">
                <img src="./Sona_Icon.png" alt="sona_icon" className='h-7 w-7 rounded-md' />
            </div>

            <div className="flex flex-col mt-10 gap-10 items-center">
                {navs.map((item, e) => (
                    <>
                        <Link to={item.path}
                        onMouseOver={() => setishovered(navs.indexOf(item))}
                        onMouseLeave={() => setishovered()}
                        className={`relative p-2 rounded-md cursor-pointer ${location == item.path ? 'bg-black dark:bg-gray-100 text-white dark:text-gray-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200'}`}>
                            {item.icon}

                            {ishovered == navs.indexOf(item) &&
                            <div className="absolute p-2 text-xs z-20 bg-black rounded-xl dark:bg-gray-100 text-white dark:font-bold dark:text-gray-900 -right-25 -top-1">
                                {item.name}
                            </div>}
                        </Link>
                    </>
                ))}
            </div>
      </div>

      <div className=" w-full bg-white dark:bg-gray-800 fixed z-20 p-3 bottom-0 right-0 flex items-center justify-around xl:hidden">

                {navs.map((item, e) => (
                    <>
                        <Link to={item.path}
                        onMouseLeave={() => setishovered()}
                        className={`relative p-3 px-4 flex flex-col rounded-md cursor-pointer ${location == item.path ? 'bg-black dark:bg-gray-700 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'} `}>
                            {item.icon}
                        </Link>
                    </>
                ))}
      </div>

      <div className="p-2 mb-10 rounded-full bg-gray-100 cursor-pointer max-md:hidden " onClick={() => toggletheme()}>
        {theme == 'light' ? 
        <Moon size={13}/> :
        <SunIcon size={13} />}
      </div>
    </div>
  )
}

export default Sidebarr
