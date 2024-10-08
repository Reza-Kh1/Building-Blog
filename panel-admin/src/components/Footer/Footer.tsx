import { useState } from "react";
import SelectMedia from "../SelectMedia/SelectMedia";
import { DataMediaType } from "../../type";
import { IconButton, TextField } from "@mui/material";
import { MdClose } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Footer() {
  const [logo, setLogo] = useState<DataMediaType | null>(null);
  const [text, setText] = useState<string>("");
  return (
    <div className="w-full p-2">
      <div className="flex items-center gap-5">
        <div className="w-1/2">
          <span className="mb-5 block font-semibold">متن توضیحات :</span>
          <TextField
            fullWidth
            autoComplete="off"
            className="shadow-md"
            label={"توضیحات بخش اول"}
            rows={6}
            onChange={({ target }) => setText(target.value)}
            value={text}
            multiline
          />
        </div>
        <div className="w-1/2">
          <span className="mb-5 block font-semibold">لوگو وبسایت :</span>
          {logo?.url && (
            <figure className="relative group w-1/3">
              <img
                src={logo?.url}
                alt={logo?.alt}
                className="shadow-md h-24 object-cover rounded-md mb-5 w-full"
              />
              <i
                onClick={() => setLogo(null)}
                className="absolute group-hover:opacity-100 opacity-0 top-1 text-xl right-1 bg-gray-800/70 p-1 rounded-full cursor-pointer text-white shadow-md"
              >
                <MdClose />
              </i>
              <span className="text-sm absolute left-0 bottom-0 w-full bg-black/70 text-gray-50 group-hover:opacity-100 opacity-0 transition-all rounded-md p-2">
                {logo?.alt}
              </span>
            </figure>
          )}
          <SelectMedia
            addMedia={(alt, img) => {
              setLogo({
                alt,
                url: img.url,
              });
            }}
          />
        </div>
      </div>
      <div className="w-full">
        <span className="my-5 block font-semibold">لینک های مفید :</span>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col">
            <span>بخش اول</span>
            <div className="bg-blue-100 mt-2 p-2 flex flex-col rounded-md justify-between shadow-md relative">
              <div className="flex justify-between items-center">
                <span>متن همراه</span>
                <IconButton color="success">
                  <FaRegPenToSquare />
                </IconButton>
              </div>
              <div className="flex justify-between items-center">
                <Link to={"#"} className="text-blue-400" target="_blank">
                  لینک
                </Link>
                <IconButton color="error">
                  <IoTrashBin />
                </IconButton>
              </div>
            </div>
          </div>
          <div>
            <span>بخش دوم</span>
            <div className="bg-blue-100 mt-2 p-2 flex flex-col rounded-md justify-between shadow-md relative">
              <div className="flex justify-between items-center">
                <span>متن همراه</span>
                <IconButton color="success">
                  <FaRegPenToSquare />
                </IconButton>
              </div>
              <div className="flex justify-between items-center">
                <Link to={"#"} className="text-blue-400" target="_blank">
                  لینک
                </Link>
                <IconButton color="error">
                  <IoTrashBin />
                </IconButton>
              </div>
            </div>
          </div>
          <div>
            <span>بخش سوم</span>
            <div className="bg-blue-100 mt-2 p-2 flex rounded-md justify-between shadow-md relative">
              <div className=" flex flex-col gap-3">
                <span>متن همراه</span>
                <Link to={"#"} className="text-blue-400" target="_blank">
                  لینک
                </Link>
              </div>
              <span className="flex flex-col ">
                <IconButton color="error">
                  <IoTrashBin />
                </IconButton>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
