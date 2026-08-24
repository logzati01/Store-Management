'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function Blog() {
  const [articles, setArticles] = useState<any[]>([]);
  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
      if (data) setArticles(data);
    };
    fetchArticles();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white py-6 px-6 flex justify-between items-center shadow-md">
        <Link href="/" className="text-3xl font-black">متجري <span className="text-secondary">برو</span></Link>
        <div className="flex gap-6 font-bold">
          <Link href="/blog" className="hover:text-secondary">المدونة</Link>
          <Link href="/" className="bg-secondary text-primary px-5 py-2.5 rounded-xl">الرئيسية</Link>
        </div>
      </header>

      <div className="bg-primary text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">مدونة <span className="text-secondary">متجري برو</span></h1>
        <p className="text-xl text-gray-300 font-medium">أسرار، نصائح، واستراتيجيات لإدارة محلك التجاري وزيادة أرباحك.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        {articles.length === 0 ? <p className="text-center text-gray-500 font-bold text-xl">جاري تحميل المقالات...</p> : null}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.id}`} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition duration-300 flex flex-col group">
              <div className="w-full h-56 bg-gray-200 relative overflow-hidden">
                 <img src={article.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h2 className="text-2xl font-black text-gray-900 mb-4 line-clamp-2 group-hover:text-primary transition">{article.title}</h2>
                {/* تم استخدام style لضبط الـ HTML الداخلي ليظهر كنص عادي غير منسق في البطاقة */}
                <div className="text-gray-500 font-medium leading-relaxed line-clamp-3 mb-6" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                <span className="mt-auto self-start text-secondary font-black group-hover:translate-x-2 transition-transform">اقرأ المقال كاملاً ←</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}