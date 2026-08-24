'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

export default function ArticleDetail() {
  const params = useParams();
  const id = params.id;
  const [article, setArticle] = useState<any>(null);
  const [otherArticles, setOtherArticles] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      const { data } = await supabase.from('articles').select('*').eq('id', id).single();
      if (data) setArticle(data);

      const { data: others } = await supabase.from('articles').select('*').neq('id', id).limit(3);
      if (others) setOtherArticles(others);
    };
    fetchArticle();
  }, [id]);

  if (!article) return <div className="min-h-screen flex items-center justify-center font-bold text-xl text-primary">جاري تحميل المقال...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-primary text-white py-6 px-6 flex justify-between items-center shadow-md">
        <Link href="/" className="text-3xl font-black">متجري <span className="text-secondary">برو</span></Link>
        <div className="flex gap-6 font-bold">
          <Link href="/blog" className="hover:text-secondary">المدونة</Link>
          <Link href="/" className="bg-secondary text-primary px-5 py-2.5 rounded-xl">الرئيسية</Link>
        </div>
      </header>

      <article className="container mx-auto px-4 max-w-4xl mt-12 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="mb-8">
          <Link href="/blog" className="text-primary font-bold hover:underline">← العودة إلى قائمة المقالات</Link>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">{article.title}</h1>
        <div className="w-full h-96 rounded-3xl overflow-hidden mb-10 bg-gray-100 relative shadow-md">
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
        </div>
        
        {/* تم تحديث عرض المحتوى لدعم التنسيقات (العناوين، النقاط، الخط العريض) */}
        <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-loose prose-headings:text-primary prose-strong:text-secondary prose-a:text-blue-600 mb-16" dangerouslySetInnerHTML={{ __html: article.content }}></div>

        <div className="bg-gradient-to-r from-primary to-[#051842] text-white p-10 rounded-[2rem] text-center shadow-2xl my-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary opacity-10 rounded-bl-full"></div>
          <h3 className="text-3xl md:text-4xl font-black mb-4 relative z-10">هل اقتنعت بأهمية تطوير محلك؟</h3>
          <p className="text-gray-300 mb-8 font-medium text-lg relative z-10 max-w-xl mx-auto">احصل على نظام "متجري برو" الآن، استمتع بالعمل بدون إنترنت، واحسب أرباحك بدقة تامة.</p>
          <Link href="/#contact" className="inline-block bg-secondary text-primary font-black px-10 py-5 rounded-2xl text-xl hover:bg-yellow-400 transition shadow-xl relative z-10">
            تواصل معنا الآن لطلب النسخة التجريبية 🚀
          </Link>
        </div>

        {otherArticles.length > 0 && (
          <div className="border-t border-gray-100 pt-10 mt-12">
            <h3 className="text-2xl font-black text-primary mb-6">مقالات ذات صلة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherArticles.map(item => (
                <Link key={item.id} href={`/blog/${item.id}`} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition block group">
                  <h4 className="font-bold text-gray-900 group-hover:text-primary transition line-clamp-2">{item.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}