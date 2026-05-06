import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CloudUpload, DoorOpen, EyeClosed, EyeIcon, Info, Key, LockIcon, ShoppingCart, User } from "lucide-react";
// import { ShopContext } from "../components/ContextProvider";

const LoginPage = () => {
    const [userlog,setuserlog] = useState({email:'',password:'',type:'user'})

    const loginUser = (usertype) => {

    }
  return(
    <>
      <div className="w-full p-10 flex max-md:flex-col overflow-hidden justify-center items-center h-full pb-40">
        {/* left */}
        <div className="w-full px-10 max-md:p-0 xl:max-w-xl ">
          <h1 className="text-2xl dark:text-gray-300 font-bold">Login</h1>
          
          <form onSubmit={loginUser()} className="mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs dark:text-gray-300">Email</label>
              <input type="email" placeholder="JohnDoe@gmail.com"
              onChange={(e) => setuserlog({...userlog,email: e.target.vause})} required
              className="bg-gray-100 rounded-md text-xs border dark:text-gray-300 border-gray-200 dark:bg-gray-800 dark:border-gray-700"/>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label className="text-xs dark:text-gray-300">Password</label>
              <input 
              onChange={(e) => setuserlog({...userlog,email: e.target.vause})} required
              type="password" placeholder="........" 
              className="bg-gray-100 rounded-md text-xs dark:text-gray-300 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"/>
            </div>

            <div className="flex gap-3 mt-5 items-center justify-between">
              <button 
              onClick={() => loginUser('user')}
              className="w-full p-2 bg-blue-500 dark:bg-blue-800 rounded-xl text-xs text-center font-bold text-white cursor-pointer">
                continue as sona_dev
              </button>

              <button 
              onClick={() => loginUser('admin')}
              className="text-xs shrink-0 p-2 bg-green-100 dark:bg-green-900 dark:text-green-200 text-green-700 rounded-xl font-bold cursor-pointer">Admin</button>
            </div>

            <div className="mt-5 w-full text-center flex justify-center  text-blue-700 underline p-1 text-xs rounded-xl">
              <Link className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 " to={'/signup'}>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default LoginPage;