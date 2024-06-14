import { useQueryClient } from "@tanstack/react-query";
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
  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files;
    if (!newFile) return;
    if (newFile[0].size > 3000000)
      return toast.warning("حجم عکس زیر 5 مگابایت باشد");

    const formData = new FormData();
    for (let file of newFile) {
      formData.append("image", file);
    }
    setLoading(true);
    axios
      .post("image", formData)
      .then(({ data }) => {
        toast.success("عکس با موفقیت افزوده شد");
        query.invalidateQueries({ queryKey: ["allImage"] });
        if (data.file.url && setUpload) {
          setUpload(data.file.url || "");
        }
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      {loading ? (
        <label
          htmlFor="plus"
          className="w-full py-8 h-full rounded-md bg-[#7587ffs] flex justify-center items-center shadow-md"
        >
          <span className="text-gray-50">در حال آپلود...</span>
        </label>
      ) : (
        <label
          htmlFor="plus"
          className="w-full py-8 h-full rounded-md bg-[#5fd38c] flex justify-center items-center shadow-md cursor-pointer"
        >
          <input type="file" onChange={uploadImage} id="plus" hidden />
          <i>
            <FaFileUpload className="text-gray-50 text-3xl" />
          </i>
        </label>
      )}
    </>
  );
}
