import axios from "axios";

const fetchUser = async ({ pageParam }: any) => {
    console.log(pageParam);
        
    const { data } = await axios.get(pageParam);
    
    return data;
};
export { fetchUser };
