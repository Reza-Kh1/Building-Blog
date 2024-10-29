import { Button, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  dataOrder,
  dataStatus,
  dataCheck,
  dataRole,
} from "../../data/selectData";
import TagAutocomplete from "../TagAutocomplete/TagAutocomplete";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { GrSearchAdvanced } from "react-icons/gr";
type SearchFormType = {
  search?: string;
  status?: string;
  order?: string;
  role?: string;
};
type SearchBoxType = {
  checker?: boolean;
  status?: boolean;
  notTag?: boolean;
  isUser?: boolean;
  notSearch?: boolean;
};
export default function SearchBox({
  checker,
  status,
  notTag,
  isUser,
  notSearch,
}: SearchBoxType) {
  const [tags, setTags] = useState<{ name: string }[]>([]);
  const { register, setValue, handleSubmit, watch } = useForm<SearchFormType>({
    defaultValues: {
      status: "all",
      order: "createdAt-DESC",
      role: "all",
    },
  });
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchUser = ({ status, ...other }: SearchFormType) => {
    let newTags = "";
    for (const key in tags) {
      if (Number(key) + 1 === tags.length) {
        newTags = newTags + tags[key].name;
      } else {
        newTags = newTags + tags[key].name + "-";
      }
    }
    const body = {
      page: 1,
      ...other,
      tags: newTags,
    } as any;
    if (status !== "all") body.status = status;
    const url = "?" + new URLSearchParams(body);
    navigate(url);
  };
  const setQueryInput = (form: any) => {
    if (form?.search) setValue("search", form?.search);
    if (form?.status) setValue("status", form?.status || "all");
    if (form?.order) setValue("order", form?.order);
    if (form?.tags) {
      const tagArry = form?.tags.split("-").map((i: any) => (i = { name: i }));
      setTags(tagArry);
    }
  };
  useEffect(() => {
    const query = queryString.parse(search);
    if (query) {
      setQueryInput(query);
    }
  }, []);
  const valueStatus = watch("status");
  const orderValue = watch("order");
  const valueUser = watch("role");
  return (
    <form className="w-full grid my-4 grid-cols-4 gap-3 items-center justify-center">
      {!notTag && (
        <TagAutocomplete name="انتخاب تگ" setTags={setTags} tags={tags} />
      )}
      {!notSearch && (
        <TextField
          autoComplete="off"
          className="shadow-md"
          label={"جستجو..."}
          fullWidth
          {...register("search")}
        />
      )}
      {isUser && (
        <TextField
          fullWidth
          autoComplete="off"
          select
          className="shadow-md"
          label="انتخاب سطح کاربری"
          id="evaluationField"
          value={valueUser}
          onChange={(e) => setValue("role", e.target.value)}
        >
          <MenuItem value={"all"}>نمایش همه</MenuItem>
          {dataRole?.map((i, index) => (
            <MenuItem key={index} value={i.value}>
              {i.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      {!checker && !status ? null : (
        <TextField
          fullWidth
          autoComplete="off"
          select
          className="shadow-md"
          label="وضعیت"
          id="evaluationField"
          value={valueStatus}
          onChange={(e) => setValue("status", e.target.value)}
        >
          {status &&
            dataStatus.map((i) => (
              <MenuItem key={i.value} value={i.value}>
                {i.name}
              </MenuItem>
            ))}
          {checker &&
            dataCheck.map((i) => (
              <MenuItem key={i.value} value={i.value}>
                {i.name}
              </MenuItem>
            ))}
        </TextField>
      )}
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
          endIcon={<GrSearchAdvanced />}
        >
          جستجو
        </Button>
      </div>
    </form>
  );
}
