"use client";
import { fetchApi } from "@/action/fetchApi";
import CustomButton from "@/components/CustomButton/CustomButton";
import InputForm from "@/components/InputForm/InputForm";
import React from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
const submitHandler = async (prevState: any, formData: FormData) => {
  const body = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    text: formData.get("text"),
  };
  const res = () => fetchApi({ url: "message", method: "POST", body });
  toast.promise(res(), {
    loading: "...صبر کنید",
    success: <b>پیام شما با موفقیت ثبت شد</b>,
    error: <b>خطایی رخ داد دوباره تلاش کنید!</b>,
  });
  return {
    msg: "ok",
  };
};
export default function FormContactUs() {
  const [state, formAction] = useFormState(submitHandler, { msg: "" });
  return (
    <form action={formAction} className="flex flex-col gap-3 justify-center">
      <div className="grid grid-cols-2 gap-3">
        <InputForm
          name="name"
          lable="نام کامل خود را بنویسید"
          id="name"
          placeholder="نام کامل خود را بنویسید"
          type="text"
          required
        />
        <InputForm
          name="phone"
          id="phone"
          lable="شماره تلفن"
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
          placeholder="********0912"
          type="text"
          required
        />
      </div>
      <InputForm
        name="subject"
        id="subject"
        lable="موضوع"
        placeholder="موضوع خود را بنویسید."
        type="text"
        required
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="text" className="text-sm">
          متن خود را بنویسید:
        </label>
        <textarea
          rows={6}
          id="text"
          wrap="6"
          required
          className="p-3 focus-visible:outline-blue-300 bg-slate-100 rounded text-gray-900 w-full shadow-md resize-none"
          name="text"
          placeholder="کامنت خود را ثبت کنید"
        />
      </div>
      <div className="w-1/4">
        <CustomButton name="ارسال" className="w-full" type="submit" />
      </div>
    </form>
  );
}
