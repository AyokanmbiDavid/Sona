import React, { useContext, useState } from 'react';
import { Search, Users, CheckCircle, Percent, ClipboardX, Send, Loader2, RefreshCw, CalendarDays, AlertTriangle } from 'lucide-react'; 
import { all_provider } from '../components/ContextProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [islogin,setislogin] = useState(localStorage.getItem('userlog') || false)
  
  return(
    <>
    <div className=" h-screen">
        {!islogin &&
        <div> 
          <div className="h-100 w-full flex flex-col justify-center text-center items-center p-3 rounded-md bg-red-100 dark:bg-red-700/40">
              <AlertTriangle className='text-red-800 dark:text-red-300' size={30} />
              <h1 className="mt-5 text-xl font-bold text-red-800 dark:text-red-300">
                Please Login to continue 
              </h1>
              <p className="mt-5 text-md font-bold text-red-800 dark:text-red-300">with sona </p>
              <Link to={'login'} className=' p-3 text-xs text-white bg-red-800/90 rounded-md' >proceed to login</Link>
          </div>
          </div>}
    </div>
    </>
  )
}
;

export default HomePage;
