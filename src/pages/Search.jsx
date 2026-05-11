import { AlertTriangle, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { endpoint } from '../components/ContextProvider';
import axios from 'axios';
import Card from '../components/Card';

const Search = () => {
    const [searchval,setsearchval] = useState('')
    const [loading,setloading] = useState(false);
    const [searchresult,setsearchresult] = useState([])

    let searchValue = async () => {
        setloading(true);
        if (searchval) {
            try {
            let res = await axios.post(`${endpoint}/store/search`,{searchval});
            setsearchresult(res.data);
        } catch (e) {
            console.log(e);
        }
        }
        setloading(false)
    }
    useEffect(() => {
        searchValue()
    },[searchval])

  return (
    <>
        <div className="w-full p-2">
            <div className="flex w-full items-center justify-center gap-2">
                <input type="search" 
                placeholder='Type here to search'
                onChange={(e) => setsearchval(e.target.value)}
                className='text-xs p-2 border lg:min-w-100 max-md:w-full border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg' />

                <button className="p-2 rounded-md text-white bg-blue-600">
                    <SearchIcon size={13} />
                </button>
            </div>

            <div className="mt-2 grid w-full ">
                {/* no search value */}
                {!searchval && 
                <>
                    <div className="w-full p-3 text-xs font-bold text-gray-400 flex justify-center items-center gap-3">
                        Type in something to start searching <SearchIcon size={13}/>
                    </div>
                </>}

                {/* search result */}
                {searchresult.length  > 0 && 
                <div className={`grid mt-2 ${!searchval && 'hidden' } grid-cols-5 max-md:grid-cols-3 dark:text-gray-900 max-sm:grid-cols-1 gap-3  overflow-y-auto`}>
                {searchresult.map((item,e) => (
                    <>
                    <Card title={item.title} price={item.price} />
                    </>
                ))}
            </div>}

            
                {/* no result and */}
                {searchresult.length == 0 &&
                <>
                    <div className={`w-full ${!searchval && 'hidden'}  p-3 text-xs font-bold text-red-400 flex justify-center items-center gap-3`}>
                        Item {searchval} not found <AlertTriangle size={13}/>
                    </div>
                </>}
            </div>
        </div>
    </>
  )
}

export default Search
