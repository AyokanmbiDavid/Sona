import { Minus, Plus, ShoppingCartIcon } from 'lucide-react'
import React, { useState } from 'react'

const ProductDetailsPage = () => {
    const [quant,setquant] = useState(1)
  return (
    <>
        <div className="w-full h-screen pb-20 max-lg:mt-2 overflow-y-auto relative flex max-lg:flex-col gap-3 justify-between items-start">
            {/* img show page */}
            {/* left */}
            <div className="w-full flex max-md:flex-col gap-2">
                {/* main image */}
                <div className="w-6/10 max-md:w-full">
                    <img src="" alt="" 
                    className='w-full h-102 bg-gray-100 dark:bg-gray-800'/>
                </div>
                {/* other images */}
                <div className="w-4/10 max-md:w-full flex  max-md:flex-row flex-col gap-2">
                    {/* 1 */}
                    <img src="" alt=""
                    className='w-full h-50 bg-gray-100 dark:bg-gray-800' />
                    {/* 2 */}
                    <img src="" alt=""
                    className='w-full h-50 bg-gray-100 dark:bg-gray-800' />

                </div>
            </div>
           {/* right */}
           <div className="w-full">
                {/* quantity select */}
                <div className="w-100 max-md:w-full flex gap-2 justify-between items-center">
                    <button 
                    onClick={()=> setquant(quant + 1)}
                    className={`p-2 bg-blue-600 text-white rounded-md cursor-pointer`}>
                        <Plus size={15}/>
                    </button>
                        <span className=" w-full p-2 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
>
                            {quant}
                        </span>
                    <button 
                    onClick={()=> quant > 1 && setquant(quant - 1)}
                    className={`p-2 bg-red-500 text-white rounded-md cursor-pointer ${quant == 1 && 'bg-red-500/50'}`}>
                        <Minus size={15}/>
                    </button>
                </div>
           </div>

           {/* sticky at to cart button */}
           <div className="fixed xl:bottom-10 max-lg:bottom-20 right-5">
            <button
            className='flex gap-3 items-center shrink-0 text-xs font-bold p-3 px-4 rounded-full bg-blue-600 text-white cursor-pointer hover:shadow-lg transition-all'>
                Add to cart <ShoppingCartIcon size={13}/>
            </button>
           </div>
        </div>
    </>
  )
}

export default ProductDetailsPage
