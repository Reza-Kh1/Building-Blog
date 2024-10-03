import AboutMe from "../../components/AboutMe/AboutMe";


export default function PageInfo() {
  return (
    <div className='w-full'>
      <h1 className="text-xl font-semibold mb-5">
        صفحه درباره ما
      </h1>
      <AboutMe />
      <h1 className="text-xl font-semibold">
        صفحه سوالات متداول
      </h1>
    </div>
  )
}
