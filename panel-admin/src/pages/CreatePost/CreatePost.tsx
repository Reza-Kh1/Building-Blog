import { Button, Dialog, DialogActions, DialogContent, IconButton, MenuItem, TextField } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CategortType, FormPostType } from "../../type";
import { useEffect, useState } from "react";
import { fetchCategory } from "../../services/category";
import { FaFileUpload } from "react-icons/fa";
import UploadImage from "../../components/UploadImage/UploadImage";
import ShowImage from "../../components/ShowImage/ShowImage";
import { FaTrash } from "react-icons/fa6";

export default function CreatePost() {
    const { register, handleSubmit, watch, setValue } = useForm<FormPostType>({ defaultValues: { categoryId: 's', image: '' } });
    const categoryValue = watch("categoryId");
    const imageValue = watch("image");
    const queryClient = useQueryClient();
    const [open, setOpen] = useState<boolean>(false)
    const [upload, setUpload] = useState<string>("")
    const { data: dataCategory } = useQuery<CategortType[]>({
        initialData: () => queryClient.getQueryData(["getCategory"]),
        queryKey: ["getCategory"],
        queryFn: fetchCategory,
        staleTime: 1000 * 60 * 60 * 24
    });
    const createPost = (form: FormPostType) => {
        console.log(form);
    };

    useEffect(() => {
        if (categoryValue === undefined) {
            setValue("categoryId", "s");
        }
        if (imageValue === undefined) {
            setValue("image", "");
        }
    }, [categoryValue, imageValue, setValue]);

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(createPost)}>
                    <div className="grid grid-cols-[37%_37%_20%] gap-2 mt-3">
                        <TextField
                            autoComplete="off"
                            label={"نام پست"}
                            fullWidth
                            {...register("title")}
                        />
                        <TextField
                            autoComplete="off"
                            label={"اسلاگ"}
                            fullWidth
                            {...register("slug")}
                            helperText={"توجه داشته باشید که اسلاگ تکراری وارد نکنید!"}
                        />
                        {dataCategory?.length ? (
                            <TextField
                                autoComplete="off"
                                select
                                label="دسته پست"
                                id="evaluationField"
                                value={categoryValue || "s"}  // مقداردهی پیش‌فرض
                                onChange={({ target }) => setValue("categoryId", target.value)}
                            >
                                <MenuItem value={"s"}>
                                    انتخاب کنید
                                </MenuItem>
                                {dataCategory?.map((i) => (
                                    <MenuItem key={i.id} value={i.id}>
                                        {i.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : null}
                    </div>
                    <div className="flex mt-3  gap-3">
                        <div className="w-3/5">
                            <TextField
                                fullWidth
                                autoComplete="off"
                                className="shadow-md"
                                label={"توضیحات"}
                                rows={6}
                                multiline
                                {...register("description")}
                            />
                        </div>
                        <div className="w-2/5 flex flex-col gap-3  items-center">
                            {upload ?
                                <>
                                    <img className="w-3/4 object-contain h-full rounded-md shadow-md" src={upload} alt="" />
                                    <div className="flex justify-evenly">

                                        <IconButton color="error" onClick={() => setUpload("")}><FaTrash /></IconButton>
                                        <IconButton color="primary" onClick={() => setOpen(true)}><FaFileUpload /></IconButton>
                                    </div>
                                </>
                                :
                                <>
                                    <i
                                        onClick={() => setOpen(true)}
                                        className="w-full h-full bg-gray-50 border-black border-2 border-dashed rounded-md  flex justify-center items-center cursor-pointer"
                                    >
                                        <FaFileUpload className="text-gray-500 text-3xl" />
                                    </i>
                                    <span>آپلود عکس</span>
                                </>
                            }

                        </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Button color="success" variant="contained">
                            ذخیره اطلاعات
                        </Button>
                        <Button color="success" variant="contained">
                        </Button>
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            autoComplete="off"
                            className="shadow-md"
                            label={"توضیحات"}
                            rows={6}
                            multiline
                            {...register("description")}
                        />
                    </div>
                </form>
            </div>
            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogContent>
                    <ShowImage />
                </DialogContent>
                <DialogActions>
                    <div className="w-full items-end flex justify-between">
                        <div className="w-1/5 flex justify-center items-center flex-col gap-3">
                            <UploadImage setUpload={setUpload} setClose={setOpen} />
                            <span>آپلود عکس</span>
                        </div>
                        <Button className="!w-2/12 shadow-md" variant="contained" color="primary" onClick={() => setOpen(false)}>
                            بستن
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}