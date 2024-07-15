import Image from "next/image";
import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";


const Post = ({post}) => {
  return (
    <article className=" items-start p-3 flex border-b border-gray-200">
        <Image 
            width={45} 
            height={45} 
            src={post.profileImage}
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

            <Link href={`posts/${post.id}`}>
                <p className=" text-gray-700 mb-3 text-sm">{post?.text}</p>
            </Link>

            { post?.image ? 
            <Link href={`posts/${post.id}`}>
                <div className=" relative w-full min-h-[250px] max-h-[350px]">
                    
                    <img 
                        src={post.image} 
                        alt="post" 
                        className=" rounded-2xl"
                    />
                </div>
            </Link>
            : null }

        </div>
    </article>
  )
}

export default Post