import { Button, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { dataOrder, dataStatus, dataCheck } from "../../data/selectData";
import TagAutocomplete from "../TagAutocomplete/TagAutocomplete";
import { useEffect, useState } from "react";
import queryString from "query-string";
type SearchFormType = {
    search?: string;
    status?: string;
    order?: string;
};
type SearchBoxType = {
    checker?: boolean
    status?: boolean
}
export default function SearchBox({ checker, status }: SearchBoxType) {
    const [tags, setTags] = useState<{ name: string }[]>([])
    const { register, setValue, handleSubmit, watch } = useForm<SearchFormType>({
        defaultValues: {
            status: "false",
            order: "createdAt-DESC",
        },
    });
    const navigate = useNavigate();
    const { search } = useLocation()
    const searchUser = (form: SearchFormType) => {
        let newTags = ""
        for (const key in tags) {
            if (Number(key) + 1 === tags.length) {
                newTags = newTags + tags[key].name
            } else {
                newTags = newTags + tags[key].name + "-"
            }
        }
        const body = {
            ...form,
            tags: newTags
        }
        const url = "?" + new URLSearchParams(body);
        navigate(url);
    };
    const setQueryInput = (form: any) => {
        if (form?.search) setValue("search", form?.search)
        if (form?.status) setValue("status", form?.status)
        if (form?.order) setValue("order", form?.order)
        if (form?.tags) {
            const tagArry = form?.tags.split("-").map((i: any) => i = { name: i })
            setTags(tagArry)
        }
    }
    useEffect(() => {
        const query = queryString.parse(search)
        if (query) {
            setQueryInput(query)
        }
    }, [])
    const roleValue = watch("status");
    const orderValue = watch("order");
    return (
        <form className="w-full grid my-4 grid-cols-4 gap-3 items-center justify-center">
            <TagAutocomplete name="انتخاب دسته" setTags={setTags} tags={tags} />
            <TextField
                autoComplete="off"
                className="shadow-md"
                label={"جستجو..."}
                fullWidth
                {...register("search")}
            />
            {!checker && !status ? null :
                <TextField
                    fullWidth
                    autoComplete="off"
                    select
                    className="shadow-md"
                    label="وضعیت"
                    id="evaluationField"
                    value={roleValue}
                    onChange={(e) => setValue("status", e.target.value)}
                >
                    {status && dataStatus.map((i) => (
                        <MenuItem key={i.value} value={i.value}>{i.name}</MenuItem>
                    ))}
                    {checker && dataCheck.map((i) => (
                        <MenuItem key={i.value} value={i.value}>{i.name}</MenuItem>
                    ))}
                </TextField>
            }
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
                    className="w-1/2 !bg-gradient-to-tr to-slate-500 from-blue-500"
                    variant="contained"
                    onClick={handleSubmit(searchUser)}
                >
                    جستجو
                </Button>
            </div>
        </form>
    )
}
