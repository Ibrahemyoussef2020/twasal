"use client";

import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Textarea } from ".";
import { useRef } from "react";

const PostsUploader = () => {
    const {data:session} = useSession();
    const imagePickRef = useRef(null);


    if (!session) {
        return <div className="not-allowed-to-upload">lll</div>
    }

    const uploadImage = ()=>{
      console.log('l');
    }

  return ( 
    <div className="flex gap-2 py-3 px-2 text-black sticky top-0 z-100 border border-gray-300 rounded-md mx-auto max-w-[550px]">
        <img src= {session.user.image} alt={session.user.name} className=" hover:brightness-50 h-11 w-11 cursor-pointer  rounded-full" />
        
        <div className=" text-black grow-1 flex-1">
            <Textarea />
            <div className="flex justify-between border-t border-gray-200 pt-3 pb-2">
              <label>
                <HiOutlinePhotograph onClick={()=> imagePickRef.current.click()} className=" h-8 w-8 text-sky-500 hover:text-sky-300" />
                <input 
                  type="file"
                  accept="image/*"
                  onChange={uploadImage}
                  ref={imagePickRef}
                />
              </label>
              <button className=" bg-green-700 py-1 px-3 rounded-2xl text-white text-lg hover:bg-green-600">مشاركة</button>
            </div>
        </div>
    </div>
  )
}

export default PostsUploader