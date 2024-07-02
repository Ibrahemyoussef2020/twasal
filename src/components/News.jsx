"use client";

import React, { useEffect, useState } from 'react'
import Search from './Search'
import NewsArticles from './NewsArticles';

const News = () => {

  const [news , setNews] = useState([]);
  const [allNews , setAllNews] = useState([]);
  const [newsCount , setNewsCount] = useState(3);

  useEffect(()=>{
     fetch('https://ibrahemyoussef2020.github.io/news-api-in-arabic/arabic-news.json')
      .then((res) => {

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json()
      })
     .then((data) => {
          setNews(data.news);
          setAllNews(data.news);
      })
   
  },[newsCount])


  return (
    <aside>
      <Search 
        news={news}
        setNews={setNews}
        allNews={allNews}
        newsCount={newsCount}
        setNewsCount={setNewsCount}
      />
      <NewsArticles 
        news={news}
        setNews={setNews}
        newsCount={newsCount}
        setNewsCount={setNewsCount}
      />
    </aside>
  )
}

export default News