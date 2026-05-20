import React, { useContext, useState } from 'react';
import { Search, Users, CheckCircle, Percent, ClipboardX, Send, Loader2, RefreshCw, CalendarDays, AlertTriangle } from 'lucide-react'; 
import { all_provider } from '../components/ContextProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Latest from '../components/Latest';
import RefreshComp from '../components/RefreshComp';


const HomePage = () => {
    const [islogin,setislogin] = useState(localStorage.getItem('userlog') || false)
  
  return(
    <>
    <div className="gap-2 max-md:flex-col overflow-y-auto">
      <div className="w-full rounded-lg text-xs bg-green-100 dark:bg-green-800/60 dark:text-green-50 text-green-700 p-3">10%
        <span className='font-bold mx-2'>discount</span> 
        Exclusive for newcomers
        </div>

        <Latest />
    </div>
    </>
  )
}
;

export default HomePage;
