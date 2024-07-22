"use client";

import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";
import  {Textarea}  from ".";
import { useEffect, useRef, useState } from "react";
import {app} from '../firebase'

import{
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore'

const PostsUploader = () => {
    const {data:session} = useSession();
    const [imgUploadedSrc , setImgUploadedSrc] = useState('');
    const [selectedFile,setSelectedFile] = useState(null);
    const [imgLoading , setImgLoading] = useState(false); 
    const [text,setText] = useState('');
    const [imgSkeltonEffect , setImgSkeltonEffect] = useState(false);

    const db = getFirestore(app);


    useEffect(()=>{
      if (selectedFile) {
        setImageToStorage()
      }
    },[selectedFile])


    const uploadImage = (e)=>{
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setImgUploadedSrc(URL.createObjectURL(file));
      }
    }

    const setImageToStorage = ()=>{
      setImgSkeltonEffect(true);
      const storgeData = getStorage(app);
      const fileName =  `${new Date().getTime()}-${selectedFile.name}`;
      const fileRef = ref(storgeData , fileName);
      const uploadData = uploadBytesResumable(fileRef , selectedFile);

      //start snapshot functionality


        uploadData.on('state_changed' , 

          (snapshot)=>{
            const uploadedProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
            console.log('uploaded' + uploadedProgress + '% done');
          },
          (error)=>{
            console.log('snap errorrrrrrrrrrr :' , error);
            setImgSkeltonEffect(false)
            setImgUploadedSrc(null);
            setSelectedFile(null)
          },
          ()=>{
            getDownloadURL(uploadData.snapshot.ref)
            .then((url) => {
              setImgUploadedSrc(url);
              setImgSkeltonEffect(false);
            })
          }
        )
        //end snapshot functionality
    }

    

    const handleSubmitPost = async ()=>{
      setImgLoading(true);
        const docRef = addDoc(collection(db , 'posts'),{
        uid:session.user.uid,
        name:session.user.name,
        username:session.user.username,
        text:text,
        profileImage:session.user.image,
        timestamp:serverTimestamp(),
        image:imgUploadedSrc,
        }); 

      setImgLoading(false)
      setImgUploadedSrc('');
      setText('')
      setSelectedFile(null)
      location.reload();
    }



    
    if (!session) {
      return <div className="not-allowed-to-upload">lll</div>
  }

  return ( 
    <section className="sticky top-0 z-10 flex gap-2  text-black border-b sm:border border-gray-300 p-2 bg-gray-200">
        <div className="bg-white w-full p-2 rounded-md">
          <img src= {session.user.image} alt={session.user.name} className=" hover:brightness-50 h-11 w-11 cursor-pointer  rounded-full" />
        
          <div className=" text-black grow-1 flex-1">

            <Textarea  setText={setText}/> 

              { selectedFile ? 
                <img 
                  src={imgUploadedSrc} 
                  alt="uploaded image" 
                  className={`w-full max-h-[250px] object-cover cursor-pointer ${imgLoading ? ' animate-pulse' : '' }`}
                />
                : null
              }
              <div className="flex justify-between border-t border-gray-200 pt-3 pb-2">
                <label htmlFor="upload-image-input" className=" overflow-hidden">
                  <HiOutlinePhotograph className=" h-8 w-8 text-sky-500 hover:text-sky-300" />
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                    id="upload-image-input"
                    name="upload-image-input"
                    className=" absolute -top-1 -left-1 p-[1px] w-[1px] h-[1px]"
                  />
                </label>
                <button 
                  className=" bg-green-700 py-1 px-3 rounded-2xl text-white text-lg hover:bg-green-600 disabled:bg-green-500 disabled:text-gray-300 "
                  disabled={!text.trim() || imgLoading }
                  onClick={handleSubmitPost}
                  >مشاركة
                </button>
              </div>
          </div>
        </div>
    </section>
  )
}

export default PostsUploader