'use client';

import { signIn, signOut , useSession } from "next-auth/react";

const LoginBtn = () => {
  
  const {data :session} = useSession()

  return (
    <div>
      {
      session?.user?.email ? 

        <button 
          onClick={()=> signOut()}
          className="hidden lg:inline bg-green-600 text-white font-semibold rounded-full py-2 px-4 mt-4 w-48 hover:bg-green-700 transition-all duration-200 shadow-md">
          تسجيل الخروج
        </button>

    : 

      <button 
        onClick={()=> signIn()}
        className="hidden lg:inline bg-green-600 text-white font-semibold rounded-full py-2 px-4 mt-4 w-48 hover:bg-green-700 transition-all duration-200 shadow-md">
        تسجيل الدخول
      </button>
      }
    </div>
  )
}

export default LoginBtn