import { useState } from "react";
import SelectMedia from "../SelectMedia/SelectMedia";
import { DataMediaType } from "../../type";
import { Button, IconButton, TextField } from "@mui/material";
import { MdClose, MdDataSaverOn } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BiSolidShare } from "react-icons/bi";
type MenuFooterType = {
  link: string;
  name: string;
  id: number
}[]
const dataMenuFooter = [
  [
    { id: 1, link: "", name: "" }
  ], [
    { id: 12, link: "", name: "" }
  ], [
    { id: 13, link: "", name: "" }
  ]
]
export default function Footer() {
  const [logo, setLogo] = useState<DataMediaType | null>(null);
  const [text, setText] = useState<string>("");
  const [menuFooter, setMenuFooter] = useState<MenuFooterType[]>(dataMenuFooter)
  const deleteBtn = (id: number, index: number) => {
    const newMenu = menuFooter.map((item, ind) => {
      if (index === ind) {
        item = item.filter((i) => i.id !== id)
      }
      return item
    })
    setMenuFooter(newMenu)
  }
  const addBtn = (index: number) => {
    const newMenu = menuFooter.map((item, ind) => {
      if (index === ind) {
        item.push({
          id: Math.floor(Math.random() * 1000),
          link: "",
          name: ""
        })
      }
      return item
    })
    setMenuFooter(newMenu)
  }
  const saveHandler = () => {
    const body = {
      logoUrl: logo,
      text: text,
      menuLink: menuFooter
    }
    console.log(body);
  }
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
          <SelectMedia
            addMedia={(alt, img) => {
              setLogo({
                alt,
                url: img.url,
              });
            }}
          />
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
        </div>
      </div>
      <div className="w-full">
        <span className="my-5 block font-semibold">لینک های مفید :</span>
        <div className="flex flex-col">
          {menuFooter?.map((i, index) => (
            <div className="mb-5" key={index}>
              <span>بخش {index === 0 ? "اول" : index === 1 ? "دوم" : "سوم"}</span>
              {
                i.map((item, key) => (
                  <div key={key} className="my-2 flex gap-5">
                    <div className="flex gap-3 items-center">
                      <IconButton
                        disabled={i.length > 4}
                        onClick={() => addBtn(index)}
                        className={`${i.length > 4 ? "!bg-slate-200" : "!bg-slate-700"} text-xl  !shadow-md hover:!text-gray-700 hover:!bg-gray-400 transition-all p-3 !text-white`}
                      >
                        <i>
                          <FaPlus />
                        </i>
                      </IconButton>
                      <IconButton
                        disabled={i.length == 1}
                        onClick={() => deleteBtn(item.id, index)}
                        className={`${i.length == 1 ? "!bg-red-200" : "!bg-red-700"} text-xl  !shadow-md hover:!text-red-700 hover:!bg-gray-300 transition-all p-3 !text-white`}
                      >
                        <i>
                          <MdClose />
                        </i>
                      </IconButton>
                    </div>
                    <div className="flex w-3/4 items-center gap-5">
                      <TextField
                        fullWidth
                        autoComplete="off"
                        className="shadow-md"
                        label={"نام صفحه"}
                        value={menuFooter[index][key].name}
                        onChange={({ target }) => {
                          const newMenu = menuFooter.map((maper, ind) => {
                            if (index === ind) {
                              maper.map((i) => {
                                if (i.id === item.id) {
                                  i.name = target.value
                                }
                                return i
                              })
                            }
                            return maper
                          })
                          setMenuFooter(newMenu)
                        }}
                      />
                      <TextField
                        fullWidth
                        autoComplete="off"
                        className="shadow-md"
                        label={"آدرس صفحه"}
                        value={menuFooter[index][key].link}
                        onChange={({ target }) => {
                          const newMenu = menuFooter.map((maper, ind) => {
                            if (index === ind) {
                              maper.map((i) => {
                                if (i.id === item.id) {
                                  i.link = target.value
                                }
                                return i
                              })
                            }
                            return maper
                          })
                          setMenuFooter(newMenu)
                        }}
                      />
                      <Link to={import.meta.env.VITE_PUBLIC_URL_SITE + item.link} target="_blank">
                        <IconButton color="success" className="text-xl !bg-blue-500 !shadow-md hover:!text-green-700 hover:!bg-gray-300 transition-all p-3 !text-white">
                          <BiSolidShare />
                        </IconButton>
                      </Link>
                    </div>
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button
          onClick={saveHandler}
          className=""
          endIcon={<MdDataSaverOn />}
          color="success"
          variant="contained"
        >
          ذخیره کردن اطلاعات
        </Button>
      </div>
    </div>
  );
}
