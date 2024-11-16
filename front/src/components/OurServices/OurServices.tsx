import React from 'react'
import ImgTag from '../ImgTag/ImgTag';
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
export default function OurServices() {
    return (
        <div className="w-full px-3 py-3 lg:py-0 flex flex-col md:flex-row gap-5 md:gap-3 bg-[#282828] shadow-md">
            <div className="w-full md:w-1/3 flex items-center">
                <ImgTag src={"/about-us.jpg"} alt={"test"} width={500} height={450} />
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-2 gap-5 lg:gap-8 lg:p-10">
                {dataBanner.map((props, index) => (
                    <section className="flex gap-3" key={index}>
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
                    </section>
                ))}
            </div>
        </div>
    )
}
