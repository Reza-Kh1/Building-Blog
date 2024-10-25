"use client";
import CustomButton from "@/components/CustomButton/CustomButton";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa6";
import { TbReceipt2 } from "react-icons/tb";
import axios from "axios";
import InputForm from "@/components/InputForm/InputForm";
import ImgTag from "@/components/ImgTag/ImgTag";
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
export default function FormRequest() {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [mediaAry, setMediaArry] = useState<string[]>([]);
  const UploadMedia = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const newFile = event.target.files;
    if (!newFile?.length) return;
    const formData = new FormData();
    Array.from(newFile).forEach((file) => {
      formData.append("media/user", file);
    });

    const { data } = await axios.post("media", formData, {
      onUploadProgress: (event) => {
        if (event.lengthComputable && event.total) {
          const percentComplete = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgress(percentComplete);
        }
      },
    });

    console.log(data);
    // setMediaArry([...mediaAry,data])
  };
  const submitHandler = (form: FormData) => {
    const body = {
      name: form.get("name"),
      phone: form.get("phone"),
      type: form.get("type"),
      metragh: form.get("metragh"),
      price: form.get("price"),
      text: form.get("text"),
      src: [],
    };
    console.log(body);
  };
  return (
    <form action={submitHandler} className="flex flex-col gap-3">
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
        <div className="w-1/2">
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
            <i className="absolute flex items-center justify-center w-14 h-14 bg-green-500/80 hover:bg-orange-500 transition-all shadow-md border border-white text-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
           100%
            </i>
            {/* <i className="absolute p-3 bg-green-500/80 hover:bg-orange-500 transition-all shadow-md border border-white text-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FaUpload />
            </i> */}
          </label>
        </div>
        {/* <div className="w-1/2 grid grid-cols-5">
          {mediaAry.map((i, index) => (
            <ImgTag
              src={i}
              key={index}
              alt={"عکس آپلود شد"}
              width={300}
              height={300}
            />
          ))}
        </div> */}
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
