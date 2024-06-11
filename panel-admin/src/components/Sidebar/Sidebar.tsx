import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-full right-0 top-0 sticky mt-2">
      <ul>
        <li>
          <Link to={"/home/dashboard"}>داشبورد</Link>
        </li>
        <li>
          <Link to={"/home/users"}>کاربران</Link>
        </li>
        <li>
          <Link to={"/home/posts"}>پست ها</Link>
        </li>
        <li>
          <Link to={"/home/reviews"}>نظرات</Link>
        </li>
        <li>
          <Link to={"/home/categorys"}>دسته بندی</Link>
        </li>
        <li>
          <Link to={"/home/setting"}>تنظیمات</Link>
        </li>
      </ul>
    </div>
  );
}
