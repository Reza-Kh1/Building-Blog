import { Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaHashtag, FaPen, FaTrash } from "react-icons/fa6";
import { fetchTags } from "../../services/tag";
import { toast } from "react-toastify";
import LoadingFetch from "../../components/LoadingFetch/LoadingFetch";
import PendingApi from "../../components/PendingApi/PendingApi";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
type TagsType = {
    count: number
    rows: {
        id: number
        name: string
    }[]
}
export default function Tags() {
    const [valueTag, setValueTag] = useState<string>("")
    const query = useQueryClient();
    const { data } = useQuery<TagsType>({
        queryKey: ["tagsName"],
        queryFn: fetchTags,
    });
    const { mutate: createTag, isPending: pendingcreate } = useMutation({
        mutationFn: () => {
            return axios.post("tag", { name: valueTag });
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["tagsName"] });
            setValueTag("")
            toast.success("تگ جدید ایجاد شد");
        },
        onError: (err: any) => {
            // toast.warning("با خطا مواجه شدیم");
            toast.warning(err.response.data.message);
            console.log(err);
        },
    });
    const { mutate: deleteTag, isPending: pendingdelete } = useMutation({
        mutationFn: (id: number) => {
            return axios.delete(`tag/${id}`);
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["tagsName"] });
            toast.info("تگ حذف شد");
        },
        onError: (err: any) => {
            // toast.warning("با خطا مواجه شدیم");
            toast.warning(err.response.data.message);
            console.log(err);
        },
    });
    const { mutate: updatetag, isPending: pendingupate } = useMutation({
        mutationFn: () => {
            return axios.post("tag", { name: valueTag });
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["tagsName"] });
            toast.success("تگ جدید ایجاد شد");
        },
        onError: (err: any) => {
            // toast.warning("با خطا مواجه شدیم");
            toast.warning(err.response.data.message);
            console.log(err);
        },
    });
    return (
        <div className="w-full">

            {pendingcreate || pendingdelete || pendingupate ? <PendingApi /> : null}
            <h1 className="w-full p-2 rounded-md shadow-md bg-blue-400 text-gray-50">
                افزودن تگ
            </h1>
            <div className="flex gap-3 my-3 items-center justify-between">
                <TextField
                    className="shadow-md w-1/3"
                    autoComplete="off"
                    label={"نام تگ"}
                    value={valueTag}
                    onChange={({ target }) => setValueTag(target.value)}
                />
                <Button
                    endIcon={<FaHashtag />}
                    color="warning"
                    className="w-1/5"
                    onClick={() => createTag()}
                    variant="contained"
                    disabled={pendingcreate || valueTag.length ? false : true}
                >
                    ایجاد تگ
                </Button>
            </div>
            <div className="">
                {data?.count ?
                    (
                        <div className="w-ful grid gap-3 grid-cols-5">
                            {data.rows.map((i, index) => (
                                <div key={index} className="shadow-md border rounded-md p-3">
                                    <span className="text-center block">
                                        {i.name}
                                    </span>
                                    <div className="w-full mt-2 gap-3 flex justify-evenly">
                                        <Button
                                            size="small"
                                            fullWidth
                                            endIcon={<FaPen />}
                                            color="success"
                                            onClick={() => createTag()}
                                            variant="contained"
                                            disabled={pendingupate}
                                        >
                                            ویرایش
                                        </Button>
                                        <Button
                                            disabled={pendingdelete}
                                            size="small"
                                            fullWidth
                                            endIcon={<FaTrash />}
                                            color="error"
                                            onClick={() => deleteTag(i.id)}
                                            variant="contained"
                                        >
                                            حذف
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                    :
                    <span>هیچ تگی ایجاد نشده است!</span>
                }
            </div>
        </div >
    )
}
