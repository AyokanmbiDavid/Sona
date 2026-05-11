import { Plus, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({title,price,path}) => {
  return (
    <>
        <Link to={path} className="w-full max-sm:place-items-center">
                        {/* image */}
                        <div className="w-full relative h-70 ">
                            <img src="" className="w-full h-full bg-gray-100 border-0 rounded-lg " />
                            <div className="absolute bottom-2 left-2 p-2 bg-gray-200/80 text-xs rounded-lg">
                                {title}
                            </div>
                        </div>
                        <div className="w-full flex justify-between  items-center mt-2 text-xs">
                            {/* price */}
                          <span className='flex gap-1'>
                            <span className="p-1 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg">
                                N
                            </span>
                            <span className='p-1 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg'>
                                {price}
                            </span>
                          </span>

                          {/* add to cart */}
                          <button className="flex gap-2 items-center bg-yellow-500 pl-2 cursor-pointer rounded-full text-white">
                            <ShoppingCart size={13}/>
                            <span className="p-2 rounded-full bg-yellow-600/70">
                                <Plus size={13}/>
                            </span>
                          </button>
                        </div>
        </Link>
    </>
  )
}

export default Card
