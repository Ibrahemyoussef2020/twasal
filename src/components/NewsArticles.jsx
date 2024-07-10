"use client";

const NewsArticles = ({
    news,
    setNews,
    newsCount,
    setNewsCount
}) => {


    if (!news || news.length === 0) {
        return <h2 className="text-3xl"> لا يوجد مقالات تتضمن هذا</h2>;
    }


  return (
    <div className=" text-gray-700">
        <h2 className="text-xl mt-2 mb-4 px-1 font-bold underline cursor-pointer"> 
        <a target="_blank" href="https://www.linkedin.com/in/ibrahim-youssef-2a65b1261/">
            الاطلاع على آخر المستجدات  
        </a>
        </h2>
        <div className="px-2">
        {
            news.slice(0,newsCount).map(post => <article key={post.id}>
                <a href='/' target="_blank"  className="pt-2">
                    <h4 className="text-sm font-bold mb-[2px] text-green-800 underline">{post.title}</h4>
                    <p className=" text-xs text-gray-500 mb-1">
                        {post.content.slice(0,150)}... 
                    </p>

                    <img width={250} src={post.image} alt={post.title} className=" h-24 rounded-lg my-2"/>
                </a>

                <p className=" font-semibold text-sm my-1"> (أ) الناشر : {post.author}</p>

                <hr  className="my-2"/>    
            </article>)
        }
        </div>
        <button 
            className="w-full py-2 bg-gray-200 hover:bg-slate-300 transation duration-200"
            onClick={()=> setNewsCount(newsCount + 3)}
        >
            اقرأ المزيد
        </button>
    </div>
  )
}

export default NewsArticles