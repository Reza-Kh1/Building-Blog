import { fetchApi } from "@/action/fetchApi";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import CustomButton from "@/components/CustomButton/CustomButton";
import OurServices from "@/components/OurServices/OurServices";
import SwiperCards from "@/components/SwiperCards/SwiperCards";
import SwiperHero from "@/components/SwiperHero/SwiperHero";
import { FaPhone } from "react-icons/fa6";
import { AllExpertType, AllPostType, AllProjectType } from "./type";
import { dataApi } from "@/data/tagsName";
const getProject = () => {
  return fetchApi({ url: dataApi.projects.url, tags: dataApi.projects.tags, next: dataApi.projects.cache })
}
const getPosts = () => {
  return fetchApi({ url: dataApi.posts.url, tags: dataApi.posts.tags, next: dataApi.posts.cache })
}
const getExperts = () => {
  return fetchApi({ url: dataApi.experts.url, tags: dataApi.experts.tags, next: dataApi.experts.cache })
}
export default async function Home() {
  const projects: AllProjectType = await getProject()
  const posts: AllPostType = await getPosts()
  const experts: AllExpertType = await getExperts()
  return (
    <main className="w-full ">
      <SwiperHero />
      <div className="p-5 my-3 md:my-6 bg-gradient-to-tr to-blue-300 from-slate-200 shadow-md">
        <div className="max-w-7xl w-full flex justify-between items-center mx-auto">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-gray-700 block mb-2">
              آماده‌ایم تا با شروع این همکاری، رویاهای ساخت و ساز شما را به
              واقعیت تبدیل کنیم – با هم، از ایده تا اجرا پیش خواهیم رفت!
            </span>
            <span className="text-sm text-gray-600">
              با ما، خانه‌ رویایی‌تان را از پایه بسازید – کیفیت، ایمنی و زیبایی
              در هر قدم از ساخت!
            </span>
          </div>
          <div className="w-1/6">
            <CustomButton
              name="تماس بگیرید"
              type="button"
              iconEnd={<FaPhone />}
            />
          </div>
        </div>
      </div>
      <OurServices />
      <div className="classDiv">
        <SwiperCards
          isProject
          data={projects.rows}
          title="پروژه های ما"
          url="/blog?order=createdAt-DESC&page=1"
        />
        <SwiperCards
          isExpert
          data={experts.rows}
          title="مجریان تیم ما"
          url="/blog?order=createdAt-DESC&page=1"
        />
        <SwiperCards
          isPost
          data={posts.rows}
          title="آخرین پست های منتشر شده"
          url="/blog?order=createdAt-DESC&page=1"
        />
      </div>
      <ContactSocialMedia />
    </main>
  );
}
