import CustomButton from "@/components/CustomButton/CustomButton";
import SwiperHero from "@/components/SwiperHero/SwiperHero";
import { FaPhone } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="w-full ">
      <SwiperHero />
      <div className="p-4 bg-gradient-to-tr to-blue-300 from-slate-200 shadow-md">
        <div className="max-w-7xl w-full flex justify-between items-center mx-auto py-6">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-gray-700 block mb-2">آماده‌ایم تا با شروع این همکاری، رویاهای ساخت و ساز شما را به واقعیت تبدیل کنیم – با هم، از ایده تا اجرا پیش خواهیم رفت!</span>
            <span className="text-sm text-gray-600">با ما، خانه‌ رویایی‌تان را از پایه بسازید – کیفیت، ایمنی و زیبایی در هر قدم از ساخت!</span>
          </div>
          <div className="w-1/6">
            <CustomButton name="تماس بگیرید" type="button" iconEnd={<FaPhone />} />
          </div>
        </div>
      </div>
      <div className="max-w-7xl">

      </div>
    </main>
  );
}
