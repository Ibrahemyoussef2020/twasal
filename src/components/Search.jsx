
"use client";

import { useDebounce } from "@/hooks";
import { useEffect, useState } from "react";

const Search = ({
    allNews,
    news,
    setNews,
    NewsCount,
    setNewsCount
}) => {

    const [searchValue , setSearchValue] = useState('');
    const debouncedValue  = useDebounce(searchValue , 300);


    useEffect(()=>{
        const handleChange = (e)=>{
            const targetNews = allNews.filter(post => post.title.includes(debouncedValue));
            setNews(targetNews);   
        }
        handleChange();
    },[debouncedValue])
   
  return (
    <div className=' sticky top-0 bg-white px-2'>
        <input 
            type="text" 
            placeholder='ابحث عن أخبارك' 
            className=' bg-gray-100 border border-200 rounded-2x text-sm w-full pr-4 pl-3 py-2 outline-gray-300 outline-1'
            onChange={e=> setSearchValue(e.target.value) }
        />
    </div>
  )
}

export default Search