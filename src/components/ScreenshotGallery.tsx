'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '../lib/supabase';

export default function ScreenshotGallery() {
  const [screenshots, setScreenshots] = useState<any[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchScreenshots = async () => {
      const { data } = await supabase.from('screenshots').select('*').order('id', { ascending: true });
      if (data) setScreenshots(data);
    };
    fetchScreenshots();
  }, []);

  if (screenshots.length === 0) return <div className="text-center text-gray-500 py-10 font-bold">جاري تحميل واجهات النظام...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {screenshots.map((shot) => (
          <div key={shot.id} className="group cursor-pointer flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300" onClick={() => setSelectedImg(shot.src)}>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
              <Image src={shot.src} alt={shot.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                <span className="bg-white text-primary font-black px-6 py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl">
                  🔍 تكبير الصورة
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-black text-primary mb-2">{shot.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{shot.desc_text}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImg && (
        <div className="fixed inset-0 z-[100] bg-[#051842]/95 flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setSelectedImg(null)}>
          <button className="absolute top-6 right-6 text-white text-5xl hover:text-secondary transition transform hover:rotate-90 duration-300" onClick={() => setSelectedImg(null)}>&times;</button>
          <div className="relative w-full max-w-7xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
            <Image src={selectedImg} alt="تكبير" fill className="object-contain" unoptimized />
          </div>
        </div>
      )}
    </div>
  );
}