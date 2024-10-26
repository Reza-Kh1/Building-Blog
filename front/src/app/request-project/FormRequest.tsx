"use client";
import CustomButton from "@/components/CustomButton/CustomButton";
import { Autocomplete, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { FaTrashCanArrowUp, FaUpload } from "react-icons/fa6";
import { TbReceipt2 } from "react-icons/tb";
import axios from "axios";
import InputForm from "@/components/InputForm/InputForm";
import ImgTag from "@/components/ImgTag/ImgTag";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
const options = [
  "لوله کشی گاز",
  "کناف",
  "گچ کاری",
  "برق کاری",
  "خراب کاری",
  "کابینت",
  "سقف کاذب",
  "لوله کشی آب",
  "نقاشی",
  "درب و پنجره",
  "کانال کولر",
  "شومینه",
  "موتور خانه",
  "کاشی کاری",
  "دیوارکشی",
  "طراحی (اتوکد)",
  "تمیز کردن",
  "آهنگری",
  "مشاوره",
];
const submitHandler = async (formData: FormData, mediaArry) => {
  // const body = {
  //   name: formData.get("name"),
  //   phone: formData.get("phone"),
  //   type: formData.get("type"),
  //   metragh: formData.get("metragh"),
  //   price: formData.get("price"),
  //   text: formData.get("text"),
  //   src: [],
  // };
  console.log(formData, mediaArry);

}
const initialize = {
  msg: "",
  err: ""
}
export default function FormRequest() {
  const [progress, setProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mediaArry, setMediaArry] = useState<string[]>([]);
  const [state, formAction] = useFormState(submitHandler, initialize)
  const deleteImage = (src: string) => {
    const newImages = mediaArry.filter((item) => item !== src)
    setMediaArry(newImages)
  }
  const UploadMedia = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let resultSize = 0
    const maxSize = 10 * 1024 * 1024
    const newFile = event.target.files;
    if (!newFile?.length) return;
    const formData = new FormData();
    Array.from(newFile).forEach((file) => {
      resultSize = resultSize + file.size
      formData.append("media", file);
    });
    if (resultSize > maxSize) {
      setProgress(null);
      return toast.error("!حجم فایل نباید بیش از 10 مگابایت باشد")
    }
    const uploadPromise = async () => {
      const { data } = await axios.post("media/user", formData, {
        onUploadProgress: (event) => {
          if (event.lengthComputable && event.total) {
            const percentComplete = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress(percentComplete);
          }
        },
      })
      const getUrl = data.url.map((i: any) => i.url)
      setMediaArry([...mediaArry, ...getUrl])
      setProgress(null)
    }
    toast.promise(uploadPromise(), {
      loading: "...درحال آپلود",
      error: "با خطا مواجه شدیم",
      success: "با موفقیت آپلود شد"
    }, { position: "bottom-center" })
  };
  return (
    <form onSubmit={(e) => { e.preventDefault(); formAction( mediaArry) }} className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        <InputForm name="name" lable="نام " required type="text" />
        <InputForm
          name="phone"
          lable="شماره تلفن "
          required
          type="text"
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
        />
        <div>
          <span className="text-sm">انتخاب موضوع :*</span>
          <Autocomplete
            freeSolo
            className="flex items-end mt-1"
            options={options}
            renderInput={(params) => (
              <TextField
                className="!bg-slate-100 !p-2  !shadow-md !rounded-md"
                variant="standard"
                required
                placeholder="انتخاب کنید"
                {...params}
                name="type"
              />
            )}
          />
        </div>
        <InputForm
          name="price"
          lable="بودجه مورد نظر "
          onChange={(e) => {
            const test = e.target.value.replace(/[^0-9]/g, "");
            e.target.value = Number(test).toLocaleString();
          }}
          placeholder="پر کردن این بخش الزامی نیست!"
          type="text"
          slotProps="تومان"
        />
        <InputForm
          name="metragh"
          lable="متراژ کار "
          onChange={(e) => {
            const test = e.target.value.replace(/[^0-9]/g, "");
            e.target.value = Number(test).toLocaleString();
          }}
          placeholder="پر کردن این بخش الزامی نیست!"
          type="text"
          slotProps="متر مربع"
        />
      </div>
      <InputForm
        rows={10}
        name="text"
        lable="توضیحات بیشتر"
        required
        type="textarea"
      />
      <div className="flex gap-5">
        <div className="w-1/3">
          <span className="block mb-3">عکس های خود را آپلود کنید</span>
          <label
            htmlFor="upload"
            className="w-1/3 h-32 cursor-pointer bg-blue-200/80 block rounded-md shadow-md relative"
          >
            <input
              onChange={UploadMedia}
              type="file"
              multiple
              placeholder="upload"
              id="upload"
              hidden
            />
            {progress ?
              <i className="absolute flex items-center justify-center w-14 h-14 bg-green-500/80 hover:bg-orange-500 transition-all shadow-md border border-white text-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {progress}%
              </i>
              :
              <i className="absolute p-3 bg-green-500/80 hover:bg-orange-500 transition-all shadow-md border border-white text-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaUpload />
              </i>
            }
          </label>
        </div>
        <div className="w-2/3 grid gap-4 grid-cols-4">
          {mediaArry.map((i, index) => (
            <div key={index} className="relative">
              <ImgTag
                figureClass="w-full h-full"
                src={i}
                className="object-cover w-full h-full shadow-md rounded-md p-1"
                alt={"عکس آپلود شد"}
                width={300}
                height={300}
              />
              <i onClick={() => deleteImage(i)} className="absolute left-3 top-3 bg-slate-400/80 rounded-full ">
                <IconButton color="error" size="small">
                  <FaTrashCanArrowUp />
                </IconButton>
              </i>
            </div>
          ))}
        </div>
      </div>
      <CustomButton
        className="w-2/12"
        name="درخواست قیمت"
        iconEnd={<TbReceipt2 size={20} />}
        type="submit"
      />
    </form>
  );
}
