import { Button, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { MdClose } from 'react-icons/md';
import { MdDataSaverOn } from "react-icons/md";

export default function AboutMe() {
    const { register, handleSubmit, watch, setValue, getValues } = useForm();
    const selectImageHandler = () => {

    }
    const deleteImageHandler = () => {

    }
    return (
        <div>
            <span className="mb-4 block font-semibold">
                بخش اول :
            </span>
            <div className="flex gap-7 mb-5">
                <div className="flex flex-col w-1/2 gap-5">
                    <TextField
                        fullWidth
                        autoComplete="off"
                        className="shadow-md"
                        label={"عنوان بخش اول"}
                        {...register("description")}
                    />
                    <TextField
                        fullWidth
                        autoComplete="off"
                        className="shadow-md"
                        label={"توضیحات بخش اول"}
                        rows={6}
                        multiline
                        {...register("description")}
                    />
                </div>
                <div className="w-1/2">
                    <Button onClick={selectImageHandler}>
                        انتخاب تصاویر
                    </Button>
                    <div className="grid grid-cols-3 mt-5 gap-3">
                        <div className='relative group'>
                            <img src="/notfound.webp" alt="" className="shadow-md rounded-md" />
                            <i onClick={deleteImageHandler} className='absolute group-hover:opacity-100 opacity-0 top-1 text-xl right-1 bg-gray-800/70 p-1 rounded-full cursor-pointer text-white shadow-md'><MdClose /></i>
                        </div>
                    </div>
                </div>
            </div>
            <span className="mb-4 block font-semibold">
                بخش دوم :
            </span>
            <div className="flex gap-6">
                <TextField
                    fullWidth
                    autoComplete="off"
                    className="shadow-md"
                    label={"عنوان بخش دوم"}
                    {...register("description")}
                />
                <TextField
                    fullWidth
                    autoComplete="off"
                    className="shadow-md"
                    label={"متن همراه عنوان"}
                    {...register("description")}
                />
            </div>
            <div className="flex gap-4 items-center my-5">
                {/* className="text-xl bg-slate-700 shadow-md cursor-pointer hover:text-gray-700 hover:bg-gray-400 transition-all p-3 text-white rounded-full" */}
                <IconButton className="text-xl !bg-slate-700 !shadow-md hover:!text-gray-700 hover:!bg-gray-400 transition-all p-3 !text-white">
                    <i className=""><FaPlus /></i>
                </IconButton>
                <TextField
                    fullWidth
                    autoComplete="off"
                    className="shadow-md"
                    label={"افزودن متن"}
                    {...register("description")}
                />
            </div>
            <Button className="" endIcon={<MdDataSaverOn />} color="success" variant="contained">
                ذخیره کردن اطلاعات
            </Button>
        </div>
    )
}
