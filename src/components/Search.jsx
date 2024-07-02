
"use client";

import { useEffect, useState } from "react";

const Search = ({
    allNews,
    news,
    setNews,
    NewsCount,
    setNewsCount
}) => {

    const handleChange = (e)=>{
        if (e.target.value) {
            const targetNews = news.filter(post => post.title.includes(e.target.value));
            setNews(targetNews);    
        }else{
            setNews(allNews);
        }
    }

    console.log(news);
   
  return (
    <div className=' sticky top-0 bg-white px-2'>
        <input 
            type="text" 
            placeholder='ابحث عن أخبارك' 
            className=' bg-gray-100 border border-200 rounded-2x text-sm w-full pr-4 pl-3 py-2 outline-gray-300 outline-1'
            onChange={e=> handleChange(e) }
        />
    </div>
  )
}

export default Search