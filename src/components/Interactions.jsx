"use client";

import { app } from "@/firebase";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { 
    HiOutlineChat,
    HiOutlineHeart,
    HiHeart,
    HiOutlineTrash
 } from "react-icons/hi";

const Interactions = ({id,uid})=> {
    const {data:session} = useSession()
    
    const [isLiked , setIsLiked] = useState(false);
    const [likedList,setLikedList] = useState([]);

    const db = getFirestore(app);


    const handleLike = async ()=>{

        if (session) {

           if (isLiked) {
                await deleteDoc(doc(db,'posts',id,'likes', session?.user.uid));
           }
           else{
                await setDoc(doc(db,'posts',id,'likes', session?.user.uid),{
                    username:session.user.username,
                    timestamp:serverTimestamp(),
                });
           } 

        }else{
            signIn()
        }

    }
    const handleComment = ()=>{

    }
    const handleDelete = ()=>{

    }


    useEffect(()=>{
        onSnapshot(collection(db,'posts',id,'likes'),(snapshot)=>{
            setLikedList(snapshot.docs);
        })
    },[db]);
 
    useEffect(()=>{
        setIsLiked(
            likedList.findIndex((liked) =>  liked.id === session?.user?.uid) !== -1
        )
    },[likedList])

    return (
        <div className=" flex justify-start items-center gap-4 mt-5 pt-1 border-t border-gray-300">
            <button onClick={handleComment}>
                <HiOutlineChat className='h-12 w-10 rounded-full transition duration-500 ease-in-out p-2 cursor-pointer hover:text-sky-500 hover:bg-sky-100' />
            </button>

            {isLiked ? 
            <button onClick={handleLike}>
                <HiHeart className={`h-10 w-10 rounded-full text-red-600 font-bold transition duration-500 ease-in-out p-2 cursor-pointer hover:text-red-500 hover:bg-red-100`} />
            </button>
            :
            <button onClick={handleLike}>
                <HiOutlineHeart className={`h-10 w-10 rounded-full text-sky-400 transition duration-500 ease-in-out p-2 cursor-pointer hover:text-red-500 hover:bg-red-100`} />
            </button>}

            <button onClick={handleDelete}>
                <HiOutlineTrash className='h-10 w-10 rounded-full transition duration-500 ease-in-out p-2 cursor-pointer hover:text-red-500 hover:bg-red-100' />
            </button>
        </div>
    )
}

export default Interactions