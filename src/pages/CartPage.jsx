import { ChevronDown, ChevronUp, DotIcon, Gamepad, Glasses, Loader2, LoaderCircleIcon, Smartphone, Trash, Utensils } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/axios';
import Card from '../components/Card';
import { all_provider } from '../components/ContextProvider';

const CartPage = () => {
    const [loading,setloading] = useState(true);
    const userdata = JSON.parse(localStorage.getItem('userlog'));
    const [cartitems,setcartitems] = useState([])
    const  [cartresult,setcartresult] = useState([]);
    const {Notify} = useContext(all_provider)

    useEffect(() => {
        getCart()
    }, [])

    async function getCart() {
        setloading(true);

        try{
            let res = await api.post('/cart',{email:userdata.email});
            setcartresult(res.data);
            setcartitems(res.data.cartitems)
            console.log(res.data);
            
        } catch (e) {
            console.log(e);
        }

        setloading(false)
    }
    
    async function deleteItem(email=userdata.email,itemId) {
        try{
            let res = await api.delete('/cart/delete',{email,itemId});
            Notify('sucess','item deleted successful');

            getCart()
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <>
    <div className="w-full">
        {loading && <>
            <div className="w-full h-100 flex justify-center items-center">
                <Loader2 size={13} className='animate-spin'/>
            </div>
        </>}

        {!cartresult && !loading ? 
        <>
             <div className="w-full h-100 flex text-xs font-bold text-red-500 justify-center items-center">
                Your cart items will show here
            </div>
        </> : 
        <></>}

        {cartitems.length > 0 && !loading ?
        <>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-2 max-sm:grid-cols-1">
                {cartresult.cartitems.map((item,e) => 
                <>
                 <div className="w-full h-50 border p-0.5 relative rounded-lg border-gray-200 dark:border-gray-800">
                    <img src={item.img} className='w-full h-full rounded-lg' />

                    {/* up */}
                    <div className="absolute top-2 px-2 w-full flex items-center justify-end">
                        <span className="bg-gray-100 p-2 rounded-full text-xs">
                            <span className="font-bold">{item.quantity}</span> in cart
                        </span>
                    </div>

                    {/* down */}
                    <div className="absolute z-10 flex items-center justify-between bottom-2 w-full px-2">
                        {/* item name */}
                    <span className=" text-xs bottom-2 bg-gray-100 rounded-full left-2 p-2">
                        {item.title}
                    </span>

                    {/* delete item */}
                    <span
                    onClick={() => deleteItem(item.id)}
                    className="p-2 rounded-full cursor-pointer bg-red-100">
                        <Trash size={13} className='text-red-600' />
                    </span>
                    </div>
                 </div>
            </>)}
            </div>
        </> : 
        <></>}
    </div>
    </>
  )
}

export default CartPage
