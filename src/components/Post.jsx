import Image from "next/image";
import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import Interactions from "./Interactions";


const Post = ({post,id}) => {
    console.log('fffff' , post.uid);
  return (
    <article className=" hover:bg-gray-50 rounded-sm  p-3 flex  items-start border-b border-gray-200 bg-white mb-4">
        <Image 
            width={45} 
            height={45} 
            src={post?.profileImage}
            alt="user" 
            className=" rounded-full ml-2"
            
        />
        <div className=" flex-1">
            <div className=" flex items-center justify-between">
                <div className=" whitespace-nowrap">
                    <h4 className=" truncate font-bold text-xs"> {post?.name}</h4>
                    <p className=" truncate text-xs">{post?.username}@</p>
                </div>
                <button>
                    <HiDotsHorizontal className=" text-sm" />
                </button>
            </div>

            <Link href={`posts/${id}`}>
                <p className=" text-gray-700 mb-3 text-sm">{post?.text}</p>
            </Link>

            { post?.image ? 
            <Link href={`posts/${id}`}>
                <div className=" relative w-full">
                    
                    <img 
                        src={post?.image} 
                        alt="post" 
                        className=" block rounded-2xl max-w-full max-h-full"
                    />
                </div>
            </Link>
            : null }

            <Interactions id={id} uid={post?.uid}/>

        </div>
    </article>
  )
}

export default Post