'use client';

import { IoMdLogIn , IoMdLogOut  } from "react-icons/io";


function LoginBtn({session , signIn , signOut}) {

  return (
    <div>
      {
      session?.user?.email ? 

        <button 
          onClick={()=> signOut()}
          className="bg-inherit hover:bg-gray-200 lg:bg-green-600 text-white text-center font-semibold rounded-full text-xs py-1 px-1 lg:py-2 lg:px-4 mt-4  lg:w-48 lg:hover:bg-green-700 transition-all duration-200 shadow-md">
         <span className=" hidden lg:inline"> تسجيل الخروج </span> <IoMdLogIn className="text-red-500 text-4xl lg:hidden m-auto" /> 
        </button>

    : 

        <button 
          onClick={()=> signIn()}
          className="bg-inherit hover:bg-gray-200 lg:bg-green-600 text-white text-center font-semibold rounded-full text-xs py-1 px-1 lg:py-2 lg:px-4 mt-4  lg:w-48 lg:hover:bg-green-700 transition-all duration-200 shadow-md">
          <span className=" hidden lg:inline"> تسجيل الدخول </span> <IoMdLogOut className="text-green-500 text-4xl lg:hidden m-auto" /> 
        </button>
      }
    </div>
  )
}

export default LoginBtn