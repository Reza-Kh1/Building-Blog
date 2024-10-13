import { useQuery } from "@tanstack/react-query";
import { fetchWorkerName } from "../../services/worker";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
type WorkerType = {
  worker: number;
  setWorker: (value: number) => void;
};
export default function WorkerSelector({ worker, setWorker }: WorkerType) {
  const { data } = useQuery<{ data: { id: number; name: string }[] }>({
    queryKey: ["workerName"],
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    queryFn: fetchWorkerName,
  });
  return (
    <div>
      <FormControl fullWidth className="shadow-md">
        <InputLabel id="demo-simple-select-label">نام متخصص</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="نام متخصص"
          value={worker}
          onChange={({ target }) => setWorker(target.value as number)}
        >
          <MenuItem value={0}>انتخاب کنید</MenuItem>
          {data?.data?.map((i, index) => (
            <MenuItem key={index} value={i.id}>
              {i.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
