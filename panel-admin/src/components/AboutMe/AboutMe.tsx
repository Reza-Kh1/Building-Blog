import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import { MdClose, MdPending } from "react-icons/md";
import { MdDataSaverOn } from "react-icons/md";
import SelectMedia from "../SelectMedia/SelectMedia";
type ImgArryType = {
  url: string;
  alt: string;
};
export default function AboutMe() {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [editImage, setEditImage] = useState<ImgArryType>();
  const [textArry, setTextArry] = useState([{ id: 1, text: "" }]);
  const [imgArry, setImgArry] = useState<ImgArryType[]>([]);
  const addBtn = () => {
    const number = Math.floor(Math.random() * 1000);
    const newArry = {
      id: number,
      text: "",
    };
    setTextArry((prev) => [...prev, newArry]);
  };
  const deleteBtn = (id: Number) => {
    const newFilter = textArry.filter((number) => number.id !== id);
    setTextArry(newFilter);
  };
  const editImageHandler = (img: ImgArryType) => {
    setOpen(true);
    setEditImage({ url: img.url, alt: img.alt });
  };
  const deleteImageHandler = (url: string) => {
    const newDetail = imgArry.filter((i) => {
      return i.url !== url;
    });
    setImgArry(newDetail);
  };
  const submitHandler = (form: any) => {
    console.log(form);
    const body = {
      title1: form.title1,
      text1: form.text1,
      title2: form.title2,
      text2: form.text2,
      textArry: textArry,
    };
    console.log(body);
  };
  return (
    <div className="w-full p-2">
      <span className="mb-4 block font-semibold">بخش اول :</span>
      <div className="flex gap-7 mb-5">
        <div className="flex flex-col w-1/2 gap-5">
          <TextField
            fullWidth
            autoComplete="off"
            className="shadow-md"
            label={"عنوان بخش اول"}
            {...register("title1")}
          />
          <TextField
            fullWidth
            autoComplete="off"
            className="shadow-md"
            label={"توضیحات بخش اول"}
            rows={6}
            multiline
            {...register("text1")}
          />
        </div>
        <div className="w-1/2">
          <SelectMedia
            addMedia={(alt, img) =>
              setImgArry([...imgArry, { url: img.url, alt }])
            }
          />
          <div className="grid grid-cols-3 mt-5 gap-3">
            {imgArry.map((i, index) => (
              <div key={index} className="relative group">
                <img src={i.url} alt={i.alt} className="shadow-md rounded-md w-full h-48 object-cover" />
                <i
                  onClick={() => deleteImageHandler(i.url)}
                  className="absolute group-hover:opacity-100 opacity-0 top-1 text-xl right-1 bg-gray-800/70 p-1 rounded-full cursor-pointer text-white shadow-md"
                >
                  <MdClose />
                </i>
                <i
                  onClick={() => editImageHandler(i)}
                  className="absolute group-hover:opacity-100 opacity-0 top-1 text-xl left-1 bg-gray-800/70 p-1 rounded-full cursor-pointer text-white shadow-md"
                >
                  <MdPending />
                </i>
                <span className="text-sm absolute left-0 bottom-0 w-full bg-black/70 text-gray-50 group-hover:opacity-100 opacity-0 transition-all rounded-md p-2">
                  {i.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="mb-4 block font-semibold">بخش دوم :</span>
      <div className="flex gap-6">
        <TextField
          fullWidth
          autoComplete="off"
          className="shadow-md"
          label={"عنوان بخش دوم"}
          {...register("title2")}
        />
        <TextField
          fullWidth
          autoComplete="off"
          className="shadow-md"
          label={"متن همراه عنوان"}
          {...register("text2")}
        />
      </div>
      <div className="flex flex-col gap-4 items-center my-5">
        {textArry.map((i, index) => (
          <div className="flex w-full gap-3 items-center" key={index}>
            <IconButton
              onClick={addBtn}
              className="text-xl !bg-slate-700 !shadow-md hover:!text-gray-700 hover:!bg-gray-400 transition-all p-3 !text-white"
            >
              <i>
                <FaPlus />
              </i>
            </IconButton>
            {i.id === 1 ? null : (
              <IconButton
                onClick={() => deleteBtn(i.id)}
                className="text-xl !bg-red-700 !shadow-md hover:!text-gray-700 hover:!bg-gray-400 transition-all p-3 !text-white"
              >
                <i>
                  <MdClose />
                </i>
              </IconButton>
            )}
            <TextField
              fullWidth
              autoComplete="off"
              className="shadow-md"
              label={"افزودن متن"}
              value={i.text}
              onChange={({ target }) => {
                const omal = textArry.map((num) => {
                  if (num.id === i.id) {
                    num.text = target.value;
                  }
                  return num;
                });
                setTextArry(omal);
              }}
            />
          </div>
        ))}
      </div>
      <Button
        onClick={handleSubmit((data) => submitHandler(data))}
        className=""
        endIcon={<MdDataSaverOn />}
        color="success"
        variant="contained"
      >
        ذخیره کردن اطلاعات
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const alt = formJson.alt;
            const src = formJson.image;
            const newArry = imgArry.map((i) => {
              if (i.url === editImage?.url) {
                i.alt = alt;
                i.url = src;
              }
              return i;
            });
            setImgArry(newArry);
            setOpen(false);
          },
        }}
      >
        <DialogTitle>ویرایش عکس</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            defaultValue={editImage?.url}
            id="image"
            name="image"
            label="آدرس عکس"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="false"
            autoSave="false"
          />
          <TextField
            autoFocus
            defaultValue={editImage?.alt}
            margin="dense"
            id="alt"
            autoComplete="false"
            autoSave="false"
            name="alt"
            label="ویرایش عنوان"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <div className="flex justify-between items-center w-full">
            <Button
              type="submit"
              color="success"
              variant="contained"
              endIcon={<FaPenToSquare />}
            >
              ذخیره
            </Button>
            <Button
              color="error"
              variant="contained"
              endIcon={<MdClose />}
              onClick={() => setOpen(false)}
            >
              بستن
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
