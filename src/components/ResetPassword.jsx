import { RefreshCcw, X } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { all_provider } from './ContextProvider'
import axios from 'axios';

const ResetPassword = ({showreset,setshowreset}) => {
    const {Notify} = useContext(all_provider);
    const [loading,setloading] = useState(false);

    const handleReset = async (e) => {
      e.preventDefault();
      setloading(true)      

      const formData = new FormData(e.target) ;
      const email =  formData.get('email')
      const backupquestion =  formData.get('backupquestion')
      const password =  formData.get('newpassword')
      const confirmpassword =  formData.get('confirmpassword');
      const endpoint = 'http://localhost:3000/api/user/profile/resetpassword'

      if (password != confirmpassword) {
        Notify('success','nah your passwords do not match')
      } else if (password.length < 6){
        Notify('failure','Yoo, password must be 6 characters long.');
      } else   {
        try {
            let res = await axios.post(endpoint,{email,password,backupquestion});
            Notify('success','password reset successful')
        } catch (e) {
            console.log(e);
            Notify('failure','password reset failed');
        }
      }

      setloading(false)
    }

  return (
    <>
      {showreset && 
      <div className='fixed top-15 z-10 left-0 flex  p-2 justify-center items-center w-full h-screen '>
      <div className="w-md max-sm:w-full -mt-10 max-md:-mt-30 bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-100 rounded-md shadow-md">
        <h1 className="text-xl font-bold text-green-700 dark:text-green-300 p-3 flex justify-between items-center">
            Hmm, let's fix your login

            <button 
            onClick={() => setshowreset(false)}
            className='p-2 bg-red-100 dark:bg-red-700 rounded-md dark:text-white text-red-900 cursor-pointer'>
              <X size={13}/>
            </button>
        </h1>

        <form onSubmit={handleReset}
        className='p-3'>
            <InputField label={'Your email..'} type={'email'} placeholder={'put your email here..'} name={'email'}/>
            <InputField label={'Backup Question'} type={'text'} placeholder={'backupquestion provided during signup'} name={'backupquestion'}/>
            <InputField label={'New Password'} type={'password'} placeholder={'Your New Password'} name={'newpassword'}/>
            <InputField label={'Confirm Password'} type={'password'} placeholder={'Confirm new password'} name={'confirmpassword'}/>

            <button
            className={` text-xs mt-2 flex justify-center items-center gap-3 bg-blue-700 cursor-pointer text-white p-2 rounded-md`}>
                Reset password <RefreshCcw className={`${loading && 'animate-spin'}`} size={13}/>
            </button>
        </form>
      </div>
    </div>
    }
    </>
  )
}

const InputField = ({name,label,placeholder,type,settype}) => {
        return(
             <div className="flex flex-col mt-2 gap-2">
              <label className="text-xs dark:text-gray-300">{label}</label>
              <input type={type} placeholder={placeholder}
              name={name} required
              className="bg-gray-100 p-2 rounded-md text-xs border dark:text-gray-300 border-gray-200 dark:bg-gray-800 dark:border-gray-700"/>
            </div>
        )
    }

export default ResetPassword
