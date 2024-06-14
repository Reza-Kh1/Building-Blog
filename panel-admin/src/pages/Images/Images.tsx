import UploadImage from "../../components/UploadImage/UploadImage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaTrash } from "react-icons/fa6";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useState } from "react";
type AllImageType = {
  urls: string[];
  next: string | null;
};
const fetchImage = async () => {
  const { data } = await axios.get(`image`);
  return data;
};
export default function Images() {
  const query = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [viewImage, setViewImage] = useState<string>();
  const { data } = useQuery<AllImageType>({
    queryKey: ["allImage"],
    queryFn: fetchImage,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
  const deleteImage = (i: string) => {
    axios
      .delete(`image?url=${i}`)
      .then(() => {
        toast.success("عکس با موفقیت حذف شد");
        query.invalidateQueries({ queryKey: ["allImage"] });
      })
      .catch(() => {
        toast.warning("عکس حذف نشد");
      });
  };
  const loadImage = () => {
    console.log("iamge?next=" + data?.next);
  };
  return (
    <>
      <div>
        <span>افزودن عکس</span>
        <div className="w-1/12 mt-3">
          <UploadImage />
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-5 gap-5">
            {data?.urls?.length ? (
              data?.urls?.map((i, index) => (
                <figure key={index} className="relative h-52 group">
                  <img
                    src={i}
                    className="shadow-md rounded-md bg-cover w-full h-full"
                  />
                  <span
                    className="absolute bottom-2 cursor-pointer left-2"
                    onClick={() => deleteImage(i)}
                  >
                    <IconButton>
                      <FaTrash size={20} color="red" />
                    </IconButton>
                  </span>
                  <span
                    className="absolute transform bg-[#000000d4] p-3 rounded-full -translate-x-1/2  -translate-y-1/2  top-1/2 group-hover:inline hidden cursor-pointer left-1/2 "
                    onClick={() => {
                      setViewImage(i), setOpen(true);
                    }}
                  >
                    <FaEye size={35} color="white" />
                  </span>
                </figure>
              ))
            ) : (
              <span>هیچ عکسی آپلود نشده است.</span>
            )}
          </div>
          {data?.next && (
            <Button
              onClick={loadImage}
              color="success"
              className="!mt-5"
              variant="outlined"
            >
              بارگزاری بیشتر
            </Button>
          )}
        </div>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <figure>
            <img src={viewImage} className="shadow-md rounded-md" />
          </figure>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
