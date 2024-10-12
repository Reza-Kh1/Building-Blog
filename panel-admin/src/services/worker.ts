import axios from "axios";
const fetchWorkerName = async () => {
  const { data } = await axios.get("worker/name-worker");
  return data;
};
export { fetchWorkerName };
