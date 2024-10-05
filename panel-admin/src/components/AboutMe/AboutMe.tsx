import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { MdDataSaverOn } from "react-icons/md";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type ImgArryType = {
  url: string;
  alt: string;
};
export default function AboutMe() {
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const [textArry, setTextArry] = useState([{ id: 1, text: "" }]);
  const [imgArry, setImgArry] = useState<ImgArryType[]>([]);
  const [imageDetail, setImageDetail] = useState<ImgArryType>();
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
  const addImage = () => {
    const newArry = {
      alt: imageDetail.alt,
      url: imageDetail.url,
    };
    setImgArry((prev) => [...prev, newArry]);
  };
  const deleteImageHandler = (url: string) => {
    const newDetail = imgArry.filter((i) => {
      i.url !== url;
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
    <div>
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
          <Button onClick={() => setOpen(true)}>انتخاب تصاویر</Button>
          <div className="grid grid-cols-3 mt-5 gap-3">
            {imgArry.map((i, index) => (
              <div key={index} className="relative group">
                <img
                  src="/notfound.webp"
                  alt=""
                  className="shadow-md rounded-md"
                />
                <i
                  onClick={() => deleteImageHandler(i.url)}
                  className="absolute group-hover:opacity-100 opacity-0 top-1 text-xl right-1 bg-gray-800/70 p-1 rounded-full cursor-pointer text-white shadow-md"
                >
                  <MdClose />
                </i>
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
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <div className="p-2 w-full">
            <TextField
              fullWidth
              autoComplete="off"
              className="shadow-md"
              label={"عنوان تصویر"}
              value={imageDetail?.alt}
              onChange={({ target }) =>
                setImageDetail({ ...imageDetail, alt: target.value })
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex w-full items-center justify-between">
            <Button
              onClick={addImage}
              variant="contained"
              color="success"
              endIcon={<MdDataSaverOn />}
            >
              ذخیره
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="error"
              endIcon={<MdClose />}
            >
              بستن
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
