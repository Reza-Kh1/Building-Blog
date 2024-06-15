import axios from "axios";

const fetchUser = async ({ pageParam }: any) => {
    const { data } = await axios.get(`user${pageParam ? "?next=" + pageParam : ""}`);
    return data;
};
export { fetchUser };
