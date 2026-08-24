import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import './globals.css'
const tajawal = Tajawal({ subsets: ['arabic'], weight: ['300', '400', '500', '700', '800', '900'], variable: '--font-tajawal' })
export const metadata: Metadata = { title: 'متجري برو - نظام إدارة المحلات الأقوى', description: 'النظام الاحترافي المتكامل لإدارة المبيعات والمخزون والديون.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return ( <html lang="ar" dir="rtl"><body className={`${tajawal.variable} font-sans bg-gray-50 text-gray-900`}>{children}</body></html> )
}