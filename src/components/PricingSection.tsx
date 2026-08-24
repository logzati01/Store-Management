'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function PricingSection() {
  const [prices, setPrices] = useState({ quarterly: '45', annual: '150', lifetime: '399', currency: '$' });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('settings').select('price_quarterly, price_annual, price_lifetime, currency').single();
      if (data) {
        // FIX: Mapping the database columns to the state keys
        setPrices({
          quarterly: data.price_quarterly,
          annual: data.price_annual,
          lifetime: data.price_lifetime,
          currency: data.currency
        });
      }
    };
    fetchSettings();
  }, []);

  return (
    <section id="pricing" className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">استثمارك <span className="text-secondary">الرابح</span></h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">أسعار شفافة وبدون رسوم خفية. اختر الباقة التي تناسب حجم طموحك.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">باقة 3 أشهر</h3>
            <p className="text-gray-500 mb-6 font-medium">تجربة النظام لفترة قصيرة</p>
            <p className="text-4xl font-black text-primary mb-6">{prices.quarterly} <span className="text-xl text-gray-500">{prices.currency}</span></p>
            <ul className="text-right text-gray-600 space-y-4 mb-8 font-bold">
              <li>✓ إدارة شاملة للمبيعات والمخزون</li>
              <li>✓ تقارير الأرباح والديون</li>
              <li>✓ يعمل بدون إنترنت (Offline)</li>
              <li>✓ دعم فني طوال فترة الاشتراك</li>
            </ul>
            <a href="#contact" className="block w-full bg-gray-100 text-primary py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition">اطلب الآن</a>
          </div>

          <div className="bg-primary p-10 rounded-3xl shadow-2xl border-4 border-secondary text-center transform md:-translate-y-4 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-primary font-black px-6 py-2 rounded-full text-sm">
              الأكثر مبيعاً وأماناً ⭐️
            </div>
            <h3 className="text-3xl font-black text-white mb-2 mt-4">رخصة مدى الحياة</h3>
            <p className="text-gray-300 mb-6 font-medium">ادفع مرة واحدة، وامتلك البرنامج للأبد</p>
            <p className="text-6xl font-black text-secondary mb-6">{prices.lifetime} <span className="text-2xl text-white">{prices.currency}</span></p>
            <ul className="text-right text-gray-300 space-y-4 mb-8 font-bold text-lg">
              <li className="text-white">✓ بدون أي اشتراكات سنوية للبرنامج</li>
              <li>✓ تحديثات مجانية للإصدار الحالي</li>
              <li>✓ أمان تام وسرية للبيانات</li>
              <li>✓ يعمل 100% بدون إنترنت</li>
              <li>✓ أولوية في الدعم الفني</li>
            </ul>
            <a href="#contact" className="block w-full bg-secondary text-primary py-4 rounded-xl font-black text-xl hover:bg-yellow-400 hover:scale-105 transition transform shadow-lg">امتلك النظام الآن</a>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">باقة سنوية</h3>
            <p className="text-gray-500 mb-6 font-medium">للمحلات المستقرة</p>
            <p className="text-4xl font-black text-primary mb-6">{prices.annual} <span className="text-xl text-gray-500">{prices.currency}</span></p>
            <ul className="text-right text-gray-600 space-y-4 mb-8 font-bold">
              <li>✓ توفير مقارنة بالباقة الفصلية</li>
              <li>✓ كل ميزات نظام متجري برو</li>
              <li>✓ تقارير متقدمة للموردين والعملاء</li>
              <li>✓ دعم فني طوال العام</li>
            </ul>
            <a href="#contact" className="block w-full bg-gray-100 text-primary py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition">اطلب الآن</a>
          </div>
        </div>
      </div>
    </section>
  );
}