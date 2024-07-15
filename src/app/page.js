import { PostsUploader } from "@/components";
import Posts from '@/components/Posts'

const page = () => {
  return (
    <div className='pt-2'>
        <PostsUploader />
        <Posts />
    </div>
  )
}

export default page