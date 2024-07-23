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

const Comment = ({ comment, commentId, originalPostId })=> {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]); // [1
  const { data: session } = useSession();
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

  return (
    <article className=" hover:bg-gray-50 rounded-sm  p-3 flex  items-start border-b border-gray-200 bg-white mb-4">
        <Image
            width={45} 
            height={45} 
            src={comment?.profileImage || '/user.jpg'}
            alt="user" 
            className=" rounded-full ml-2"
            
        />
        <div className=" flex-1">
            <div className=" flex items-center justify-between">
                <div className=" whitespace-nowrap">
                    <h4 className=" truncate font-bold text-xs"> {comment?.name}</h4>
                    <p className=" truncate text-xs">{comment?.username}@</p>
                </div>
                <button>
                    <HiDotsHorizontal className=" text-sm" />
                </button>
            </div>

            <span>
                <p className=" text-gray-700 mb-3 text-sm">{comment?.comment}</p>
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


        </div>
    </article>
  )
}

export default Comment