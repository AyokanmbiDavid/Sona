import { ChevronDown, ChevronUp, DotIcon, Gamepad, Glasses, Loader2, LoaderCircleIcon, Smartphone, Trash, TruckElectricIcon, Utensils } from 'lucide-react'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import api from '../api/axios';
import Card from '../components/Card';
import { all_provider } from '../components/ContextProvider';
import RefreshComp from '../components/RefreshComp';
import {motion} from 'framer-motion'
import ErrorComp from '../components/ErrorComp';

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
            <div className="grid max-sm:mt-10 xl:grid-cols-4 md:grid-cols-2 gap-2 max-sm:grid-cols-1">
                {cartresult.map((item,e) => 
                <>
                 <motion.div 
                 initial={{y:10,opacity:0.5,scale:0.9}}
                 animate={{y:0,opacity:1,scale:1}}
                 className="w-full h-50 border p-0.5 relative rounded-lg border-gray-200 dark:border-gray-800">
                    <img src={item.img || 'https://unsplash.com'} className='w-full h-full rounded-lg' />

                    {/* up */}
                    <div className="absolute top-2 px-2 w-full flex items-center justify-between">
                        <span className="p-2 bg-black text-white rounded-full text-xs font-bold">
                            $ {item.price}
                        </span>

                        <span className="bg-gray-100 p-2 dark:bg-gray-800 rounded-full text-xs">
                            <span className="font-bold">{item.quantity}</span> in cart
                        </span>
                    </div>

                    {/* down */}
                    <div className="absolute z-10 flex items-center justify-between bottom-2 w-full px-2">
                        {/* item name */}
                    <span className=" text-xs bottom-2 bg-gray-100 dark:bg-gray-800  rounded-full left-2 p-2">
                        {item.title}
                    </span>

                    {/* delete item */}
                    <span
                    onClick={() => deleteItem(item.id)}
                    className="p-2 rounded-full cursor-pointer bg-red-100">
                        <Trash size={13} className='text-red-600' />
                    </span>
                    </div>
                 </motion.div>
            </>)}
            </div>
        </> : 
        <></>}

        {/* checkout  */}
        {total > 0 && totalprod > 1 ?
        <div className=" max-sm:w-full w-100  max-sm:left-0 right-0  fixed max-sm:bottom-20 bottom-0 flex p-1 justify-center items-center">
            <button className="flex justify-center shadow-md text-xs items-center w-full gap-2 rounded-lg p-2 bg-green-500 dark:bg-green-700 font-bold text-white">
                    Checkout <TruckElectricIcon size={14} />
                    <span className="p-2 rounded-full bg-blue-500">
                        $ {total} 
                    </span> ordering 
                    <span className="p-2 px-3 rounded-full bg-blue-500">
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
