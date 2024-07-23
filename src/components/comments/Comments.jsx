'use client';

import { app } from "@/firebase";
import { collection, getDocs, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "./Comment";



const Comments =  ({id}) => {
  const db = getFirestore(app);


  console.log(id);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        console.log(snapshot.docs);
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);


  console.log(comments);

  return (
    <div>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment.data()}
          commentId={comment.id}
          originalPostId={id}
        />
      ))}
    </div>
  )
}  

export default Comments