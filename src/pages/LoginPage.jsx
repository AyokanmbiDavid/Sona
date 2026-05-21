import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CloudUpload, DoorOpen, Eye, EyeClosed, EyeIcon, Info, Key, Loader, Loader2, LockIcon, ShoppingCart, User } from "lucide-react";
import axios from "axios";
import { all_provider } from "../components/ContextProvider";
import ResetPassword from "../components/ResetPassword";
import api from "../api/axios";
// import { ShopContext } from "../components/ContextProvider";

const LoginPage = () => {
    // const [userlog,setuserlog] = useState({email:'',password:'',type:'user'});
    const [loading,setloading] = useState(false);
    const [showpass,setshowpass] = useState(false)
    const {Notify} = useContext(all_provider)
    const navigate = useNavigate();
    const [showreset,setshowreset] = useState(false)

    const handleLogin= async(e) => {
      e.preventDefault()

      const formData = new FormData(e.target)
      const email = formData.get('email')
      const password = formData.get('password');
      const role = e.nativeEvent.submitter.value;
      const staylogged = formData.get('staylogged') == 'on'
      const endpoint = role === 'user' ? '/user/login' :'/user/login/admin' 
      setloading (true)
      
      if (password.length < 6 ) {
        Notify('failure','password must be 6 characters long')
      } else {
        try{
          let res = await api.post(endpoint ,{email,password});
          console.log('user login succeas');
          Notify('success','login successful');

            localStorage.setItem('userlog',JSON.stringify({email,password,staylogged: staylogged == 'on' ? true : false}))
            localStorage.setItem("token",res.data.token)

          setTimeout(() => {
            navigate('/')
          }, 2000);
      } catch (e) {
        console.log(e.response.data.error);
        if (e.response) {
          Notify('failure',e.response.data.error)
        } else {
        Notify('failure','Network error')
        }
      }
      }

      setloading(false)
    }
  return(
    <>
      <div className="w-full p-10 flex max-md:flex-col overflow-hidden justify-center items-center h-full pb-40">
        {/* left */}
        <div className="w-full px-10 max-md:p-0 xl:max-w- ">
          <h1 className="text-2xl dark:text-gray-300 font-bold">Login</h1>
          
          <form onSubmit={handleLogin} className="mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs dark:text-gray-300">Email</label>
              <input type="email" placeholder="JohnDoe@gmail.com"
              name="email" required
              // onChange={(e) => setuserlog({...userlog,email: e.target.value})} required
              className="bg-gray-100 rounded-md text-xs border dark:text-gray-300 border-gray-200 dark:bg-gray-800 dark:border-gray-700"/>
            </div>

            <div className="flex flex-col gap-2 mt-5 relative">
              <label className="text-xs dark:text-gray-300">Password</label>
              <span
              onClick={() => setshowpass(!showpass)}
              className="absolute z-5 top-7 p-2 right-1 cursor-pointer hover:bg-gray-200 rounded-full">
                {showpass ? <Eye size={13}/> : <EyeClosed size={13}/>}
              </span>
              <input 
              // onChange={(e) => setuserlog({...userlog,email: e.target.value})} required
              name="password" required
              type={showpass ? 'text' : "password"} placeholder="........" 
              className="bg-gray-100 rounded-md text-xs dark:text-gray-300 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"/>
            </div>

            <div className="mt-2 w-full text-xs">
              <label htmlFor="staylogged" className="dark:text-gray-300">
                <input id="staylogged" name="staylogged"
                type="checkbox"  className="mr-3"/>
                stay logged in on this device</label>
            </div>

            {/* login button */}
            <div className="flex gap-3 mt-5 items-center justify-between">
              <button
              type="submit" name="role" value='user'
              className="w-full p-2 bg-blue-500 flex justify-center gap-3 items-center dark:bg-blue-800 rounded-md text-xs text-center font-bold text-white cursor-pointer">
                continue as sona_dev
          
               {loading &&  <span>
                  <Loader2 size={14} className="text-white animate-spin" />
                </span>}
              </button>

              <button 
              type="submit" name="role" value='admin'
              className="text-xs shrink-0 p-2 bg-green-100 dark:bg-green-900 dark:text-green-200 text-green-700 rounded-md font-bold cursor-pointer">Admin</button>
            </div>

            <div
            className="mt-5 w-full text-center flex justify-center  text-blue-700 underline p-1 text-xs rounded-xl">
              <Link className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 " to={'/signup'}>Sign Up</Link>
            </div>

            {/* forgot password */}
            <div 
            onClick={() => setshowreset(true)}
            className="flex  mt-2 text-xs  justify-end items-center">
              <Link className="bg-red-100 dark:bg-red-800 p-2 rounded-md dark:text-white text-red-800">i forgot my password</Link>
            </div>
          </form>
        </div>
      </div>

      <ResetPassword showreset={showreset} setshowreset={setshowreset}/>
    </>
  )
}
export default LoginPage;