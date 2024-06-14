import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type FormType = {
  password: string;
  phone: string;
  email: string;
  name: string;
};
export default function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormType>();
  const navigate = useNavigate();
  const loginHandler = (form: FormType) => {
    const url = isLogin ? "user" : "user/login";
    axios
      .post(url, form)
      .then(({ data }) => {
        const name = `خوش آمدید ${data?.name}`;
        navigate("/home/dashboard");
        toast.success(name);
      })
      .catch(({ response }) => {
        toast.warning(response?.data?.message);
      });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-5 w-1/3 rounded-md bg-gray-200 shadow-md">
        <div className="grid grid-cols-2 gap-2 mb-5 border-b border-b-gray-700 pb-5">
          <Button
            onClick={() => setIsLogin(false)}
            variant={!isLogin ? "contained" : "outlined"}
            color="info"
          >
            ورود
          </Button>
          <Button
            onClick={() => setIsLogin(true)}
            variant={isLogin ? "contained" : "outlined"}
            color="info"
          >
            ثبت نام
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="flex w-full flex-col gap-5"
        >
          <h1 className="text-center">ورود به پنل ادمین</h1>
          {isLogin && (
            <TextField
              autoSave="false"
              autoComplete="off"
              type="text"
              label={"نام خود را وارد کنید"}
              {...register("name", { required: isLogin })}
            />
          )}
          <TextField
            autoSave="false"
            autoComplete="off"
            type="text"
            label={"ایمیل خود را وارد کنید"}
            {...register("email", { required: true })}
          />
          {isLogin && (
            <TextField
              autoSave="false"
              autoComplete="off"
              type="text"
              label={"شماره تلفن خود را وارد کنید"}
              {...register("phone", { required: isLogin })}
              inputProps={{
                onKeyDown: (event) => {
                  const keyCode = event.keyCode || event.which;
                  const keyValue = String.fromCharCode(keyCode);
                  if (
                    keyCode !== 8 &&
                    keyCode !== 13 &&
                    !/^\d+$/.test(keyValue)
                  )
                    event.preventDefault();
                },
              }}
            />
          )}
          <TextField
            autoSave="false"
            autoComplete="off"
            type="password"
            label={"پسورد خود را وارد کنید"}
            {...register("password", { required: true })}
          />
          <Button type="submit" variant="contained" color="success">
            {isLogin ? "ثبت نام" : "ورود"}
          </Button>
        </form>
        <div></div>
      </div>
    </div>
  );
}
