"use client";
import CustomButton from "@/components/CustomButton/CustomButton";
import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { TbReceipt2 } from "react-icons/tb";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import UploadImage from "@/components/UploadImage/UploadImage";
import actionProject from "@/action/actionProject";
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
const initialize = {
  msg: "",
  err: ""
}
export default function FormRequest() {
  const [mediaArry, setMediaArry] = useState<string[]>([]);
  const [state, formAction] = useFormState(actionProject, initialize)
  const [formValues, setFormValues] = useState({
    nameValue: "", phoneValue: "", metraghValue: "", priceValue: "", textValue: ""
  });
  if (state?.msg) {
    toast.dismiss("toast")
    toast.success("اطلاعات با موفقیت ارسال شد", { id: "toast" })
  }
  if (state?.err) {
    toast.dismiss("toast")
    toast.error("با خطا مواجه شدیم")
  }
  const changHandler = (formData: FormData) => {
    formData.append("mediaArry", JSON.stringify(mediaArry))
    formData.append("nameValue", JSON.stringify(formValues.nameValue))
    formData.append("phoneValue", JSON.stringify(formValues.phoneValue))
    formData.append("metraghValue", JSON.stringify(formValues.metraghValue.replace(/[^0-9]/g, "")))
    formData.append("priceValue", JSON.stringify(formValues.priceValue.replace(/[^0-9]/g, "")))
    formData.append("textValue", JSON.stringify(formValues.textValue))
    formAction(formData)
  }
  return (
    <form action={changHandler} onSubmit={() => { toast.loading("...صبرکنید", { id: "toast" }) }} className="" >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            نام*
          </label>
          <input
            title="name"
            onChange={({ target }) => setFormValues({ ...formValues, nameValue: target.value })}
            required
            name="name"
            className="p-3 focus-visible:outline-blue-300 bg-slate-100 rounded text-gray-900 w-full shadow-md"
            placeholder=""
            value={formValues.nameValue}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            شماره تلفن*
          </label>
          <input
            name="phone"
            onChange={({ target }) => setFormValues({ ...formValues, phoneValue: target.value.replace(/[^0-9]/g, "") })}
            required
            className="p-3 focus-visible:outline-blue-300 bg-slate-100 rounded text-gray-900 w-full shadow-md"
            placeholder="09390199977"
            value={formValues.phoneValue}
          />
        </div>
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
                name="subject"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            بودجه مورد نظر*
          </label>
          <div className="relative">
            <input
              onChange={({ target }) => {
                const test = target.value.replace(/[^0-9]/g, "");
                setFormValues({ ...formValues, priceValue: Number(test).toLocaleString() })
              }}
              name="price"
              required
              className="p-3 focus-visible:outline-blue-300 bg-slate-100 rounded text-gray-900 w-full shadow-md"
              placeholder="پر کردن این بخش الزامی نیست!"
              value={formValues.priceValue}
            />
            <span className="absolute left-2 text-xs top-1/2 bg-slate-100 h-[90%] flex items-center transform -translate-y-1/2">
              تومان
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            متراژ کار*
          </label>
          <div className="relative">
            <input
              onChange={({ target }) => {
                const test = target.value.replace(/[^0-9]/g, "");
                setFormValues({ ...formValues, metraghValue: Number(test).toLocaleString() })
              }}
              name="size"
              required
              className="p-3 focus-visible:outline-blue-300 bg-slate-100 rounded text-gray-900 w-full shadow-md"
              placeholder="پر کردن این بخش الزامی نیست!"
              value={formValues.metraghValue}
            />
            <span className="absolute left-2 text-xs top-1/2 bg-slate-100 h-[90%] flex items-center transform -translate-y-1/2">
              مترمربع
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 my-5">
        <label className="text-sm">
          توضیحات بیشتر*
        </label>
        <div className="relative">
          <textarea
            rows={6}
            name="text"
            onChange={({ target }) => setFormValues({ ...formValues, textValue: target.value })}
            required
            className="p-3 focus-visible:outline-blue-300 bg-slate-100 rounded text-gray-900 w-full shadow-md resize-none"
            placeholder="توضیح بیشتر مربوط به خواسته های خودتان"
            value={formValues.textValue}
          />
        </div>
      </div>
      <UploadImage mediaArry={mediaArry} setMediaArry={setMediaArry} />
      <CustomButton
        className="!w-1/2 sm:!w-1/4 !mt-5 md:!mt-10 !text-sm md:!text-base md:!w-2/12"
        name="درخواست قیمت"
        iconEnd={<TbReceipt2 size={20} />}
        type="submit"
      />
    </form >
  );
}
