'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', storeName: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('loading');
    const { error } = await supabase.from('leads').insert([{ 
      name: formData.name, 
      phone: formData.phone, 
      email: formData.email, // إضافة الإيميل
      store_name: formData.storeName, 
      message: formData.message 
    }]);
    if (error) setStatus('error'); else { setStatus('success'); setFormData({ name: '', phone: '', email: '', storeName: '', message: '' }); }
  };
  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-2xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-bl-full"></div>
      <div className="text-center mb-8 relative z-10">
        <h3 className="text-3xl md:text-4xl font-black text-primary mb-3">احصل على نسختك التجريبية مجاناً</h3>
        <p className="text-gray-500 font-medium">سجل بياناتك الآن وسنتواصل معك فوراً لتجهيز وتفعيل نظام محلك.</p>
      </div>
      {status === 'success' ? (
        <div className="bg-green-50 text-green-700 p-8 rounded-3xl text-center border border-green-200">
          <div className="text-6xl mb-4">🎉</div>
          <h4 className="text-2xl font-black mb-2">تم استلام طلبك بنجاح!</h4>
          <p className="font-medium">أهلاً بك في عائلة متجري برو. فريقنا سيتواصل معك قريباً جداً.</p>
          <button onClick={() => setStatus('idle')} className="mt-8 text-primary font-bold hover:text-secondary transition">إرسال طلب آخر</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-gray-700 mb-2">الاسم الكريم *</label>
              {/* تمت إزالة bg-gray-50/50 لجعل الخلفية بيضاء، وإضافة text-gray-900 لضمان ظهور النص باللون الأسود */}
              <input type="text" required className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition bg-white text-gray-900" placeholder="أحمد محمد" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">رقم الهاتف / الواتساب *</label>
              <input type="tel" required className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition bg-white text-gray-900 text-right" dir="ltr" placeholder="05xxxxxxxx" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-gray-700 mb-2">اسم النشاط التجاري</label>
              <input type="text" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition bg-white text-gray-900" placeholder="بقالة النور..." value={formData.storeName} onChange={(e) => setFormData({...formData, storeName: e.target.value})} />
            </div>
            <div>
              {/* حقل الإيميل الجديد */}
              <label className="block font-bold text-gray-700 mb-2">البريد الإلكتروني (اختياري)</label>
              <input type="email" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition bg-white text-gray-900 text-right" dir="ltr" placeholder="example@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-2">كيف يمكننا مساعدتك؟ (اختياري)</label>
            <textarea rows={3} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition bg-white text-gray-900 resize-none" placeholder="لديك استفسار معين بخصوص النظام؟" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
          </div>
          <button type="submit" disabled={status === 'loading'} className="w-full bg-primary text-white font-black text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-[#071d4a] hover:-translate-y-1 transition-all duration-300">
            {status === 'loading' ? 'جاري تأكيد الطلب...' : 'أرسل الطلب الآن 🚀'}
          </button>
        </form>
      )}
    </div>
  );
}