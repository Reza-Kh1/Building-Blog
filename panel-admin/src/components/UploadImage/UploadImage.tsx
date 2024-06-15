import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";
type UploadImageType = {
  setUpload?: (value: string) => void;
};
export default function UploadImage({ setUpload }: UploadImageType) {
  const query = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const uploadImage = useMutation({
    mutationFn: (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFile = event.target.files;
      if (!newFile) return Promise.reject(new Error("هیچ عکسی انتخاب نشده"))
      if (newFile[0].size > 3000000) {
        return Promise.reject(new Error("حجم عکس زیر 5 مگابایت باشد"))
      }
      const formData = new FormData();
      for (let file of newFile) {
        formData.append("image", file);
      }
      setLoading(true);
      return axios.post("image", formData)
    },
    onSuccess: () => {
      toast.success("عکس با موفقیت افزوده شد");
      query.invalidateQueries({ queryKey: ["allImage"] });
      setLoading(false)
    },
    onError: (err) => {
      toast.warning(err.message || "عکس آپلود نشد!");
      setLoading(false)
    }
  })
  return (
    <>
      {loading ? (
        <label
          htmlFor="plus"
          className="w-full py-8 h-full rounded-md bg-[#73ba86] flex justify-center items-center shadow-md"
        >
          <span className="text-gray-50">در حال آپلود...</span>
        </label>
      ) : (
        <label
          htmlFor="plus"
          className="w-full py-8 h-full rounded-md bg-[#5fd38c] flex justify-center items-center shadow-md cursor-pointer"
        >
          <input type="file" onChange={uploadImage.mutate} id="plus" hidden />
          <i>
            <FaFileUpload className="text-gray-50 text-3xl" />
          </i>
        </label>
      )}
    </>
  );
}
