'use client';

import { app } from "@/firebase";
import { collection, doc, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ id }) => {
  const db = getFirestore(app);

  const [comments, setComments] = useState([]);

  useEffect(() => {

    const commentsRef = collection(doc(db, 'posts', id), 'comments');

    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const fetchedComments = [];

       snapshot.docs.map(doc => {
        fetchedComments.push({id: doc.id, ...doc.data()})
       })

      setComments(fetchedComments);

    }, (error) => {
      console.error("Error fetching comments: ", error);
    });

    return () => unsubscribe();
  }, [db, id]);


  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          commentId={comment.id}
          originalPostId={id}
        />
      ))}
    </div>
  );
};

export default Comments;

