import axios from "axios";
const fetchPost = async (search: any) => {
  const url = new URLSearchParams(search);
  const { data } = await axios.get(`post/admin?${url}`);
  return data;
};

const fetchSinglePost = async (slug: string) => {  
  const { data } = await axios.get(`post/${slug}`);
  return data;
};
export { fetchPost, fetchSinglePost };
