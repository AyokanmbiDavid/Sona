import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CloudUpload, DoorOpen, EyeClosed, EyeIcon, Info, Key, LockIcon, ShoppingCart, User } from "lucide-react";

const SignUpPage = () => {
    const [userlog,setuserlog] = useState({email:'',password:'',type:'user'})
    
    const SignUpUser = (e) => {
        e.preventDefault()
    };


  return (
    <div>
       <div className="w-full p-10 flex max-md:flex-col justify-center items-center h-screen overflow-auto pb-40">
        {/* left */}
        <div className="w-full mt-10 px-10 max-md:p-0 xl:max-w-xl ">
          <h1 className="text-2xl dark:text-gray-300 font-bold">Become a Sona Dev</h1>
          
          <form className="mt-4 ">
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
            <InputField label='FirstName' set='firstname' type='text' placeholder='John' />
            <InputField label='LastName' set='lastname' type='text' placeholder='Doe' />
            <InputField label='Username' set='username' type='text' placeholder='__JohnDoe' />
            <InputField label='Email' set='email' type='email' placeholder='JohnDoe@gmail.com' />
            <InputField label='Password' set='password' type='passsword' placeholder='********' />
            <InputField label='Confirm Password' set='confimpassword' type='password' placeholder='********' />
            </div>

            <button className="mt-5 p-2 bg-blue-600 text-white rounded-md text-xs px-4">
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

    const InputField = ({label,placeholder,type,settype}) => {
        return(
             <div className="flex flex-col gap-2">
              <label className="text-xs dark:text-gray-300">{label}</label>
              <input type={type} placeholder={placeholder}
              onChange={(e) => setuserlog({...userlog,[settype]: e.target.value})} required
              className="bg-gray-100 p-2 rounded-md text-xs border dark:text-gray-300 border-gray-200 dark:bg-gray-800 dark:border-gray-700"/>
            </div>
        )
    }

export default SignUpPage
