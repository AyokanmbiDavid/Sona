import { Plus, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';

const Latest = () => {
    const [Lat,setLat] = useState([]);
    const [loading,setloading] = useState(false);
    const endpoint = 'http://localhost:3000/api/store'

    const fetchData = async () => {
        setloading(true)
        try{
            let res = await axios.get(`${endpoint}/latest`);
            setLat(res.data)
        } catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        fetchData()
    },[])
    
  return (
    <>
        <div className="w-full p-2">
            <h1 className='font-bold'>Latest Supply</h1>

            {/* grid supply */}
            <div className="grid mt-2 grid-cols-5 max-md:grid-cols-3 dark:text-gray-900 max-sm:grid-cols-1 gap-3  overflow-y-auto">
                {Lat.map((item,e) => (
                    <>
                    <Card title={item.title} price={item.price} />
                    </>
                ))}
            </div>
        </div>
    </>
  )
}

export default Latest
