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
    if (typeof window !== 'undefined') {
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
    return <h2 className="text-3xl min-w-[390px]">تحميل الأخبار...</h2>;
  } 

  return (
    <aside className=" min-w-[390px]">
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
