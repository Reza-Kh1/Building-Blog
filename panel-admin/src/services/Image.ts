import axios from "axios";

const fetchImage = async (url?: string) => {
  const { data } = await axios.get(`image${url ? "?next=" + url : ""}`);
  return data;
};
export { fetchImage };
