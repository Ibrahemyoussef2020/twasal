"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react';
import Search from './Search';
import NewsArticles from './NewsArticles';

const News = () => {
  const [news, setNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [newsCount, setNewsCount] = useState(3);



  useEffect(() => {
    if (true) {
      
      const fetchNews = async () => {
        try {
          const response = await fetch('https://ibrahemyoussef2020.github.io/news-api-in-arabic/arabic-news.json');

          if (!response) {
            return false
          }
          const data = await response.json();
          setNews(data.news);
          setAllNews(data.news);
        } catch (error) {
          console.error('Failed to fetch news:', error);
        }
      };

      fetchNews();
    }
  }, []);

  if (!allNews || allNews.length === 0) {
    return <div className="w-[300px]  space-y-3 rounded-xl pt-2 px-2">
        {Array.from({ length: 5 }).map((_, index) =>{
          return <article key={index} className={`bg-gray-100 my-1 animate-pulse w-full h-32 `} />
        })}
    </div>
  } 

  return (
    <aside className=" w-[300px] bg-gray-100 space-y-3 rounded-xl pt-2 px-2">
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
  );
};

export default News
