import Comments from '@/components/comments/Comments';
import Post from '@/components/Post';
import { app } from '@/firebase'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import Link from 'next/link';
import React from 'react'

const PostDetails = async ({params}) => {
  const db = getFirestore(app);
  let data = {};
  const {id} = params;

  const  querySnapshot = await getDoc(doc(db,'posts', id));
  data = {...querySnapshot?.data() , id:querySnapshot?.id};

  console.log('sssssffffffffffsss' , data);

  return (
    <article>
      <a href='/' className='block  top-0 z-40 text-center font-bold text-red-500 mt-2 py-1 px-2 shadow shadow-gray-400 w-full bg-white hover:bg-gray-100 mb-5'>
         العودة إلى الصفحة الرئيسية
      </a>
      <Post post={data} id={data.id} />
      <Comments id={id} />
    </article>
  )
}

export default PostDetails