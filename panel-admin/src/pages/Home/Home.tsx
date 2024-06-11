import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="w-full flex">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-9/12">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
