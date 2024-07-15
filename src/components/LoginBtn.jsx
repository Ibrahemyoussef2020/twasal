'use client';

import { IoMdLogIn , IoMdLogOut  } from "react-icons/io";


function LoginBtn({session , signIn , signOut}) {

  return (
    <div className="w-full">
      {
      session?.user?.email ? 

        <button 
          onClick={()=> signOut()}
          className="bg-inherit hover:bg-gray-200 md:bg-green-600 text-white text-center font-semibold rounded-full text-xs py-1 px-1 md:py-2 md:px-4 mt-4  md:w-48 md:hover:bg-green-700 transition-all duration-200 shadow-md">
         <span className=" hidden md:inline"> تسجيل الخروج </span> <IoMdLogIn className="text-red-500 text-4xl  md:hidden m-auto" /> 
        </button>

    : 

        <button 
          onClick={()=> signIn()}
          className="bg-inherit hover:bg-gray-200 md:bg-green-600 text-white text-center font-semibold rounded-full text-xs py-1 px-1 md:py-2 md:px-4 mt-4  md:w-48 md:hover:bg-green-700 transition-all duration-200 shadow-md">
          <span className=" hidden md:inline"> تسجيل الدخول </span> <IoMdLogOut className="text-green-500 text-4xl md:hidden m-auto" /> 
        </button>
      }
    </div>
  )
}

export default LoginBtn