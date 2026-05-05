import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CloudUpload, DoorOpen, EyeClosed, EyeIcon, Info, Key, LockIcon, ShoppingCart, User } from "lucide-react";
// import { ShopContext } from "../components/ContextProvider";

const LoginPage = () => {
 
  return(
    <>
      <div className="w-full p-10 flex max-md:flex-col overflow-y-auto justify-between items-center h-full pb-40">
        <div className="xl:hidden -mt-10">
          <img src="/public/Sona_Icon.png" alt="" className="w-50 h-50" />
        </div>

        {/* left */}
        <div className="w-full px-10 max-md:p-0">
          <h1 className="text-2xl">Login</h1>
          
          <form action="" className="mt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="text-xs">Email</label>
              <input type="email" placeholder="JohnDoe@gmail.com" 
              className="bg-gray-100 rounded-xl text-sm border border-gray-200"/>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="text-xs">Password</label>
              <input type="password" placeholder="........" 
              className="bg-gray-100 rounded-xl text-sm border border-gray-200"/>
            </div>

            <div className="flex gap-3 mt-10 items-center justify-between">
              <button className="w-full p-4 bg-blue-500 rounded-xl text-center font-bold text-white text-sm cursor-pointer">
                continue
              </button>

              <button className="text-xs shrink-0 p-4 bg-green-100 text-green-800 rounded-xl font-bold cursor-pointer">Google Account</button>
            </div>

            <div className="mt-5 w-full text-center text-sm bg-gray-100 text-blue-700 underline p-3 rounded-xl">
              <Link to={'/signup'}>Sign Up</Link>
            </div>
          </form>
        </div>

        {/* right */}
        <div className="w-full -mt-10 max-md:hidden">
          <img src="/public/Sona_Icon.png" alt="" className="w-full h-full" />
        </div>
      </div>
    </>
  )
}
export default LoginPage;