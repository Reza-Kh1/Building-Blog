import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import { SiReaddotcv } from "react-icons/si";
import { LuFileEdit } from "react-icons/lu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CategortType, FormPostType, SinglePostType } from "../../type";
import { useEffect, useState } from "react";
import { fetchCategory } from "../../services/category";
import { RiImageEditFill } from "react-icons/ri";
import UploadImage from "../../components/UploadImage/UploadImage";
import ShowImage from "../../components/ShowImage/ShowImage";
import { FaImage, FaTrash } from "react-icons/fa6";
import MyEditor from "../../components/Editor/Editor";
import { MdEditNote, MdPostAdd } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import JoditForm from "../JoditEditor/JoditEditor";
export default function FormPost({ dataPost }: { dataPost?: SinglePostType }) {
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<FormPostType>({
      defaultValues: {
        categoryId: dataPost?.Category?.id || "s",
        status: dataPost?.status || false,
      },
    });
  const { pathname } = useLocation();
  const slug = pathname.split("/home/posts/")[1];
  const categoryValue = watch("categoryId");
  const statusValue = watch("status");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [keyword, setKeyword] = useState<string[]>([]);
  const [editorText, setEditorText] = useState<string>("");
  const [postId, setPostId] = useState<string>("");
  const [isUpdateDetail, setIsUpdateDetail] = useState<boolean>(false);
  const { data: dataCategory } = useQuery<CategortType[]>({
    initialData: () => queryClient.getQueryData(["getCategory"]),
    queryKey: ["getCategory"],
    queryFn: fetchCategory,
    staleTime: 1000 * 60 * 60 * 24,
  });
  const { isPending: isPendingPost1, mutate: createPost } = useMutation({
    mutationFn: (form: FormPostType) => {
      const body = {
        image: imageUrl,
        ...form,
      };
      return axios.post("post", body);
    },
    onSuccess: ({ data }) => {
      setPostId(data.id);
      queryClient.invalidateQueries({ queryKey: ["AllPost"] });
      toast.success("پست با موفقیت ثبت شد");
    },
    onError: (err) => {
      toast.warning("با خطا مواجه شدیم");
      console.log(err);
    },
  });
  const { isPending: isPendingPost2, mutate: updatePost } = useMutation({
    mutationFn: (form: FormPostType) => {
      const body = {
        image: imageUrl,
        ...form,
      };
      return axios.put(`post/${postId}`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siglePost", slug] });
      queryClient.invalidateQueries({ queryKey: ["AllPost"] });
      toast.success("پست با موفقیت آپدیت شد");
    },
    onError: (err) => {
      toast.warning("با خطا مواجه شدیم");
      console.log(err);
    },
  });
  const { isPending: isPendingDetail1, mutate: createDetailPost } = useMutation(
    {
      mutationFn: () => {
        const body = {
          keyword,
          title: getValues("titleDetail"),
          text: editorText,
        };
        return axios.post(`detail/${postId}`, body);
      },
      onSuccess: () => {
        toast.success("اطلاعات با موفقیت دخیره شد");
        queryClient.invalidateQueries({ queryKey: ["siglePost", slug] });
        setIsUpdateDetail(true);
      },
      onError: (err) => {
        toast.warning("با خطا مواجه شدیم");
        console.log(err);
      },
    }
  );
  const { isPending: isPendingDetail2, mutate: updateDetailPost } = useMutation(
    {
      mutationFn: () => {
        const body = {
          keyword,
          title: getValues("titleDetail"),
          text: editorText,
        };
        return axios.put(`detail/${postId}`, body);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["siglePost", slug] });
        toast.success("اطلاعات با موفقیت آپدیت شد");
      },
      onError: (err) => {
        toast.warning("با خطا مواجه شدیم");
        console.log(err);
      },
    }
  );
  const syncData = () => {
    if (!dataPost) return;
    setValue("title", dataPost.title);
    setValue("description", dataPost.description);
    setValue("slug", dataPost.slug);
    setImageUrl(dataPost.image);
    setPostId(dataPost.id);
    if (
      dataPost?.DetailPost?.title ||
      dataPost?.DetailPost?.text ||
      dataPost?.DetailPost?.keyword
    ) {
      setKeyword(dataPost.DetailPost.keyword || []);
      setEditorText(dataPost.DetailPost.text || "");
      setValue("titleDetail", dataPost?.DetailPost?.title || "");
      setIsUpdateDetail(true);
    }
  };
  useEffect(() => {
    syncData();
  }, [dataPost]);
  return (
    <>
      <div>
        <form>
          <div className="grid grid-cols-[37%_37%_20%] gap-2 mt-3">
            <TextField
              autoComplete="off"
              label={"نام پست"}
              fullWidth
              {...register("title", { required: true })}
            />
            <TextField
              autoComplete="off"
              label={"اسلاگ"}
              fullWidth
              {...register("slug", { required: true })}
              helperText={"توجه داشته باشید که اسلاگ تکراری وارد نکنید!"}
            />
            {dataCategory?.length ? (
              <TextField
                autoComplete="off"
                select
                label="دسته پست"
                id="evaluationField"
                value={categoryValue || "s"}
                onChange={({ target }) => setValue("categoryId", target.value)}
              >
                <MenuItem value={"s"}>انتخاب کنید</MenuItem>
                {dataCategory?.map((i) => (
                  <MenuItem key={i.id} value={i.id}>
                    {i.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
          </div>
          <div className="flex mt-3  gap-3">
            <div className="w-3/5">
              <TextField
                fullWidth
                autoComplete="off"
                className="shadow-md"
                label={"توضیحات"}
                rows={6}
                multiline
                {...register("description", { required: true })}
              />
            </div>
            <div className="w-2/5 flex flex-col gap-3  items-center">
              {imageUrl ? (
                <>
                  <img
                    className="w-3/4 object-contain h-full rounded-md shadow-md"
                    src={imageUrl}
                    alt=""
                  />
                  <div className="flex justify-evenly w-full">
                    <IconButton color="primary" onClick={() => setOpen(true)}>
                      <RiImageEditFill />
                    </IconButton>
                    <IconButton color="error" onClick={() => setImageUrl("")}>
                      <FaTrash />
                    </IconButton>
                  </div>
                </>
              ) : (
                <>
                  <i
                    onClick={() => setOpen(true)}
                    className="w-full h-full bg-gray-50 border-black border-2 border-dashed rounded-md  flex justify-center items-center cursor-pointer"
                  >
                    <FaImage className="text-gray-500 text-3xl" />
                  </i>
                  <span>آپلود عکس</span>
                </>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            {postId ? (
              <Button
                onClick={handleSubmit((data) => updatePost(data))}
                color="primary"
                variant="contained"
                endIcon={<MdEditNote />}
                disabled={isPendingPost2}
              >
                ویرایش اطلاعات
              </Button>
            ) : (
              <Button
                onClick={handleSubmit((data) => createPost(data))}
                color="success"
                variant="contained"
                disabled={isPendingPost1}
                endIcon={<SiReaddotcv />}
              >
                ذخیره اطلاعات
              </Button>
            )}
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  //   value={statusValue}
                  checked={statusValue ? true : false}
                  onChange={() => setValue("status", !getValues("status"))}
                />
              }
              label="انتشار پست"
            />
          </div>
        </form>
        {postId && (
          <form>
            <TextField
              className="shadow-md !w-1/3 !mt-5"
              autoComplete="off"
              label={"سربرگ صفحه"}
              fullWidth
              {...register("titleDetail")}
            />
            <div className="my-3">
              <Autocomplete
                multiple
                className="shadow-md"
                id="tags-filled"
                options={[].map((option) => option)}
                defaultValue={[]}
                freeSolo
                onChange={(_, newValue) => setKeyword(newValue)}
                value={keyword}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip
                        variant="outlined"
                        label={option}
                        key={key}
                        {...tagProps}
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="کلمات کلیدی"
                    placeholder="اینتر بزنید..."
                  />
                )}
              />
            </div>
            <div>
              <JoditForm setEditor={setEditorText} editor={editorText}/>
              {/* <MyEditor setEditor={setEditorText} editor={editorText} /> */}
            </div>
            <div className="mt-5">
              {isUpdateDetail ? (
                <Button
                  disabled={isPendingDetail2}
                  onClick={() => updateDetailPost()}
                  color="primary"
                  endIcon={<LuFileEdit />}
                  variant="contained"
                >
                  ویرایش اطلاعات پست
                </Button>
              ) : (
                <Button
                  disabled={isPendingDetail1}
                  onClick={() => createDetailPost()}
                  color="success"
                  endIcon={<MdPostAdd />}
                  variant="contained"
                >
                  ذخیره اطلاعات پست
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <ShowImage setClose={setOpen} setUrl={setImageUrl} />
        </DialogContent>
        <DialogActions>
          <div className="w-full items-end flex justify-between">
            <div className="w-1/5 flex justify-center items-center flex-col gap-3">
              <UploadImage setUpload={setImageUrl} setClose={setOpen} />
              <span>آپلود عکس</span>
            </div>
            <Button
              className="!w-2/12 shadow-md"
              variant="contained"
              color="primary"
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
