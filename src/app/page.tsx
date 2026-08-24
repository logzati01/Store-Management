import Image from 'next/image';
import ContactForm from '../components/ContactForm';
import PricingSection from '../components/PricingSection';
import ScreenshotGallery from '../components/ScreenshotGallery';

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <header className="bg-primary text-white py-5 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-3xl font-black tracking-tighter flex items-center gap-2">
            <span className="text-secondary text-4xl">متجري</span> برو
          </div>
          <nav className="hidden md:flex gap-8 font-bold text-lg">
            <a href="#features" className="hover:text-secondary transition">قوة النظام</a>
            <a href="#screenshots" className="hover:text-secondary transition">الواجهة</a>
            <a href="#pricing" className="hover:text-secondary transition">الأسعار</a>
            <a href="/blog" className="hover:text-secondary transition">المدونة الإدارية</a>
          </nav>
          <a href="#contact" className="bg-secondary text-primary font-black px-8 py-3 rounded-xl hover:bg-yellow-400 transition transform hover:scale-105 shadow-md">
            اطلب نسختك الآن
          </a>
        </div>
      </header>
      
      <section className="bg-gradient-to-br from-primary via-[#092C74] to-[#051842] text-white py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
          <div className="md:w-1/2 text-center md:text-right">
            <div className="inline-block bg-secondary/10 border border-secondary/20 text-secondary rounded-full px-5 py-2 mb-6 font-black text-sm tracking-wide">
              🔥 ليس مجرد برنامج كاشير.. بل مديرك المالي الذي لا ينام!
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.2]">
              نظام <span className="text-secondary">متجري برو</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 font-bold text-gray-300">
              إدارة احترافية | تنظيم صارم | نمو أكيد
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed text-gray-400 font-medium max-w-xl">
              ودّع الفوضى والدفاتر الورقية. حلك المتكامل لإدارة المبيعات، المخزون، والديون. 
              اكتشف أرباحك الصافية الحقيقية، وراقب نشاطك وكأنك جالس في محلك.. وكل هذا <strong className="text-white">بدون الحاجة للإنترنت!</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
              <a href="#contact" className="bg-secondary text-primary font-black text-xl px-10 py-5 rounded-2xl shadow-[0_0_30px_rgba(255,155,0,0.3)] hover:shadow-[0_0_40px_rgba(255,155,0,0.5)] hover:-translate-y-1 transition-all duration-300 text-center">
                احصل على النسخة التجريبية
              </a>
              <a href="#features" className="bg-white/5 text-white border border-white/10 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-white/10 transition duration-300 text-center flex items-center justify-center gap-2">
                لماذا نحن الأفضل؟ ⬇️
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center w-full">
            <div className="relative w-full max-w-2xl aspect-square drop-shadow-2xl hover:scale-105 transition-transform duration-700">
               <Image src="/image_ff1100.jpg" alt="واجهة نظام متجري برو" fill className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl" priority />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-secondary opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-500 opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      </section>

      <section id="features" className="py-24 px-4 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
              مصمم بعقلية <span className="text-secondary">التاجر الذكي</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
              نحن لا نقدم لك شاشة لضرب الأسعار فقط، بل نظاماً مالياً وإدارياً صارماً يوقف نزيف الخسائر ويحمي رأس مالك.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 transition">📴</div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">يعمل 100% بدون إنترنت</h3>
              <p className="text-gray-600 font-medium leading-relaxed">برنامجك محلي بالكامل. بياناتك مشفرة ومحفوظة في جهازك، وانقطاع الإنترنت لن يوقف عملك أو يعطل زبائنك للحظة واحدة.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 transition">💰</div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">أرباحك بالقرش، لا مزيد من التخمين</h3>
              <p className="text-gray-600 font-medium leading-relaxed">لا تخلط بين المبيعات والربح! البرنامج يفصل بدقة بين تكلفة البضاعة والمصروفات ليعطيك رقم (الربح الصافي الفعلي) في جيبك.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 transition">📓</div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">رقابة حديدية على الديون</h3>
              <p className="text-gray-600 font-medium leading-relaxed">تخلص من الدفتر الممزق والإحراج مع الزبائن. كشوفات حساب دقيقة للعملاء والموردين، وتتبع آلي للدفعات المتأخرة والجزئية.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-orange-100 text-secondary rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 transition">📦</div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">جرد ذكي يمنع التلاعب</h3>
              <p className="text-gray-600 font-medium leading-relaxed">لا يمكن للموظف تعديل المخزون عشوائياً. كل نقص أو زيادة يُسجل كـ "حركة موثقة" (بيع، تلف) مع حفظ التاريخ واسم الكاشير.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 transition">🛡️</div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">صلاحيات وسجل تدقيق صارم</h3>
              <p className="text-gray-600 font-medium leading-relaxed">راقب محلك وأنت غائب! امنع الكاشير من الحذف أو رؤية رأس المال، وسجل سري يسجل كل حركة بالثانية لكشف أي خطأ أو اختلاس.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 transition">📊</div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">تقارير تكشف لك المستور</h3>
              <p className="text-gray-600 font-medium leading-relaxed">من هو عميلك الأهم (بناءً على الربح لا الشراء)؟ ما هي السلع الراكدة التي تجمد أموالك؟ دع تقاريرنا تجيبك وتضاعف مبيعاتك.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="screenshots" className="py-24 px-4 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">جولة داخل <span className="text-secondary">النظام</span></h2>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">واجهة عصرية ومريحة للعين، مصممة لتسريع عملك بدون أي تعقيد تقني.</p>
          </div>
          <ScreenshotGallery />
        </div>
      </section>

      <PricingSection />

      <section id="contact" className="py-24 px-4 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <ContactForm />
        </div>
      </section>
      
      <footer className="bg-gray-900 text-gray-400 py-10 text-center border-t border-gray-800">
        <p className="text-lg font-bold">© {new Date().getFullYear()} متجري برو - صُمم لنجاح التاجر العربي. جميع الحقوق محفوظة.</p>
      </footer>
    </main>
  );
}