import Breadcrums from "@/components/Breadcrums/Breadcrums";
import React from "react";
import ImgTag from "@/components/ImgTag/ImgTag";
import { FaCheck } from "react-icons/fa6";
import SwiperGallery from "@/components/SwiperGallery/SwiperGallery";
import BannerCallUs from "../../components/BannerCallUs/BannerCallUs";
import { fetchApi } from "@/action/fetchApi";
import { AboutUsType } from "../type";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import NotFound from "../not-found";
import SwiperCards from "@/components/SwiperCards/SwiperCards";
const dataBanner = [
  {
    src: "/icon-paint.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "طراحی داخلی",
  },
  {
    src: "/icon-home.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "ساخت هوشمندانه",
  },
  {
    src: "/icon-check.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "اعتبار",
  },
  {
    src: "/icon-money.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "ذخیره کردن پول",
  },
  {
    src: "/icon-conflict.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "سرعت",
  },
  {
    src: "/icon-worker.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "با تجربه",
  },
];
const getData = async () => {
  const data = await fetchApi({ url: "page/aboutMe" });
  if (data.error) return NotFound();
  return data;
};
export default async function page() {
  const { data }: AboutUsType = await getData();
  return (
    <div className="w-full">
      <Breadcrums />
      <div className="classDiv">
        <h1 className="lg:text-xl text-base mb-2 font-semibold">درباره ما</h1>
        <span className="text-xs lg:text-base text-gray-700">
          صفحه ای کوچک درباره خدمات ما
        </span>
        <span className="w-full border block my-4 lg:my-6 "></span>
      </div>
      <div className="classDiv flex flex-col md:flex-row gap-4 md:gap-3">
        <div className="w-full md:w-1/2">
          <h2 className="lg:text-lg font-semibold">{data?.text?.title1}</h2>
          <p className="leading-7 text-sm lg:text-base text-gray-800">
            {data?.text?.text1}
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <SwiperGallery imagesSrc={data?.text?.imgArry} />
        </div>
      </div>
      <div className="w-full px-3 py-3 lg:py-0 flex flex-col md:flex-row gap-5 md:gap-3 bg-[#282828] shadow-md">
        <div className="w-full md:w-1/3 flex items-center">
          <ImgTag src={"/5.jpg"} alt={"test"} width={500} height={450} />
        </div>
        <div className="w-full md:w-2/3 grid grid-cols-2 gap-5 lg:gap-8 lg:p-10">
          {dataBanner.map((props, index) => (
            <div className="flex gap-3" key={index}>
              <figure className="lg:mt-1">
                <ImgTag
                  alt="paint"
                  src={props.src}
                  className="lg:w-16 lg:h-10 object-contain"
                  width={100}
                  height={100}
                />
              </figure>
              <div>
                <span className="text-slate-50 text-sm lg:text-base">
                  {props.title}
                </span>
                <p className="text-slate-400 lg:text-sm mt-1 lg:mt-2 text-xs text-justify">
                  {props.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="classDiv">
        <SwiperCards isProject data={[]} title="پروژه های ما" url="/project" />
      </div>
      <BannerCallUs />
      <div className="classDiv flex flex-col md:flex-row gap-3 items-center">
        <div className="w-full md:w-1/2">
          <h3 className="lg:text-xl mb-3 font-semibold">{data?.text?.title2}</h3>
          <h4 className="text-sm text-gray-700 mb-3">{data?.text?.text2}</h4>
          {data?.text?.textArry.length ? (
            <ul className="flex flex-col gap-1 lg:gap-2">
              {data?.text?.textArry.map((i, index) => (
                <li key={index} className="flex text-gray-800 items-center gap-2 lg:gap-3">
                  <i>
                    <FaCheck />
                  </i>
                  <span className="text-sm md:text-base">{i.text}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="w-full md:w-1/2">
          <ImgTag
            src={"/about.jpg"}
            alt={"about-us"}
            width={500}
            height={450}
          />
        </div>
      </div>
      <ContactSocialMedia />
    </div>
  );
}
