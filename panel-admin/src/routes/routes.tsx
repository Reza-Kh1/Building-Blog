import Auth from "../pages/Auth/Auth";
import Categorys from "../pages/Categorys/Categorys";
import CreatePost from "../pages/CreatePost/CreatePost";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import Images from "../pages/Images/Images";
import NotFound from "../pages/NotFound/NotFound";
import Posts from "../pages/Posts/Posts";
import Reviews from "../pages/Reviews/Reviews";
import Setting from "../pages/Setting/Setting";
import SinglePost from "../pages/SinglePost/SinglePost";
import Users from "../pages/Users/Users";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import OnlinePrice from "../pages/OnlinePrice/OnlinePrice";
import Worker from "../pages/Worker/Worker";
import Projects from "../pages/Projects/Projects";
import PageInfo from "../pages/PageInfo/PageInfo";
import Message from "../pages/Message/Message";

export default [
  { path: "/", element: <Auth /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  {
    path: "/home",
    element: <Home />,
    children: [
      { path: "users", element: <Users /> },
      { path: "online-price", element: <OnlinePrice /> },
      { path: "worker", element: <Worker /> },
      { path: "projects", element: <Projects /> },
      { path: "page-info", element: <PageInfo /> },
      { path: "message", element: <Message /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "reviews", element: <Reviews /> },
      { path: "categorys", element: <Categorys /> },
      { path: "image", element: <Images /> },
      { path: "setting", element: <Setting /> },
      { path: "posts", element: <Posts /> },
      { path: "posts/create-post", element: <CreatePost /> },
      { path: "posts/*", element: <SinglePost /> },
    ],
  },
  { path: "/*", element: <NotFound /> },
];
