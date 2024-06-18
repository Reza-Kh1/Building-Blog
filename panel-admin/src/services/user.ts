import axios from "axios";

const fetchUser = async (search: any) => {
  const url = new URLSearchParams(search);
  console.log("url" + url);
  const { data } = await axios.get(`user?${url}`);
  return data;
};
export { fetchUser };
