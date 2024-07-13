/*import { app } from '../firebase';
import {
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query
} from 'firebase/firestore';

const Feed = async () => {
/*    const db = getFirestore(app);
    const q = query(collection(db,'posts'), orderBy('timestamp', 'desc'));
    const querySnapShot = await getDocs(q);
    let data = [];

    querySnapShot.map(doc => data.push({id:doc.id , ...doc.data}));

    console.log(data); 
    
  return (
    <div>Feed</div>
  )
}
*/


export const Feed = () => {
  return (
    <div>Feed</div>
  )
}


export default Feed