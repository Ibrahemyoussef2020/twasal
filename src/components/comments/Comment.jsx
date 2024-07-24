'use client';

import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import {
  getFirestore,
  onSnapshot,
  collection,
  setDoc,
  doc,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import { signIn, useSession } from 'next-auth/react';
import { app } from '@/firebase';
import Interactions from '../Interactions';
import Image from 'next/image';
import { atomCommentDataState, atomIsPrimaryComment } from '@/atom/modalAtom';
import { useRecoilState } from 'recoil';
import { CommentInterAction } from '..';

const Comment = ({ comment, commentId, originalPostId})=> {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]); 
  const { data: session } = useSession();
  const [isPrimaryComment , setIsPrimaryComment] = useRecoilState(atomIsPrimaryComment)
  const [commentAtomData , setCommentAtomData] = useRecoilState(atomCommentDataState);

  const db = getFirestore(app);


  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(
          doc(
            db,
            'posts',
            originalPostId,
            'comments',
            commentId,
            'likes',
            session?.user.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            'posts',
            originalPostId,
            'comments',
            commentId,
            'likes',
            session.user.uid
          ),
          {
            username: session.user.username,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(
      collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  console.log(comment);

  return (
    <article className=" bg-white hover:bg-gray-50 rounded-sm  pr-7  flex  items-start border-b border-gray-200  mb-4">
        <Image
            width={35} 
            height={35} 
            src={comment?.userImage}
            alt="user" 
            className=" rounded-full ml-2"
            
        />
        <div className=" flex-1">

            <div className=" flex items-center justify-between">
                <div className=" whitespace-nowrap">
                    <h4 className=" truncate font-bold text-xs"> {comment?.name}</h4>
                    <p className=" truncate text-xs">{comment?.username}@</p>
                </div>
            </div>

            
            {comment?.reComment ?
              <div className='w-fit bg-gray-100 py-1 px-2 my-1'>
                <h3 className=' text-sm text-blue-400'>{comment?.mainCommentData?.name}@</h3>
                <p className=' text-sm text-gray-700'>{comment?.mainCommentData?.text}</p> 
              </div>
              : null}

            <span>
                <p className=" text-gray-700 text-sm">{comment?.comment}</p>
            </span>

            { comment?.image ? 
            <span>
                <div className=" relative w-full">
                    
                    <img 
                        src={comment?.image} 
                        alt="post" 
                        className=" block rounded-2xl max-w-full max-h-full"
                    />
                </div>
            </span>
            : null }

          <CommentInterAction id={originalPostId} commentId={commentId} uid={comment?.uid}  comment={comment}/>
           
        </div>
    </article>
  )
}

export default Comment