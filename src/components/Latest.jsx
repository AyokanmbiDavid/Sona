import { Loader2, Plus, ShoppingCart, WifiOff, WifiZero, WifiZeroIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import api from '../api/axios';
import RefreshComp from './RefreshComp';
import { all_provider } from './ContextProvider';
import ErrorComp from './ErrorComp';

const Latest = () => {
    const {Notify} = useContext(all_provider)
    const [Lat,setLat] = useState([]);
    const [loading,setloading] = useState(false);
    const endpoint = '/store/latest'
    const [Err,setErr] = useState()

    const fetchData = async () => {
        setloading(true)
        setErr();

        try{
            let res = await api.get(endpoint);
            setLat(res.data)
        } catch (e){
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
    useEffect(() => {
        fetchData()
    },[])
    
  return (
    <>
        <RefreshComp func={fetchData} loading={loading}/>
        <div className="w-full p-2">
            <h1 className='font-bold'>Latest Supply</h1>

            {Lat.length > 0 && !loading ?
            <>
            {/* display grid */}
            <div className="grid mt-2 xl:grid-cols-5 md:grid-cols-3 dark:text-gray-900 max-sm:grid-cols-2 gap-3  overflow-y-auto">
                {Lat.map((item,e) => (
                    <>
                    <Card title={item.title} price={item.price} id={item.id} img={item.img}  />
                    </>
                ))}
            </div>
            </> : <></>
            }

            {loading && <>
                <div className="w-full h-100 flex justify-center items-center">
                    <Loader2 size={13} className='animate-spin' />
                </div>
            </>}

            {!loading && Err ? <>
                <ErrorComp Err={Err} />
            </> : <>
            </>}
        </div>
    </>
  )
}

export default Latest
