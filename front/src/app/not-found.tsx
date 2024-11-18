import ImgTag from "@/components/ImgTag/ImgTag";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="relative h-screen w-full not-found" style={{ backgroundImage: "url('/sky-image.jpg')" }}>
      <div className="absolute transform -translate-x-1/2 top-16 left-1/2">
        <span className="text-gray-200 text-lg font-bold block mb-5">صفحه مورد نظر شما یافت نشد!</span>
      </div>
      <div className="w-1/3 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute transform">
        <ImgTag alt={"notfound"} src={"/404.png"} width={350} height={300} className="w-full h-auto" />
      </div>
      <div className=" absolute transform bg-purple-400/20 shadow-md rounded-md p-3 px-5 -translate-x-1/3 translate-y-1/3 bottom-1/2 right-0">
        <span className="block mb-2 text-gray-200 font-bold">این خطا به دلایل زیر رخ میدهد :</span>
        <p className="text-gray-300">صفحه ای که به دنبالش هستید پاک شده باشد !</p>
        <p className="text-gray-300">آدرسی که وارد کرده اید اشتباه باشد.</p>
      </div>
      <div className=" absolute transform -translate-x-1/2 bottom-16 left-1/2">
        <Link href={"/"} className="flex w-auto text-gray-200 bg-purple-400/40 shadow-md rounded-md p-2 justify-center items-center gap-3">
          بازگشت به خانه
          <i>
            <FaHome />
          </i>
        </Link>
      </div>
    </div>
  );
}