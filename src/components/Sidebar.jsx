import Link from "next/link";
import { signIn, signOut , useSession } from "next-auth/react";
import { FaXTwitter } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import  LoginBtn  from "./LoginBtn";

const Sidebar = () => {

  const {data:session} = useSession()


  return (
    <aside className=" sticky top-0 r-0 dir-r bg-white px-2 md:pr-6 w-[60px] md:w-[220px] text-center flex flex-col justify-between h-screen max-h-screen pb-2 items-start">
      
      <div className=" container-one fixed top-5 right-1.5">
        <Link href='/' className="flex justify-start text-3xl py-4 font-extrabold text-green-700  relative">
        <span className="hidden sm:inline lg:pr-4"> تَوَاصَل ْ</span>
        <span className="sm:hidden border-2 border-green-800 rounded-full flex items-center justify-center w-10 h-10 pb-0.5 pr-0.5">ت</span>
        </Link>

        <Link href='/' className="mx-auto my-3 flex justify-start md:ml-auto md:mr-0 items-center	 gap-2 p-2 lg:bg-inherit hover:bg-gray-100 bg-gray-200 rounded-full transition-all duration-200 w-fit">
          <IoHomeSharp  className="w-7 h-7" />
          <span className="font-bold hidden md:inline text-lg">
            الرئيسية 
          </span>
        </Link>

        <LoginBtn session={session}  signIn={signIn} signOut={signOut}/>
      </div>

      <div className=" pb-3">
      {
          session ? 
          <div className=" fixed bottom-5 -right-1 md:hover:bg-slate-100 text-gray-700 text-sm flex items-center p-2 cursor-pointer md:border border-gray-200 rounded-sm">
            <img className="w-12 h-12 ml-3 rounded-full" src={session.user.image} alt={session.user.name} />
            <div>
              <h4 className="hidden md:block font-bold">{session.user.name}</h4>
              <p className="hidden md:block text-sm text-gray-500">{session.user.username}@</p>
            </div>
          </div>
          :
          null 
      }
      </div>
    </aside>
  )
}

export default Sidebar