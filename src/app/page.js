import { PostsUploader } from "@/components";
import Posts from '@/components/Posts'

const page = () => {
  return (
    <div className=' min-h-screen bg-inherit'>
        <div className="h-screen">
          <PostsUploader />
          <Posts />
        </div>
    </div>
  )
}

export default page