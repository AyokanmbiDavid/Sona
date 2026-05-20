import { MinusIcon, Plus, PlusIcon, ShoppingCart, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import { initFlowbite } from 'flowbite'

const Card = ({title,price,id,img}) => {
  const [quant,setquant] = useState(1)

  useEffect(()=>{
    initFlowbite()
  })
  return (
    <>
        <motion.div
        initial={{y:10,opacity:0.5,scale:0.9}}
        animate={{y:0,opacity:1,scale:1}}>
          <div className="w-full max-sm:place-items-center border border-gray-200 dark:border-gray-700 transition-all duration-200 rounded-xl">
                        {/* image */}
                        <div className="w-full relative  dark:text-white ">
                            <img src={img} className="w-full h-60 max-sm:h-50 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl " loading='true'/>

                            <div className="relative">
                              <div className="flex justify-between items-center gap-2 p-2">
                                {/* title */}
                                <span className="text-xs truncate">
                                  {title}
                                </span>

                                <span className="text-xs shrink-0 font-bold">
                                  $ {price}
                                </span>
                              </div>
                              {/* button */}
                              <div className="flex justify-between items-center p-2">
                                {/* view */}
                                <Link to={`/details/${id}`} className="text-xs font-bold p-2 bg-gray-100 rounded-lg dark:bg-gray-800">
                                  View
                                </Link>


                                {/* add to cart */}
                                <button
                                  data-dropdown-trigger="click" 
                                  data-dropdown-toggle={`dropdownquant${id}`}
                               className='flex justify-center cursor-pointer items-center text-xs font-bold bg-blue-600 text-white rounded-lg gap-2 p-2'>
                                  <span className="max-sm:hidden">
                                    Add to cart 
                                  </span>
                                  <span className="border-l border-l-white max-sm:border-0 max-sm:pl-0 pl-2">
                                    <ShoppingCart  size={13} />
                                    </span>
                                </button>


 {/* show quatity */}
                              <div 
                              id={`dropdownquant${id}`} 
                              className="hidden flex flex-col  z-10  w-50 max-sm:w-40 bg-white dark:bg-gray-800 rounded-md text-xs p-1 fex-col
                              border border-gray-200
                              dark:border-gray-800">
                                  <div className="flex w-full items-center justify-between ">
                                    <span className="font-bold">Quantity</span>

                                  </div>

                                  <div className="flex gap-0.5 w-full justify-between items-center">
                                    <input type="number"
                                    value={quant}
                                    onChange={(e) => setquant(e.target.value)}
                                    className="p-2 w-full rounded-lg border text-xs font-bold border-gray-200 dark:border-gray-500
                                    dark:bg-gray-600" />
                                    {/* add button */}
                                    <button
                                    onClick={() => setquant(quant+1)}
                                    className="p-2  bg-blue-500 text-white cursor-pointer rounded-lg">
                                      <PlusIcon size={14} />
                                    </button>

                                    {/* minus button */}
                                    <button 
                                    onClick={() => setquant(quant > 1 ? quant - 1 : quant) }
                                    className="p-2  bg-red-500 text-white cursor-pointer rounded-lg">
                                      <MinusIcon size={14} />
                                    </button>
                                  </div>

                                  <button className="flex items-center gap-2 text-xs font-bold my-1 rounded-lg justify-center p-2 bg-blue-600 text-white ">
                                    Add to Cart <ShoppingCart size={13} />
                                  </button>
                              </div>
                              </div>
                             
                            </div>

                            
                        </div>
        </div>
        </motion.div>
    </>
  )
}

export default Card
