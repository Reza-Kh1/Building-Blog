import { Button, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { dataOrder, dataStatus } from "../../data/selectData";
import { useNavigate } from "react-router-dom";
type SearchFormType = {
  search?: string;
  status?: string;
  order?: string;
};
export default function SearchReviews() {
  const navigate = useNavigate();
  const { register, setValue, handleSubmit, watch } = useForm<SearchFormType>({
    defaultValues: {
      status: "false",
      order: "createdAt-DESC",
    },
  });
  const roleValue = watch("status");
  const orderValue = watch("order");
  const getSearch = (form: SearchFormType) => {
    const newForm = form.search
      ? form
      : { order: form.order, status: form.status };
    const url = "?" + new URLSearchParams(newForm);
    navigate(url);
  };
  return (
    <form className="w-full grid grid-cols-4 gap-3 mb-3">
      <TextField
        autoComplete="off"
        className="shadow-md"
        label={"جستجو..."}
        fullWidth
        {...register("search")}
      />
      <TextField
        fullWidth
        autoComplete="off"
        select
        className="shadow-md"
        label="مرتب سازی براساس"
        id="evaluationField"
        value={orderValue}
        onChange={(e) => setValue("order", e.target.value)}
      >
        {dataOrder?.map((i, index) => (
          <MenuItem key={index} value={i.value}>
            {i.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        autoComplete="off"
        select
        className="shadow-md"
        label="وضعیت کامنت ها"
        id="evaluationField"
        value={roleValue}
        onChange={(e) => setValue("status", e.target.value)}
      >
        {dataStatus?.map((i, index) => (
          <MenuItem key={index} value={i.value}>
            {i.name}
          </MenuItem>
        ))}
      </TextField>
      <div className="flex justify-center items-center">
        <Button
          color="success"
          variant="contained"
          onClick={handleSubmit(getSearch)}
          fullWidth
          endIcon={<FaSearch />}
        >
          جستجو
        </Button>
      </div>
    </form>
  );
}
