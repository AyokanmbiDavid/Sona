import { ChevronDown, ChevronUp, DotIcon, Gamepad, Glasses, Smartphone, Utensils } from 'lucide-react'
import React, { useState } from 'react'

const CategoryPage = () => {
    const [iscate,setiscate] = useState('utensils');
    const [opencates,setopencates] = useState(false)
    const cates = [
        {name: 'Utensils',icon:<Utensils size={13}/>,set:'utensils'},
        {name: 'Fashion',icon:<Glasses size={13}/>,set:'fashion'},
        {name: 'Gadgets',icon:<Smartphone size={13}/>,set:'gadgets'},
        {name: 'Gaming',icon:<Gamepad size={13}/>,set:'food'},
        {name: 'Others',icon:<DotIcon size={13}/>,set:'others'},

    ]
  return (
    <>
        <div className="w-full flex max-sm:flex-col">
            {/* category select */}
            <div className="p-2 border w-40 max-md:hidden border-gray-100 dark:border-gray-800 rounded-lg">
                {cates.map((item,e) => (
                    <>
                        <div
                        onClick={() => setiscate(item.set)}
                        className={`w-full p-2 flex justify-between hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xs items-center ${iscate == item.set ? 'font-bold bg-gray-100 dark:bg-gray-700':''}`}>
                            {item.name}

                            <span className="">
                                {item.icon}
                            </span>
                        </div>
                    </>
                ))}
            </div>

                {/* mobile category select */}
            <div className="w-full flex md:hidden justify-between items-start relative">
                <div className=" w-full p-2 border xl:hidden border-gray-100 dark:border-gray-800 dark:bg-gray-900 rounded-lg">
                {cates.map((item,e) => (
                    <>
                        <div
                        onClick={() => setiscate(item.set)}
                        className={`w-full p-2 flex justify-between hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xs items-center transition-all duration-200 ${iscate == item.set ? 'font-bold bg-gray-100 dark:bg-gray-700':''} ${opencates && iscate != item.set ? 'hidden' : 'flex'}`}>
                            {item.name}

                            <span className="">
                                {item.icon}
                            </span>
                        </div>
                    </>
                ))}
            </div>
            {/* show others */}
            <div 
                onClick={() => setopencates(!opencates)}
                className=" p-2 mt-2 bg-gray-200 xl:hidden dark:bg-gray-800 rounded-full top-2 right-2">
                    {opencates ? <ChevronDown size={13}/>:<ChevronUp size={13}/>} 
                </div>
            </div>
        </div>
    </>
  )
}

export default CategoryPage
