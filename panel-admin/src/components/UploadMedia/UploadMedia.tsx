import { toast } from 'react-toastify';
import React, { useState } from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import { IoCloudUploadSharp } from 'react-icons/io5';
import { GiCloudUpload } from 'react-icons/gi';
export default function UploadMedia() {
    const query = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(60)
    const { mutate } = useMutation({
        mutationFn: async (event: React.ChangeEvent<HTMLInputElement>) => {
            setLoading(true);
            const newFile = event.target.files;
            if (!newFile?.length) return Promise.reject(new Error("هیچ عکسی انتخاب نشده"));
            const formData = new FormData();
            for (let file of newFile) {
                formData.append("media", file);
            }
            formData.append("status", "true")
            const { data } = await axios.post("image", formData, {
                onUploadProgress: (event) => {
                    if (event.lengthComputable && event.total) {
                        const percentComplete = Math.round((event.loaded * 100) / event.total);
                        setProgress(percentComplete);
                    }
                }
            });
            return data
        },
        onSuccess: () => {
            toast.success("عکس با موفقیت افزوده شد");
            query.invalidateQueries({ queryKey: ["allImage"] });
            setLoading(false);
        },
        onError: (err) => {
            toast.warning(err.message || "عکس آپلود نشد!");
            setLoading(false);
        },
    });
    return (
        <div className='w-full'>
            <label htmlFor="upload" className={`transition-all group p-3 bg-gradient-to-tr from-slate-600 hover:from-slate-700 hover:to-sky-500 to-sky-400 shadow-md border-black flex items-center justify-center rounded-md border-dashed border h-32 w-full ${!loading ? "cursor-pointer" : ""}`}>
                <input onChange={mutate} type="file" multiple hidden id='upload' disabled={loading} />
                {loading ?
                    <i className='text-white flex gap-3'>
                        <IoCloudUploadSharp className='text-2xl' /> % {progress}
                    </i>
                    :
                    <i className='text-3xl text-white '><GiCloudUpload /></i>
                }
            </label>
        </div>
    );
}
