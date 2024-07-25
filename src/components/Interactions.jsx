"use client";


import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { 
    HiOutlineChat,
    HiOutlineHeart,
    HiHeart,
    HiOutlineTrash
 } from "react-icons/hi";
import { useRecoilState } from "recoil";
import {atomCommentDataState, atomIsPrimaryComment, atomModalState, atomPostIdState} from '../atom/modalAtom';
import { app } from "@/firebase";
import { Toaster, toast } from 'sonner';
import { useRouter } from "next/navigation";


const Interactions = ({id,uid})=> {
    const {data:session} = useSession()
    const [isOpen , setIsOpen] = useRecoilState(atomModalState);
    const [postId , setPostId] = useRecoilState(atomPostIdState);
    const [isPrimaryComment , setIsPrimaryComment] = useRecoilState(atomIsPrimaryComment);
    const [commentAtomData , setCommentAtomData] = useRecoilState(atomCommentDataState);

    const [isLiked , setIsLiked] = useState(false);
    const [likedList,setLikedList] = useState([]);
    const [comments,setComments] = useState([]);
   

    const db = getFirestore(app);
    const navigate = useRouter();


    const handleLike = async ()=>{

        if (session) {
           if (isLiked) {
                await deleteDoc(doc(db,'posts',id,'likes', session?.user.uid))
           }
           else{
                await setDoc(doc(db,'posts',id,'likes', session?.user.uid),{
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
            setIsPrimaryComment(true);
            setCommentAtomData({
                id:'',
                name:'',
                text:''
            });
        }
        else{
            signIn();
        }
    }

    const handleDelete = async ()=>{
        const confirmDeletion = window.confirm('متأكد من رغبتك فى حذف المنشور ؟');

        if (confirmDeletion) {
                if (session?.user?.uid === uid) {
                  await  deleteDoc(doc(db,'posts',id))
                    .then(()=> toast.success('تم حذف المنشور'))
                    .then(()=> navigate.push('/'))
                    .then(()=> location.reload())
                    .catch(()=> toast.error('خطأ أثناء الحذف')) ;
                    
                    
                }else toast.error('عفوا .ربما لست صاحب المنشور!');
            }
        }

    useEffect(()=>{
        const unscribe = onSnapshot(collection(db,'posts',id,'comments'), (snapshot)=> {
            setComments(snapshot.docs)
        })

       return ()=> unscribe();
    },[db,id])    

    useEffect(()=>{
        const unscribe = onSnapshot(collection(db,'posts',id,'likes'),(snapshot)=>{
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
        <>
        <div className=" flex justify-start items-center gap-3 mt-5 pt-1 border-t border-gray-300">
            
            <div className="flex items-center justify-center w-14">
                <button onClick={handleComment} >
                    <HiOutlineChat className='h-12 w-10 rounded-full transition duration-500 ease-in-out p-2 cursor-pointer hover:text-sky-500 hover:bg-sky-100' />
                </button>
                <span className="text-sm font-semibold">
                        {comments.length > 0 ? comments.length : null}
                </span>
            </div>

            <div className="flex items-center justify-center w-14">
             
                <button onClick={handleLike}>
                    {isLiked ?
                    <HiHeart className={`h-10 w-10 rounded-full text-red-600 font-bold transition duration-500 ease-in-out p-2 cursor-pointer hover:text-red-500 hover:bg-red-100`} />  
                    :<HiOutlineHeart className={`h-10 w-10 rounded-full transition duration-500 ease-in-out p-2 cursor-pointer hover:text-red-500 hover:bg-red-100`} />
                    }
                </button>
    
                <span className="text-sm font-semibold">
                    {likedList.length > 0 ? likedList.length : null}
                </span>
            </div>

            {session?.user?.uid === uid ?
            <button onClick={handleDelete}>
                <HiOutlineTrash className='h-10 w-10 rounded-full transition duration-500 ease-in-out p-2 cursor-pointer hover:text-red-500 hover:bg-red-100' />
            </button> : null}
        </div>
        <Toaster richColors />
        </>
    )
}

export default Interactions