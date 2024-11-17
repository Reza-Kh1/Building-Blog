import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'سایت مشاوره و اجرای ساختمان سازی',
    short_name: 'ساخت یار',
    description: 'در این صفحه می‌توانید با پروژه‌های انجام شده توسط تیم ساخت یار آشنا شوید. پروژه‌های ساختمانی ما شامل انواع خدمات ساخت و ساز، معماری و پیمانکاری می‌باشند.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    dir:"rtl",
    lang:"fa",
    icons: [
      {
        src: '/logo.png',
        sizes: '512*512',
        type: 'image/png',
      },
    ],
  }
}