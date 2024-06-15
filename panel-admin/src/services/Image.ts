import axios from "axios";

const fetchImage = async ({ pageParam }: any) => {
  const { data } = await axios.get(`image${pageParam ? "?next=" + pageParam : ""}`);
  return data;
};
export { fetchImage };
