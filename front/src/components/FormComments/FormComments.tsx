"use client";
import React from "react";
import InputForm from "../InputForm/InputForm";
import { fetchApi } from "@/action/fetchApi";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import actionComments from "@/action/actionComments";
import CustomButton from "../CustomButton/CustomButton";
import { TbMessage2Plus } from "react-icons/tb";
const initialize = {
  msg: "",
  err: "",
};
export default function FormComments({ postId }: { postId?: number }) {
  const [state, formAction] = useFormState(actionComments, initialize);
  if (state.msg) {
    toast.dismiss("toast");
    toast.success("پس از تایید نمایش داده میشود", { id: "toast" });
  }
  if (state.err) {
    toast.dismiss("toast");
    toast.error("با خطا مواجه شدیم");
  }
  const commentsHandler = async (form: FormData) => {
    form.append("postId", JSON.stringify(postId));
    formAction(form);
  };
  return (
    <div className="form-comments" id="form-comments">
      <h5 className="text-xl mb-3">
        <span className="text-[#58b2e9]">کامنت</span> خود را ثبت کنید.
      </h5>
      <form
        action={commentsHandler}
        onSubmit={() => {
          toast.loading("...صبر کنید", { id: "toast" });
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex justify-between items-center gap-3">
          <div>
            <span className="text-sm mb-1 inline-block">نام :*</span>
            <InputForm type="text" name="name" placeholder="نام" required />
          </div>
          <div>
            <span className="text-sm mb-1 inline-block">شماره تلفن :*</span>
            <InputForm
              type="text"
              name="phone"
              placeholder="شماره تلفن"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              required
            />
          </div>
          <div>
            <span className="text-sm mb-1 inline-block">ایمیل :</span>
            <InputForm type="email" name="email" placeholder="ایمیل" />
          </div>
        </div>
        <div>
          <span className="text-sm mb-1 inline-block">
            کامنت خود را ثبت کنید :*
          </span>
          <textarea
            name="text"
            rows={8}
            required
            className="bg-slate-100 w-full shadow-md focus-visible:outline-blue-300 resize-none p-2 rounded-md"
            id=""
            placeholder="نظر خودتان را بنویسید"
          />
        </div>
        <div>
          <CustomButton
            name="ارسال"
            className="w-1/4"
            type="submit"
            color="blue"
            iconEnd={<TbMessage2Plus />}
          />
        </div>
      </form>
    </div>
  );
}
