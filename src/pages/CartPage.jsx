import { ChevronDown, ChevronUp, DotIcon, Gamepad, Glasses, Loader2, LoaderCircleIcon, Smartphone, Trash, TruckElectricIcon, Utensils } from 'lucide-react'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import api from '../api/axios';
import Card from '../components/Card';
import { all_provider } from '../components/ContextProvider';
import RefreshComp from '../components/RefreshComp';
import {motion} from 'framer-motion'
import ErrorComp from '../components/ErrorComp';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [loading,setloading] = useState(true);
    const userdata = JSON.parse(localStorage.getItem('userlog'));
    const  [cartresult,setcartresult] = useState([]);
    const {Notify} = useContext(all_provider);   
    const [Err,setErr] = useState()   

    let totalprod = 0;
    const totalproduct = 
       cartresult.forEach(item => {
        totalprod += (Number(item.quantity))
       })       

    let total = 0
      const totalprice = 
       cartresult.forEach(item => {
        total += (Number(item.price) || 0) * (Number(item.quantity) || 0)
       })       
      

    useEffect(() => {
        getCart()
    }, []);

    async function getCart() {
        setloading(true);

        try{
            let res = await api.post('/cart',{email:userdata.email});
            setcartresult(res.data);
            
        } catch (e) {
            if (e.response) {
            setErr(e.response.data.error)
            Notify('failure',e.response.data.error)
            } else {
            Notify('failure','Network error');
            setErr('Network Error')
            }
        }

        setloading(false)
    }
    

    async function deleteItem(itemId) {
        try{
            let res = await api.delete(`/cart/delete/${itemId}`,);
            Notify('success','item deleted successful');

            getCart()
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <>
    <RefreshComp func={getCart} loading={loading} />
    <div className="w-full">
        {loading && <>
            <div className="w-full h-100 flex justify-center items-center">
                <Loader2 size={13} className='animate-spin'/>
            </div>
        </>}

        {cartresult.length == 0 && !Err && !loading ? 
        <>
             <div className="w-full h-100 flex text-xs font-bold text-red-500 justify-center items-center">
                Your cart items will show here
            </div>
        </> : 
        <></>}

        {cartresult.length > 0 && !loading ?
        <>
            <div className="grid max-sm:mt-10 pb-20 xl:grid-cols-4 md:grid-cols-2 gap-2 max-sm:grid-cols-1">
                {cartresult.map((item,e) => 
                <>
                 <motion.div 
                 initial={{y:10,opacity:0.5,scale:0.9}}
                 animate={{y:0,opacity:1,scale:1}}
                 className="w-full border p-0.5 relative rounded-xl hover:scale-105 transition-all duration-200
                  border-gray-200 dark:border-gray-800">
                    <img src={item.img || 'https://unsplash.com'} className='w-full h-50 border-0 rounded-t-xl' />

                    <div className="p-1">
                        {/* title and price */}
                        <div className="flex justify-between items-center w-full">
                            <span className="text-xs">
                                {item.title}
                            </span>
                            <span className="text-xs font-bold">
                               $ {item.price}
                            </span>
                        </div>

                        {/* controls */}
                        <div className="flex mt-2 justify-between items-center w-full">
                            <Link to={`/details/${item.cartId}`} className="p-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg">
                                View
                            </Link>

                            <div className="flex items-center gap-2">
                                {/* quantity */}
                                <span className="text-xs font-bold">
                                    {item.quantity} items
                                </span>

                                <span
                                onClick={() => deleteItem(item.id)}
                                className="p-2 rounded-md bg-red-100 text-red-700 dark:bg-red-500/50 dark:text-red-200 cursor-pointer">
                                    <Trash size={13}/>
                                </span>
                            </div>
                        </div>
                    </div>

                 </motion.div>
            </>)}
            </div>
        </> : 
        <></>}

        {/* checkout  */}
        {total > 0 && totalprod > 1 ?
        <div className=" w-full  max-sm:left-0 right-0  fixed max-sm:bottom-20 bottom-0 flex p-1 justify-center items-center">
            <button className="flex justify-center max-sm:w-full w-100 shadow-md text-xs items-center gap-2 rounded-lg p-2 bg-black cursor-pointer
             dark:bg-white font-bold dark:text-black text-white hover:shadow-2xl">
                    Checkout <TruckElectricIcon size={14} />
                    <span className="p-2 rounded-lg bg-blue-500">
                        $ {total} 
                    </span> ordering 
                    <span className="p-2 px-3 rounded-lg bg-blue-500">
                        {totalprod} 
                    </span> product{totalprod > 1 && 's'}
            </button>
        </div>
        : <>
        </>}

            {/* Error  */}
         {!loading && Err ? <>
            <ErrorComp Err={Err} />
        </> : <>
        </>}
    </div>
    </>
  )
}

export default CartPage
