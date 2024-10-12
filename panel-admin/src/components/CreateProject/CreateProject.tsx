import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { MdClose, MdDataSaverOn } from "react-icons/md";
import { fetchWorkerName } from "../../services/worker";
import { useQuery } from "@tanstack/react-query";
import SelectMedia from "../SelectMedia/SelectMedia";
import { useState } from "react";
import { DataMediaType } from "../../type";
import ImageComponent from "../ImageComponent/ImageComponent";
import { FaPenToSquare } from "react-icons/fa6";

export default function CreateProject() {
  const { register, setValue, handleSubmit, watch } = useForm<any>({
    defaultValues: {
      workerId: 0,
      order: "createdAt-DESC",
    },
  });
  const { data, error, isLoading } = useQuery({
    queryKey: ["workerName"],
    queryFn: fetchWorkerName,
  });
  const [image, setImage] = useState<DataMediaType | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [editImg, setEditImg] = useState<DataMediaType | null>(null);
  const [galleryProject, setGalleryProject] = useState<DataMediaType[] | []>(
    []
  );

  const submitHandler = (form) => {
    console.log(form);
  };
  const nameWorker = watch("workerId");
  return (
    <>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex gap-3 items-center">
          <TextField
            fullWidth
            autoComplete="off"
            autoSave="off"
            className="shadow-md"
            label={"نام"}
            {...register("name", { required: true })}
          />
          <FormControl fullWidth className="shadow-md">
            <InputLabel id="demo-simple-select-label">نام متخصص</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="نام متخصص"
              value={nameWorker}
              onChange={(e) => setValue("workerId", e.target.value)}
            >
              <MenuItem value={0}>انتخاب کنید</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex gap-3 items-center">
          <TextField
            multiline
            rows={6}
            autoComplete="off"
            className="shadow-md w-1/2"
            label={"توضیحات"}
            {...register("description", { required: true })}
          />
          <div className="flex">
            <div className="flex flex-col w-1/2 gap-3">
              <span>تصویر پروژه</span>
              <SelectMedia
                addMedia={(alt, image) => setImage({ alt, url: image.url })}
              />
            </div>
            <div className="w-1/2">
              <ImageComponent
                deleteHandler={() => setImage(null)}
                img={image}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 ">
          <TextField
            multiline
            rows={6}
            autoComplete="off"
            className="shadow-md w-1/3"
            label={"آدرس"}
            {...register("address", { required: true })}
          />
          <div className="flex w-2/3">
            <div className="flex flex-col w-1/3 gap-3">
              <span>گالری پروژه</span>
              <SelectMedia
                addMedia={(alt, image) => {
                  const newGallery = [
                    ...galleryProject,
                    { alt, url: image.url },
                  ];
                  setGalleryProject(newGallery);
                }}
              />
            </div>
            <div className="w-2/3 grid grid-cols-3 gap-3">
              {galleryProject.map((i, index) => (
                <ImageComponent
                  key={index}
                  img={i}
                  editHandler={({ url, alt }) => {
                    setOpen(true);
                    setEditImg({ url, alt });
                  }}
                  deleteHandler={(img) => {
                    const newDetail = galleryProject.filter((i) => {
                      return i.url !== img.url;
                    });
                    setGalleryProject(newDetail);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          endIcon={<MdDataSaverOn />}
          color="success"
          variant="contained"
        >
          ذخیره کردن اطلاعات
        </Button>
      </form>
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
            const newArry = galleryProject.map((i) => {
              if (i.url === editImg?.url) {
                i.alt = alt;
                i.url = src;
              }
              return i;
            });
            setGalleryProject(newArry);
            setOpen(false);
          },
        }}
      >
        <DialogTitle>ویرایش عکس</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            defaultValue={editImg?.url}
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
            defaultValue={editImg?.alt}
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
    </>
  );
}
