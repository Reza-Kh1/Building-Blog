import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
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
        <div className="flex w-full flex-col gap-5">
          <h1 className="text-center">
            ورود به پنل ادمین
          </h1>
          <TextField
            autoSave="false"
            autoComplete="off"
            type="text"
            label={"ایمیل خود را وارد کنید"}
          />
          {isLogin && (
            <TextField
              autoSave="false"
              autoComplete="off"
              type="text"
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
              label={"شماره تلفن خود را وارد کنید"}
            />
          )}
          <TextField
            autoSave="false"
            autoComplete="off"
            type="password"
            label={"پسورد خود را وارد کنید"}
          />
          <Button variant="contained" color="success">
            {isLogin ? "ثبت نام" : "ورود"}
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
