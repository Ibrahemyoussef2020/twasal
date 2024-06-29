import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="dir-r pr-3 flex flex-col items-end w-full">
      <Link href='/' className="flex justify-end">
         <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200" />
      </Link>

      <Link href='/' className="flex justify-end ml-0 mr-auto items-center	 gap-2 p-3 hover:bg-gray-100 rounded-full transition-all duration-200 w-fit">
        <span className="font-bold hidden xl:inline">Home</span>
         <IoHomeSharp  className="w-7 h-7" />
      </Link>

      <button className="hidden xl:inline bg-blue-400 text-white font-bold rounded-full py-2 px-4 mt-4 w-48 hover:bg-blue-600 transition-all duration-200 shadow-md">
        Sign In
      </button>
    </aside>
  )
}

export default Sidebar