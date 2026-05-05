import { Bell, ChartBarIcon, Home, Sidebar } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebarr = () => {
    const [ishovered,setishovered] = useState()
    const location = useLocation().pathname
    const navs =[
        {name:'Home',icon:<Home/>,path:'/'},
        {name:'Your Page',icon:<Sidebar/>,path:'/profile'},
        {name:'Messages',icon:<ChartBarIcon/>,path:'/messages'},
        {name:'Updates',icon:<Bell/>,path:'/updated'},
    ]
  return (
    <div>
      <div className="h-full p-3 flex flex-col items-center max-md:hidden">
            <div className="">
                <img src="/public/Sona_Icon.png" alt="sona_icon" className='h-10 w-10 rounded-md' />
            </div>

            <div className="flex flex-col mt-10 gap-10 items-center">
                {navs.map((item, e) => (
                    <>
                        <Link to={item.path}
                        onMouseOver={() => setishovered(navs.indexOf(item))}
                        onMouseLeave={() => setishovered()}
                        className={`relative p-3 rounded-xl cursor-pointer ${location == item.path ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                            {item.icon}

                            {ishovered == navs.indexOf(item) &&
                            <div className="absolute p-2 text-xs bg-black rounded-xl text-white -right-20 top-1">
                                {item.name}
                            </div>}
                        </Link>
                    </>
                ))}
            </div>
      </div>

      <div className=" w-full fixed p-2 bottom-0 flex items-center justify-around xl:hidden">

                {navs.map((item, e) => (
                    <>
                        <Link to={item.path}
                        onMouseLeave={() => setishovered()}
                        className={`relative p-3 px-4 flex flex-col rounded-full cursor-pointer ${location == item.path ? 'bg-black text-white' : 'hover:bg-gray-100'} `}>
                            {item.icon}
                        </Link>
                    </>
                ))}
      </div>
    </div>
  )
}

export default Sidebarr
