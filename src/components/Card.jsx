import { Plus, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({title,price,id,img}) => {
  return (
    <>
        <Link to={`details/${id}`} className="w-full max-sm:place-items-center">
                        {/* image */}
                        <div className="w-full relative h-70 max-sm:h-50">
                            <img src={img} className="w-full h-full bg-gray-100 dark:bg-gray-800 border-0 rounded-lg " loading='true'/>
                            <div className="absolute bottom-2 left-2 font-bold p-2 bg-gray-200/80 text-xs rounded-full">
                                {title}
                            </div>
                        </div>
                        <div className="w-full flex justify-between  items-center mt-2 text-xs">
                            {/* price */}
                          <span className='flex gap-1'>
                            <span className="p-1 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-full">
                                N
                            </span>
                            <span className='p-1 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-full'>
                                {price}
                            </span>
                          </span>

                          <button className='bg-blue-600 flex items-center gap-2 p-3 text-white rounded-full'>
                           Add <ShoppingCart size={13} />
                          </button>
                        </div>
        </Link>
    </>
  )
}

export default Card
