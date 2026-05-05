import React, { useContext, useState } from 'react';
import { Search, Users, CheckCircle, Percent, ClipboardX, Send, Loader2, RefreshCw, CalendarDays, AlertTriangle } from 'lucide-react'; 
import { all_provider } from '../components/ContextProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [islogin,setislogin] = useState(localStorage.getItem('sona_log') || false)
  
  return(
    <>
    <div className=" h-screen">
        {!islogin &&
        <div> 
          <div className="h-100 w-full flex flex-col justify-center text-center items-center p-3 rounded-3xl bg-red-100">
              <AlertTriangle className='text-red-800' size={30} />
              <h1 className="mt-5 text-3xl font-bold text-red-800">
                Please Login to continue 
              </h1>
              <p className="mt-5 text-md font-bold text-red-800">with sona </p>
              <Link to={'login'} className='text-blue-700 underline' >to login</Link>
          </div>
          </div>}
    </div>
    </>
  )
}
;

export default HomePage;
