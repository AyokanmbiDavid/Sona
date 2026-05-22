import { AlertTriangle, Loader2, Minus, Plus, ShoppingCartIcon, ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { all_provider } from '../components/ContextProvider';
import RefreshComp from '../components/RefreshComp';

const ProductDetailsPage = () => {
    const [quant,setquant] = useState(1);
    const {id} = useParams();
    const [resu,setresu] = useState();
    const user = JSON.parse(localStorage.getItem('userlog'));
    const [loading,setloading] = useState(false);
    const [err,seterr] = useState();
    const {Notify} = useContext(all_provider)

    useEffect(() => {
        getItem()
    },[])

    async function getItem() {
        setloading(false)
        seterr();

        try{
            let res = await api.post(`/store/${id}`);
            setresu(res.data);            
        } catch (e){
            if (e.response.data.error){
                seterr(e.response.data.error)
            } else{
                seterr('Network Error')
            }
        }
        setloading(false)
    };

     async function AddtoCart () {
    Notify('loading','getting item to cart')
    try{
      let res = api.post(`/cart/${id}`,{email:user.email,quantity:quant});
      Notify('success','item added to cart')
    } catch (e) {
      if (e.response.data.error) {
        Notify('failure',e.response.data.error)
      } else {
      Notify('failure','Network error')
      }
    }
  }
  return (
    <>
    <RefreshComp func={getItem}/>
        <div className="w-full h-screen pb-20 max-lg:mt-2 overflow-y-auto relative flex max-lg:flex-col gap-3 justify-between items-start">
            {/* no error */}
            {!err && !loading ? 
            <>
                {/* img show page */}
            {/* left */}
            <div className="w-full flex max-md:flex-col gap-2">
                {/* main image */}
                <div className="w-6/10 max-md:w-full">
                    <img src={resu?.img} alt="" 
                    className='w-full h-102 bg-gray-100 rounded-lg dark:bg-gray-800'/>
                </div>
                {/* other images */}
                <div className="w-4/10 max-md:w-full flex max-md:flex-row flex-col gap-2">
                    {/* 1 */}
                    <img src="" alt=""
                    className='w-full h-50 bg-gray-100 rounded-lg dark:bg-gray-800' />
                    {/* 2 */}
                    <img src="" alt=""
                    className='w-full h-50 bg-gray-100 rounded-lg dark:bg-gray-800' />

                </div>
            </div>
           {/* right */}
           <div className="w-full">
                {/* name */}
                <div className="text-lg mb-5 font-bold">
                    {resu?.title}
                </div>
                {/* Rating */}
                <span className='text-sm pt-3 font-bold'>Rating</span>
                <div className="flex gap-2 items-center">
                    <div className="w-50 flex gap-1 items-center">
                        <span className="h-3 rounded-full p-2 bg-blue-500 w-4/5"></span>
                        <span className="h-3 rounded-full p-2 bg-gray-100 dark:bg-gray-700 w-1/5"></span>
                    </div>
                    <span className='text-xs'>4 out of 5</span>
                </div>
                {/* quantity select */}
                <div className="w-100 max-md:w-full mt-5 flex gap-2 justify-between items-center">
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
                {/* brand */}
                <div className="mt-3">
                    <span className="text-sm font-bold">
                        Brand: Sona
                    </span>
                </div>
                {/* like and dislike */}
                <div className="mt-3 flex gap-2 items-center">
                    <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                        <ThumbsUp size={20}/>
                    </span>
                    <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                        <ThumbsDown size={20}/>
                    </span>
                </div>

                <button
                onClick={() => AddtoCart()}
                className=" flex gap-2 items-center text-xs mt-10 p-3 rounded-lg font-bold bg-blue-600 cursor-pointer
                 text-white">
                    Add to Cart <ShoppingCartIcon size={13} />
                </button>
           </div>
            </>
            : 
            <></>}

            {/* error */}
            {err && !loading ?
            <>
                <div className="w-full h-100 flex justify-center items-center">
                    <div className="flex flex-col gap-2 items-center text-red-700 dark:text-red-400">
                        <AlertTriangle size={25}  className='' />
                        <span className=" font-bold text-sm">
                            {err}
                        </span>
                    </div>
                </div>
            </>:
            <></>}

            {/* loading */}
            {loading ?
            <>
                <div className="w-full h-100 flex justify-center items-center">
                    <div className="flex flex-col gap-2 items-center">
                        <Loader2 size={25}  className='animate-spin' />
                    </div>
                </div>
            </>:
            <>
            </>}


        </div>
    </>
  )
}

export default ProductDetailsPage
