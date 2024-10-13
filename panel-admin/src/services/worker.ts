import axios from "axios";
const fetchWorker = async (search: any) => {
  const url = new URLSearchParams(search);
  const { data } = await axios.get(`worker?${url}`);
  return data;
};
const fetchWorkerName = async () => {
  const { data } = await axios.get("worker/name-worker");
  return data;
};
export { fetchWorkerName, fetchWorker };
