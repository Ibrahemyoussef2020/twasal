"use client";

import {useRecoilState} from 'recoil';
import {atomCommentDataState, atomIsPrimaryComment, atomModalState, atomPostIdState} from  '../../atom/modalAtom';
import { HiX } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, getFirestore, onSnapshot, serverTimestamp} from 'firebase/firestore';
import { app } from '@/firebase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';


const CommentModal = () => {
  const [isOpen , setIsOpen] = useRecoilState(atomModalState);
  const [postId , setPostId] = useRecoilState(atomPostIdState);
  const [isPrimaryComment , setIsPrimaryComment] = useRecoilState(atomIsPrimaryComment);
  const [commentAtomData , setcommentAtomData] = useRecoilState(atomCommentDataState);

  const [postData,setPostData] = useState({});
  const [comment,setComment] = useState('');
  const [isCommentPublished,setIsCommentPublished] = useState(false);

  const {data:session} = useSession();
  const db = getFirestore(app);
  const navigate = useRouter(null);


  useEffect(()=>{
    if (postId) {
      const postRef = doc(db,'posts',postId);
      const unSubscribeComments = onSnapshot(
        postRef,
        (snapshot)=>{
          if (snapshot.exists()) {
              setPostData(snapshot.data());
          }
          else{
            toast.error('خطأ أثناء التعليق');
          }
        }
      )
      return ()=> unSubscribeComments()
    }
  },[postId])

  const postComment = async ()=>{
    setIsCommentPublished(true);
    addDoc(collection(db,'posts',postId,'comments'),{
      uid:session.user.uid,
      name:session.user.name,
      username:session.user.username,
      userImage:session.user.image,
      comment:comment,
      reComment:!isPrimaryComment,
      mainCommentData:isPrimaryComment ? {} : commentAtomData,
      timeStamp:serverTimestamp(),
    })
    .then(()=>{
      toast.success('تم نشر تعليقك')
      setComment('')
      setIsOpen(false) 
      setIsCommentPublished(false);
      navigate.push(`/postsDetails/${postId}`); 
    })
    .catch(()=> toast.error('خطأ أثناء نشر التعليق'))
  }


  return (
    <>
        {
          isOpen && 
          (
          <div className='bg-white border-b p-2 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-60%]  z-[1000] w-[95%] max-w-[400px] custom-shadow  min-h-[150px]  border border-green-600 rounded-lg'>
            <div className='p-1 sm:p-3'>
                <div className='mb-3 bg-white shadow-md rounded-md border border-gray-200 flex items-center p-1 hover:bg-gray-50'>
                  <button onClick={()=> setIsOpen(false)} className='w-full'>
                    <HiX 
                      className=' text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full'
                    />
                  </button>
                </div>
                <div className='p-2 flex items-center space-x-0 relative'>
                  <span className='z-[-1] w-0.5 h-full min-h-[100px] absolute right-7 sm:right-8 top-11 bg-gray-300' />
                  <Image
                    src={postData?.profileImage || '/user.jpg'}
                    alt=''
                    width={48}
                    height={48}
                    decoding="async"
                    className='ml-4 rounded-full p-1 bg-white border border-gray-100'
                  />
                  <div>
                    <h4 className='text-sm leading-none font-bold hover:underline truncate m-0 p-0'>{postData?.name}</h4>
                    <span className=' text-xs truncate p-0'>&lt;{postData?.username}&gt;</span>
                  </div>
                </div>
                <p className=' text-gray-500 mr-16 mb-2'>{postData?.text}</p>

                {!isPrimaryComment ? <p className='mr-16 text-gray-600  bg-gray-200 w-fit px-2 rounded-md py-1 max-w-[270px] truncate'>  رداً على  التعليق : {commentAtomData?.text}</p> : null}
                
                <div className='flex items-start p-1 space-x-3'>
                  <Image
                    src={session?.user?.image || '/user.jpg'}
                    alt=''
                    width={48}
                    height={48}
                    decoding="async"
                   className='ml-4 rounded-full p-1 bg-white border border-gray-100'
                  />
                  <div className='w-full p-2'>
                    <textarea 
                      value={comment}
                      onChange={(e)=> setComment(e.target.value)}
                      name="write-commet" 
                      id="write-commet"
                      placeholder={isPrimaryComment ? 'أدخل تعليقك' : 'أدخل ردك'}
                      className='w-full min-w-full p-3 resize-none border border-gray-400 rounded-lg outline-none tracking-wide min-h-[70px] text-gray-700 placeholder:text-gray-500'
                      >
                    </textarea>                    
                    <button
                      onClick={postComment} 
                      disabled={!comment.trim()} 
                      className={`block w-fit  min-w-[120px] mr-auto ml-1 max-sm:w-full bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-md shadow-green-200 hover:brightness-95 disabled:opacity-80 ${isCommentPublished ? 'animate-pulse' : ''}`}>
                        <span className={isCommentPublished ? '' : 'hidden'}>  جارٍ </span> نشر التعليق  
                    </button>
                  </div>
                </div>
            </div>
          </div>
          )
        }
        <Toaster />
    </>
  )
}

export default CommentModal