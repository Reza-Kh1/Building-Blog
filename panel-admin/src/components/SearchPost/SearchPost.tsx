import { Button, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { dataOrder, dataStatus } from "../../data/selectData";
type SearchFormType = {
  search?: string;
  status?: string;
  order?: string;
};
export default function SearchPost({ onlinePrice }: { onlinePrice?: boolean }) {
  const { register, setValue, handleSubmit, watch } = useForm<SearchFormType>({
    defaultValues: {
      status: onlinePrice ? "false" : "s",
      order: "createdAt-DESC",
    },
  });
  const navigate = useNavigate();
  const searchUser = (form: SearchFormType) => {
    const newForm =
      form.status === "s" ? { search: form.search, order: form.order } : form;
    const url = "?" + new URLSearchParams(newForm);
    navigate(url);
  };
  const roleValue = watch("status");
  const orderValue = watch("order");
  return (
    <form className="w-full grid my-4 grid-cols-4 gap-3 items-center justify-center">
      {!onlinePrice && (
        <TextField
          autoComplete="off"
          className="shadow-md"
          label={"جستجو..."}
          fullWidth
          {...register("search")}
        />
      )}

      <TextField
        fullWidth
        autoComplete="off"
        select
        className="shadow-md"
        label="وضعیت پست"
        id="evaluationField"
        value={roleValue}
        onChange={(e) => setValue("status", e.target.value)}
      >
        {!onlinePrice && <MenuItem value={"s"}>نمایش همه</MenuItem>}
        {onlinePrice
          ? [
              { name: "دیده نشده", value: "false" },
              { name: "دیده شده", value: "true" },
            ].map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.name}
              </MenuItem>
            ))
          : dataStatus?.map((i, index) => (
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
      <div>
        <Button
          className="w-1/2"
          variant="contained"
          onClick={handleSubmit(searchUser)}
          color="success"
        >
          جستجو
        </Button>
      </div>
    </form>
  );
}
