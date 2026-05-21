import { ChevronDown, ChevronUp, DotIcon, Gamepad, Glasses, Loader2, LoaderCircleIcon, Smartphone, Utensils } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/axios';
import Card from '../components/Card';
import RefreshComp from '../components/RefreshComp';
import ErrorComp from '../components/ErrorComp';
import { all_provider } from '../components/ContextProvider';

const CategoryPage = () => {
    const [iscate,setiscate] = useState('utensils');
    const [opencates,setopencates] = useState(false);
    const [catresult,setcatresult] = useState([]);
    const [loading,setloading] = useState(true)    
    const [Err,setErr] = useState()   
    const {Notify} = useContext(all_provider)
    
    
    const cates = [
        {name: 'Utensils',icon:<Utensils size={13}/>,set:'utensils'},
        {name: 'Fashion',icon:<Glasses size={13}/>,set:'fashion'},
        {name: 'Gadgets',icon:<Smartphone size={13}/>,set:'gadgets'},
        {name: 'Gaming',icon:<Gamepad size={13}/>,set:'gaming'},
        {name: 'Others',icon:<DotIcon size={13}/>,set:'others'},

    ]

     async function getCat() {
      setloading(true);
      setErr()

        try {
            let res = await api.post('/store/category',{item:iscate});
            setcatresult(res.data);
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

    useEffect(() => {
      getCat()
    }, [iscate])



  return (
    <>
    <RefreshComp func={getCat} loading={loading} />
        <div className="w-full flex max-sm:flex-col">
            {/* category select */}
            <div className="relative">
                <div className="p-2 border sticky top-15 w-40 max-sm:hidden border-gray-100 dark:border-gray-800 rounded-lg">
                {cates.map((item,e) => (
                    <>
                        <div
                        onClick={() => setiscate(item.set)}
                        className={`w-full p-2 flex justify-between hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xs items-center ${iscate == item.set ? 'font-bold bg-gray-100 dark:bg-gray-700':''}`}>
                            {item.name}

                            <span className="">
                                {item.icon}
                            </span>
                        </div>
                    </>
                ))}
            </div>
            </div>

                {/* mobile category select */}
            <div className="w-full flex fixed top-25 gap-2 z-10 px-3 right-0 sm:hidden justify-between items-start ">
                <div className=" w-full p-2 border xl:hidden border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg">
                {cates.map((item,e) => (
                    <>
                        <div
                        onClick={() =>  setiscate(item.set)}
                        className={`w-full p-2 flex justify-between hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xs items-center transition-all duration-200 ${iscate == item.set ? 'font-bold bg-gray-100 dark:bg-gray-700':''} ${opencates && iscate != item.set ? 'hidden' : 'flex'}`}>
                            {item.name}

                            <span className="">
                                {item.icon}
                            </span>
                        </div>
                    </>
                ))}
            </div>
            {/* show others */}
            <div 
                onClick={() => setopencates(!opencates)}
                className=" p-2 mt-2 bg-gray-200 xl:hidden dark:bg-gray-800 rounded-full top-2 right-2">
                    {opencates ? <ChevronDown size={13}/>:<ChevronUp size={13}/>} 
                </div>
            </div>

            {/* side page result */}
            <div className="w-full h-full overflow-y-auto pb-2">
                {/* loading effect */}
                {loading ? <>
                    <div className="w-full h-full flex justify-center items-center ">
                        <span>
                            <LoaderCircleIcon className='animate-spin' size={13} />
                        </span>                        
                    </div>
                </> : <></>
                }

                {/* no result */}
                {catresult.length == 0 && !loading ? <>
                     <div className="w-full h-full flex justify-center items-center ">
                        <span className='text-sm font-bold'>
                            <span className="text-green-500">{iscate} </span> products are coming soon
                        </span>                        
                    </div>
                </> : <></>}

                {/* main result */}
                {catresult.length > 0 && !loading ?
                <>
                    <div className=" grid grid-cols-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-sm:mt-23 dark:text-gray-900 max-sm:grid-cols-2 gap-3  overflow-y-auto">
                        {catresult.map((item,e) => (
                        <>
                            <Card title={item.title} price={item.price} img={item.img} id={item.id}/>
                        </>
                        ))}
                    </div>
                </> :
                <>
                
                </> }
                
            </div>

            {/* error */}
             {!loading && Err == 'Network Error' ? <>
                <ErrorComp Err={Err} />
            </> : <>
            </>}
        </div>

    </>
  )
}

export default CategoryPage
