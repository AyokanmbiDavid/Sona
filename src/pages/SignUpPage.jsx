import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CloudUpload, DoorOpen, EyeClosed, EyeIcon, Info, Key, LockIcon, ShoppingCart, User } from "lucide-react";
import { supabase } from "../lib/supabase";
import { all_provider } from "../components/ContextProvider";
import axios from "axios";

const SignUpPage = () => {
    const [loading,setloading] = useState(false)
    const {Notify} = useContext(all_provider);
    const navigate = useNavigate()
    
    
     const handleSignUp= async(e) => {
      e.preventDefault()

      const formData = new FormData(e.target)
      const email = formData.get('email')
      const password = formData.get('password');
      const firstname = formData.get('firstname')
      const lastname = formData.get('lastname')
      const phonenumber = formData.get('phonenumber')
      const confirmpassword = formData.get('confirmpassword');
      const backupquestion = formData.get('backupquestion')

      

      const endpoint = 'http://localhost:3000/api/user'
      setloading (true)

      if(password != confirmpassword) {
        Notify('failure','password mismatch ')
      } 
       else if (password.length < 6) {
        Notify ('failure','password must be 6 characters long')
      } else {
        try{
          let res = await axios.post(endpoint ,{email,password,firstname,lastname,phonenumber,backupquestion});
          console.log('user created succeas');
          Notify('success','user created successful')
          navigate('/login') 
      } catch (e) {
        console.log('signup failed');
        console.log(e);
        Notify('failure','user signup fail failed') 
      }
      }

      

      setloading(false)
    }


  return (
    <div>
       <div className="w-full p-10 flex max-md:flex-col justify-center items-center h-screen overflow-y-auto max-md:pt-50 pb-40">
        {/* left */}
        <div className="w-full mt-10 px-10 max-md:p-0 xl:max-w-xl ">
          <h1 className="text-2xl dark:text-gray-300 font-bold">Become a Sona Dev</h1>
          
          <form onSubmit={handleSignUp}
          className="mt-4 " >
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
            <InputField label='FirstName' name='firstname' type='text' placeholder='John' />
            <InputField label='LastName' name='lastname' type='text' placeholder='Doe' />
            <InputField label='Username' name='username' type='text' placeholder='__JohnDoe' />
            <InputField label='Phone Number' name='phonenumber' type='number' placeholder='+234' />
            <InputField label='Email' name='email' type='email' placeholder='JohnDoe@gmail.com' />
            <InputField label='Password' name='password' type='password' placeholder='********' />
            <InputField label='Confirm Password' name='confirmpassword' type='password' placeholder='********' />
            <InputField label='Backup Question' name='backupquestion' type='text' placeholder='used to reset password..' />
            </div>

            <button 
            type="submit"
            className="mt-5 p-2 bg-blue-600 text-white rounded-md text-xs px-4">
                Start your journey
            </button>
            <div className="mt-5 w-full text-center flex justify-center  text-blue-700 underline p-1 text-xs rounded-xl">
              <Link className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 " to={'/login'}>back to login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

    const InputField = ({name,label,placeholder,type,settype}) => {
        return(
             <div className="flex flex-col gap-2">
              <label className="text-xs dark:text-gray-300">{label}</label>
              <input type={type} placeholder={placeholder}
              name={name} required
              className="bg-gray-100 p-2 rounded-md text-xs border dark:text-gray-300 border-gray-200 dark:bg-gray-800 dark:border-gray-700"/>
            </div>
        )
    }

export default SignUpPage
