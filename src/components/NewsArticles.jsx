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
    <div className=" text-gray-700 bg-gray-100 space-y-3 rounded-xl pt-2 pr-2 max-w-[400px]">
        <h2 className="text-xl my-2 px-1 font-bold">اطلع على آخر المستجدات</h2>
        {
            news.slice(0,newsCount).map(post => <article key={post.id}>
                <a href='/' target="_blank" >
                    <h4 className="text-sm">{post.title}</h4>
                    <p className=" text-xs text-gray-500 mb-1">
                        {post.content.slice(0,150)}... 
                    </p>

                    <img width={250} src={post.image} alt={post.title} className=" h-24 rounded-lg"/>
                </a>

                <p className=" font-semibold text-sm my-1"> كتبه : {post.author}</p>

                <hr  className="my-2"/>    
            </article>)
        }

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