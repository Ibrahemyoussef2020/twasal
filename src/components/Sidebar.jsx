import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="dir-r pr-3 flex flex-col items-start w-full">
      <Link href='/' className="flex justify-start text-3xl pr-0 py-4 font-extrabold text-green-700  relative">
      <span className="pr-4"> تَوَاصَل ْ</span>
      </Link>

      <Link href='/' className="flex justify-start ml-auto mr-0 items-center	 gap-2 p-3 hover:bg-gray-100 rounded-full transition-all duration-200 w-fit">
        <IoHomeSharp  className="w-7 h-7" />
        <span className="font-bold hidden lg:inline text-lg">
          الرئيسية 
        </span>
      </Link>

      <button className="hidden lg:inline bg-green-600 text-white font-semibold rounded-full py-2 px-4 mt-4 w-48 hover:bg-green-700 transition-all duration-200 shadow-md">
        تسجيل الدخول
      </button>
    </aside>
  )
}

export default Sidebar