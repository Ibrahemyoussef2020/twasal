"use Server";

import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query
} from 'firebase/firestore';

import {app} from '@/firebase';
import Post from './Post';

const Posts = async () => {
  const db = getFirestore(app);
  const q = query(collection(db,'posts'),orderBy('timestamp','desc'));
  const querySnapsShot = await getDocs(q);
  let data = [];

  
  querySnapsShot.forEach(doc => {
    data.push({id:doc.id , ...doc.data()})
  }) 

  return (
    <div className='p-2 bg-gray-200'> {
      data?.map(post => <Post key={post.id} post={post} id={post.id} />)
    }</div>
  )
}
export default Posts;