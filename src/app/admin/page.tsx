'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const [leads, setLeads] = useState<any[]>([]);
  const [prices, setPrices] = useState({ quarterly: '', annual: '', lifetime: '', currency: '' });
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [screenshots, setScreenshots] = useState<any[]>([]);
  const [newShotSrc, setNewShotSrc] = useState('');
  const [newShotTitle, setNewShotTitle] = useState('');
  const [newShotDesc, setNewShotDesc] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await supabase.from('settings').select('admin_password').single();
    if (data && data.admin_password === passwordInput) { setIsAuthenticated(true); fetchData(); } 
    else { alert('كلمة المرور غير صحيحة!'); }
  };

  const fetchData = async () => {
    const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (leadsData) setLeads(leadsData);

    const { data: priceData } = await supabase.from('settings').select('price_quarterly, price_annual, price_lifetime, currency').single();
    if (priceData) {
      // FIX: Mapping the database columns to the state keys
      setPrices({
        quarterly: priceData.price_quarterly,
        annual: priceData.price_annual,
        lifetime: priceData.price_lifetime,
        currency: priceData.currency
      });
    }

    const { data: shotsData } = await supabase.from('screenshots').select('*').order('id', { ascending: true });
    if (shotsData) setScreenshots(shotsData);
  };

  const updatePrices = async () => {
    await supabase.from('settings').update({ price_quarterly: prices.quarterly, price_annual: prices.annual, price_lifetime: prices.lifetime, currency: prices.currency }).eq('id', 1);
    alert('تم تحديث الأسعار والعملة بنجاح!');
  };

  const addArticle = async () => {
    await supabase.from('articles').insert([{ title, content, image_url: imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' }]);
    setTitle(''); setContent(''); setImageUrl(''); alert('تمت إضافة المقال بنجاح!');
  };

  const addScreenshot = async () => {
    await supabase.from('screenshots').insert([{ src: newShotSrc, title: newShotTitle, desc_text: newShotDesc }]);
    setNewShotSrc(''); setNewShotTitle(''); setNewShotDesc(''); fetchData(); alert('تمت الإضافة!');
  };

  const deleteScreenshot = async (id: number) => {
    if(confirm('هل أنت متأكد من حذف هذه الصورة من الموقع؟')) { await supabase.from('screenshots').delete().eq('id', id); fetchData(); }
  };

  if (!isAuthenticated) return (
    <div className="min-h-screen flex items-center justify-center bg-primary" dir="rtl">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-sm text-center">
        <div className="text-5xl mb-6">🔒</div>
        <h2 className="text-2xl font-black mb-8 text-primary">تسجيل الدخول للإدارة</h2>
        <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="أدخل كلمة المرور..." className="w-full border-2 border-gray-200 p-4 rounded-xl mb-6 text-center font-bold outline-none focus:border-secondary" required />
        <button type="submit" className="w-full bg-secondary text-primary font-black py-4 rounded-xl hover:bg-yellow-400 transition">دخول</button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm">
           <h1 className="text-3xl font-black text-primary">لوحة تحكم (متجري برو)</h1>
           <button onClick={() => setIsAuthenticated(false)} className="bg-red-100 text-red-600 hover:bg-red-200 px-6 py-2 rounded-xl font-bold transition">تسجيل الخروج</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-primary">
            <h2 className="text-2xl font-black mb-6">رسائل العملاء ({leads.length})</h2>
            <div className="space-y-4 max-h-[30rem] overflow-y-auto pr-2">
              {leads.map(lead => (
                <div key={lead.id} className="border border-gray-100 p-5 rounded-2xl bg-gray-50 hover:bg-white transition">
                  <p className="font-bold text-lg text-primary mb-2">{lead.name}</p>
                  <p className="text-gray-600 mb-1">📞 <span dir="ltr" className="font-bold">{lead.phone}</span></p>
                  {lead.email && <p className="text-gray-600 mb-1">📧 <span dir="ltr">{lead.email}</span></p>}
                  <p className="text-gray-600 mb-3">🏪 {lead.store_name || 'لم يحدد'}</p>
                  {lead.message && <p className="bg-white p-3 rounded-xl text-sm text-gray-700 border border-gray-100">"{lead.message}"</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-secondary">
              <h2 className="text-2xl font-black mb-6">التسعير والعملة</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm font-bold text-gray-500 mb-2">سعر ربع سنوي</label><input type="text" value={prices.quarterly} onChange={(e) => setPrices({...prices, quarterly: e.target.value})} className="w-full border p-3 rounded-xl font-bold" /></div>
                <div><label className="block text-sm font-bold text-gray-500 mb-2">سعر سنوي</label><input type="text" value={prices.annual} onChange={(e) => setPrices({...prices, annual: e.target.value})} className="w-full border p-3 rounded-xl font-bold" /></div>
                <div><label className="block text-sm font-bold text-gray-500 mb-2">سعر مدى الحياة</label><input type="text" value={prices.lifetime} onChange={(e) => setPrices({...prices, lifetime: e.target.value})} className="w-full border p-3 rounded-xl font-bold" /></div>
                <div><label className="block text-sm font-bold text-gray-500 mb-2">العملة ($, ريال, د.ج)</label><input type="text" value={prices.currency} onChange={(e) => setPrices({...prices, currency: e.target.value})} className="w-full border p-3 rounded-xl font-bold bg-blue-50 text-primary" /></div>
              </div>
              <button onClick={updatePrices} className="w-full bg-secondary text-primary py-3 rounded-xl font-black hover:bg-yellow-400 transition">حفظ إعدادات التسعير</button>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-green-500">
              <h2 className="text-2xl font-black mb-6">إضافة مقال للمدونة</h2>
              <input type="text" placeholder="عنوان المقال" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-200 p-3 mb-4 rounded-xl focus:border-green-500 outline-none" />
              <input type="text" placeholder="رابط صورة المقال (اختياري)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border border-gray-200 p-3 mb-4 rounded-xl focus:border-green-500 outline-none text-left" dir="ltr" />
              <textarea placeholder="محتوى المقال (يدعم HTML مثل <h2> و <strong>)" value={content} onChange={(e) => setContent(e.target.value)} rows={4} className="w-full border border-gray-200 p-3 mb-4 rounded-xl focus:border-green-500 outline-none"></textarea>
              <button onClick={addArticle} className="w-full bg-green-600 text-white py-3 rounded-xl font-black hover:bg-green-700 transition">نشر المقال 📝</button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-purple-500 lg:col-span-2">
            <h2 className="text-2xl font-black mb-2">إدارة واجهات النظام (الصور)</h2>
            <p className="text-gray-500 mb-8 font-medium">أضف الصور في مجلد public/screenshots/ ثم اكتب اسمها هنا.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-purple-50 p-6 rounded-2xl border border-purple-100">
               <input type="text" placeholder="المسار (/screenshots/1.png)" value={newShotSrc} onChange={(e)=>setNewShotSrc(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-purple-500 text-left" dir="ltr" />
               <input type="text" placeholder="العنوان (مثال: نقطة البيع)" value={newShotTitle} onChange={(e)=>setNewShotTitle(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-purple-500" />
               <input type="text" placeholder="الوصف القصير" value={newShotDesc} onChange={(e)=>setNewShotDesc(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-purple-500" />
               <button onClick={addScreenshot} className="bg-purple-600 text-white font-black rounded-xl hover:bg-purple-700 transition shadow-md">إضافة الواجهة 🖼️</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {screenshots.map(shot => (
                 <div key={shot.id} className="border border-gray-100 p-5 rounded-2xl flex flex-col justify-between bg-gray-50 hover:bg-white transition">
                    <div>
                      <p className="font-bold text-xs text-gray-400 bg-gray-200 inline-block px-2 py-1 rounded-md mb-3" dir="ltr">{shot.src}</p>
                      <h4 className="text-lg font-black text-primary mb-1">{shot.title}</h4>
                      <p className="text-sm text-gray-500 font-medium">{shot.desc_text}</p>
                    </div>
                    <button onClick={() => deleteScreenshot(shot.id)} className="mt-5 text-red-500 font-bold hover:bg-red-50 py-2 rounded-lg transition text-center border border-red-100">حذف الصورة</button>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}