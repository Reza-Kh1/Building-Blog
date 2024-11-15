import axios from "axios";
import { toast } from "react-toastify";
type deleteCacheType = {
  tag?: string;
  path?: string;
};
const deleteCache = async ({ tag, path }: deleteCacheType) => {
  let url = "";
  if (tag) {
    url = "tag=" + tag;
  } else {
    url = "path=" + path;
  }
  const err = await axios.delete(
    `${import.meta.env.VITE_PUBLIC_URL_SITE}api/revalidate?${url}`
  );
  if (err.status !== 200) {
    toast.error("!حذف کش با خطا مواجه شد");
  }
  return err;
};
export default deleteCache;
