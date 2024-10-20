import axios from "axios";
const fetchUser = async (search: any) => {
  const url = new URLSearchParams(search);
  const { data } = await axios.get(`user?${url}`);
  return data;
};
const fetchGteProfile = async () => {
  const { id } = JSON.parse(localStorage.getItem("user") as any);  
  const { data } = await axios.get(`user/${id}`);
  return data.data;
};
export { fetchUser, fetchGteProfile };
