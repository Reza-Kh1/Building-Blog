import { Button, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { dataOrder, dataRole } from "../../data/selectData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
type SearchFormType = {
    search?: string
    role?: string
    order?: string
}
export default function SearchUser() {
    const { register, setValue, handleSubmit, watch } = useForm<SearchFormType>({
        defaultValues: {
            role: "s",
            order: "createdAt-DESC"
        }
    });
    const navigate = useNavigate();
    const searchUser = (form: SearchFormType) => {
        const newForm = form.role === "s" ? { search: form.search, order: form.order } : form;
        const url = "?" + new URLSearchParams(newForm);
        navigate(url);
    }
    const roleValue = watch("role");
    const orderValue = watch("order");
    useEffect(() => {
        if (roleValue === undefined) {
            setValue("role", "s");
        }
        if (orderValue === undefined) {
            setValue("order", "createdAt-DESC");
        }
    }, [roleValue, orderValue, setValue]);
    return (
        <form className="w-full grid my-4 grid-cols-4 gap-3 items-center justify-center">
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
                label="انتخاب سطح کاربری"
                id="evaluationField"
                value={roleValue}
                onChange={(e) => setValue("role", e.target.value)}
            >
                <MenuItem value={"s"}>
                    انتخاب کنید
                </MenuItem>
                {dataRole?.map((i, index) => (
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

            <Button variant="contained" onClick={handleSubmit(searchUser)} color="success">
                جستجو
            </Button>
        </form>
    );
}