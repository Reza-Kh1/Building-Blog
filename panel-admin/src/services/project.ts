import axios from "axios";
const fetchProject = async (search: any) => {
    const url = new URLSearchParams(search);
    const { data } = await axios.get(`project?${url}`);
    return data;
};
const fetchSingleProject = async (name?: string) => {
    const url = name?.replace(/-/g, " ")
    const { data } = await axios.get(`project/${url}`);
    return data?.data;
};
export { fetchProject, fetchSingleProject };
