"use client";


import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { 

    HiOutlineHeart,
    HiHeart,
    HiOutlineTrash
 } from "react-icons/hi";

 import { AiOutlineComment , AiOutlineLike , AiFillLike  } from "react-icons/ai";

import { useRecoilState } from "recoil";
import { app } from "@/firebase";
import { atomCommentDataState, atomIsPrimaryComment, atomModalState, atomPostIdState } from "@/atom/modalAtom";

const CommentInterAction = ({id,uid,commentId,comment}) => {
    const {data:session} = useSession()
    const [isOpen , setIsOpen] = useRecoilState(atomModalState);
    const [postId , setPostId] = useRecoilState(atomPostIdState);
    const [isPrimaryComment , setIsPrimaryComment] = useRecoilState(atomIsPrimaryComment)
    const [commentAtomData , setcommentAtomData] = useRecoilState(atomCommentDataState);

    const [isLiked , setIsLiked] = useState(false);
    const [likedList,setLikedList] = useState([]);
    const [comments,setComments] = useState([]);


    const db = getFirestore(app);


    const handleLike = async ()=>{

        if (session) {
           if (isLiked) {
                 deleteDoc(doc(db,'posts',id, 'comments' , commentId , 'likes', session?.user.uid));
           }
           else{
                 setDoc(doc(db,'posts',id, 'comments' , commentId , 'likes', session?.user.uid),{
                    username:session?.user.username,
                    timestamp:serverTimestamp(),
                });
           } 
        }else{
            signIn()
        }
    }


    const handleComment =  ()=>{
        if (session) {
            setIsOpen(!isOpen);
            setPostId(id);
            setIsPrimaryComment(false);
            setcommentAtomData({
                id:commentId,
                name:comment?.name,
                text:comment?.comment
            });
        }
        else{
            signIn();
        }
    }


    const handleDelete = async ()=>{
        const confirmDeletion = window.confirm('متأكد من رغبتك فى حذف التعليق ؟');

        if (confirmDeletion) {
                if (session?.user?.uid === uid) {
                    deleteDoc(doc(db,'posts',id, 'comments' , commentId))
                    .then(()=>{
                        alert('تم الحذف بنجاح');
                        window.location.reload();
                    })
                    .catch(()=> alert('خطأ أثناء الحذف')) ;
                }else alert('عفوا . لست صاحب التعليق!')
            }
        }

    useEffect(()=>{
        const unscribe = onSnapshot(collection(db,'posts',id,'comments'), (snapshot)=> {
            setComments(snapshot.docs)
        })

        return ()=> unscribe();
    }) 
   

    useEffect(()=>{
        const unscribe = onSnapshot(collection(db,'posts',id,'comments' , commentId , 'likes'),(snapshot)=>{
            setLikedList(snapshot.docs);
        })

        return ()=> unscribe();
    },[db , id]);
 
    useEffect(()=>{
        setIsLiked(
            likedList.findIndex((liked) =>  liked.id === session?.user?.uid) !== -1
        )
    },[likedList])

    return (
        <div className=" flex justify-start items-center gap-1">
            
            <div className="flex items-center justify-center w-14">
                <button onClick={handleComment} >
                    <AiOutlineComment className=' text-sm  h-12 w-9 rounded-full transition duration-500 ease-in-out p-2 cursor-pointer hover:text-sky-500 hover:bg-sky-100' />
                </button>
            </div>

            <div className="flex items-center justify-center w-14">
                <button onClick={handleLike}>
                    {isLiked ?
                    <AiFillLike className={`text-sm  h-9 w-9 rounded-full text-blue-600 font-bold transition duration-500 ease-in-out p-2 cursor-pointer hover:text-blue-500 hover:bg-blue-100`} />  
                    :<AiOutlineLike className={`text-sm  h-9 w-9 rounded-full transition duration-500 ease-in-out p-2 cursor-pointer hover:text-blue-500 hover:bg-blue-100`} />
                    }
                </button>
    
                <span className="text-sm font-semibold">
                    {likedList.length > 0 ? likedList.length : null}
                </span>
            </div>

            {session?.user?.uid === uid ?
            <button onClick={handleDelete}>
                <HiOutlineTrash className='text-sm  h-9 w-9 rounded-full transition duration-500 ease-in-out p-2 cursor-pointer hover:text-blue-500 hover:bg-blue-100' />
            </button> : null}
        </div>
    )
}

export default CommentInterAction