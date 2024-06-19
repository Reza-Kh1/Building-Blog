import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { fetchImage } from "../../services/Image";
type AllImageType = {
    urls: string[];
    next: string | null;
};
export default function ShowImage() {
    const [open, setOpen] = useState<boolean>(false);
    const query = useQueryClient();
    const [viewImage, setViewImage] = useState<string>();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<AllImageType>({
        queryKey: ["allImage"],
        queryFn: fetchImage,
        getNextPageParam: (lastPage) => lastPage.next || undefined,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        initialPageParam: ""
    });
    const deleteImage = useMutation({
        mutationFn: (i: string) => {
            return axios.delete(`image?url=${i}`)
        },
        onSuccess: () => {
            toast.success("عکس با موفقیت حذف شد");
            query.invalidateQueries({ queryKey: ["allImage"] });
        },
        onError: () => {
            toast.warning("عکس حذف نشد");
        }
    })
    return (
        <>
            <div>
                <div className="grid grid-cols-5 gap-5">
                    {
                        data?.pages?.map((item) => {
                            return item?.urls?.map((i, index) => (
                                <figure key={index} className="relative h-52 group">
                                    <img alt="" src={i} className="shadow-md rounded-md bg-cover w-full h-full" />
                                    <span className="absolute bottom-2 cursor-pointer left-2" onClick={() => deleteImage.mutate(i)}>
                                        <IconButton>
                                            <FaTrash size={20} color="red" />
                                        </IconButton>
                                    </span>
                                    <span
                                        className="absolute transform bg-[#000000d4] p-3 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 group-hover:inline hidden cursor-pointer left-1/2"
                                        onClick={() => {
                                            setViewImage(i);
                                            setOpen(true);
                                        }}
                                    >
                                        <FaEye size={35} color="white" />
                                    </span>
                                </figure>
                            ))
                        })
                    }
                </div>
                {hasNextPage && (
                    <Button
                        onClick={() => fetchNextPage()}
                        color="success"
                        className="!mt-5"
                        variant="outlined"
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? 'در حال بارگزاری...' : 'بارگزاری بیشتر'}
                    </Button>
                )}
            </div>
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogContent>
                    <figure>
                        <img alt="" src={viewImage} className="shadow-md rounded-md" />
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
    )
}
