import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiLogoInternetExplorer, BiMessageSquareEdit } from 'react-icons/bi'
import { FaInstagram, FaLinkedin, FaPen, FaPenToSquare, FaPhone, FaTelegram, FaTrash, FaUser, FaWhatsapp } from 'react-icons/fa6'
import { IoLogoTwitter } from 'react-icons/io5'
import { MdClose, MdDataSaverOn } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import SelectMedia from '../SelectMedia/SelectMedia'
import { DataMediaType, WorkerType } from '../../type'
import TagAutocomplete from '../TagAutocomplete/TagAutocomplete'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import PendingApi from '../PendingApi/PendingApi'
import { fetchSingleWorker } from '../../services/worker'
import queryString from 'query-string'
const dataSocialMedia = [
    {
        name: "Whatsapp",
        value: "whatsapp",
        icon: <FaWhatsapp className='text-xl text-green-700' />
    },
    {
        name: "Telegram",
        value: "telegram",
        icon: <FaTelegram className='text-xl text-sky-600' />
    },
    {
        name: "Instagram",
        value: "instagram",
        icon: <FaInstagram className='text-xl text-red-500' />
    },
    {
        name: "Phone",
        value: "phone",
        icon: <FaPhone className='text-xl text-green-400' />
    },
    {
        name: "Website",
        value: "web",
        icon: <BiLogoInternetExplorer className='text-xl text-indigo-500' />
    },
    {
        name: "Twitter",
        value: "twitter",
        icon: <IoLogoTwitter className='text-xl text-sky-400' />
    },
    {
        name: "Linkedin ",
        value: "linkedin ",
        icon: <FaLinkedin className='text-xl text-blue-700' />
    },
]
type SocialMediaType = {
    link: string
    type: string
    id: number
    text: string
}
type FormSocialMediaType = {
    select: "editSelectMedia" | "selectMedia"
    linkName: "editLinkSocial" | "linkSocial"
    textName: "editTextSocial" | "textSocial"
    linkValue?: string
    textValue?: string
}
type FormType = {
    selectMedia: string
    editSelectMedia: string
    editTextSocial: string
    editLinkSocial: string
    name: string
    phone: string
    address: string
    description: string
    linkSocial: string
    textSocial: string
}
export default function CreateWorker() {
    const [tagWorker, setTagWorker] = useState<{ name: string }[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [socialMedia, setSocialMedia] = useState<SocialMediaType[]>([])
    const [image, setImage] = useState<DataMediaType | null>(null)
    const [idEdit, setIdEdit] = useState<number | null>(null)
    const { search } = useLocation()
    const test: { worker?: string } = queryString.parse(search)
    const queryClient = useQueryClient();
    const { register, watch, setValue, getValues } = useForm<FormType>({
        defaultValues: {
            selectMedia: "",
            editSelectMedia: ""
        }
    })
    const { data } = useQuery<WorkerType>({
        queryKey: ["workerSingle", test.worker],
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        queryFn: () => fetchSingleWorker(test?.worker),
        enabled: test?.worker ? true : false
    });
    const { isPending, mutate: submitAction } = useMutation({
        mutationFn: () => {
            const body = {
                name: getValues("name"),
                phone: getValues("phone"),
                socialMedia: socialMedia,
                address: getValues("address"),
                description: getValues("description"),
                image: image?.url,
                tags: tagWorker
            }
            return axios.post('worker', body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["AllWorker"] });
            toast.success("متخصص با موفقیت ایجاد شد");
        },
        onError: (err: any) => {
            toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
            console.log(err);
        },
    });
    const { isPending: isUpdate, mutate: submitUpdate } = useMutation({
        mutationFn: () => {
            const body = {
                name: getValues("name"),
                phone: getValues("phone"),
                socialMedia: socialMedia,
                address: getValues("address") || null,
                description: getValues("description") || null,
                image: image?.url || null,
                tags: tagWorker
            }            
            return axios.put(`worker/${data?.id}`, body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workerSingle", test.worker] });
            toast.info("با موفقیت ویرایش شد");
        },
        onError: (err: any) => {
            toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
            console.log(err);
        },
    });
    const editSocialHandler = () => {
        if (!idEdit) return
        const newArry = socialMedia?.map((item) => {
            if (item?.id === idEdit) {
                item.text = getValues("editTextSocial")
                item.link = getValues("editLinkSocial")
                item.type = getValues("editSelectMedia")
            }
            return item
        })
        setOpen(false)
        setSocialMedia(newArry || [])
    }
    const createSocialMedia = () => {
        const body = {
            id: Math.floor(Math.random() * 1000),
            type: getValues("selectMedia"),
            link: getValues("linkSocial"),
            text: getValues("textSocial")
        }
        setSocialMedia([...socialMedia, body])
        setValue("selectMedia", "")
        setValue("linkSocial", "")
        setValue("textSocial", "")

    }
    const openEditSocialHandler = (social: SocialMediaType) => {
        setOpen(true)
        setValue("editLinkSocial", social.link)
        setValue("editSelectMedia", social.type)
        setValue("editTextSocial", social.text)
        setIdEdit(social.id)
    }
    const FormSocialMedia = ({ select, linkName, textValue, linkValue, textName }: FormSocialMediaType) => {
        const selectSocialMedia = watch(select)
        return (
            <div className='flex items-center gap-4 w-full'>
                <FormControl className='w-1/5' sx={{ m: 1, minWidth: 180, background: "#fff" }}>
                    <InputLabel id="demo-simple-select-filled-label">اپلیکیشن</InputLabel>
                    <Select
                        className='bg-gray-100 shadow-md'
                        labelId="demo-simple-select-filled-label"
                        label="اپلیکیشن"
                        value={selectSocialMedia}
                        onChange={({ target }) => setValue(select, target.value)}
                    >
                        <MenuItem value="">
                            <em>انتخاب کنید.</em>
                        </MenuItem>
                        {dataSocialMedia.map((i, index) => (
                            <MenuItem key={index} value={i.value}>
                                <div className='w-full flex items-center justify-evenly gap-2'>
                                    {i.icon}
                                    <span className='inline-block mr-2'>
                                        {i.name}
                                    </span>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    defaultValue={textValue}
                    className='shadow-md w-2/5'
                    autoComplete="off"
                    label={"متن"}
                    {...register(textName, { required: true })}
                />
                <TextField
                    defaultValue={linkValue}
                    className='shadow-md w-2/5'
                    autoComplete="off"
                    label={"لینک"}
                    {...register(linkName, { required: true })}
                />
            </div>
        )
    }
    useEffect(() => {
        if (data) {
            setValue("address", data.address)
            setValue("description", data.description)
            setValue("name", data.name)
            setValue("phone", data.phone)
            setSocialMedia(data.socialMedia)
            setTagWorker(data.Tags)
            setImage({ url: data.image, alt: "logo profile" })
        }
    }, [data])
    if (search && !data) return
    return (
        <>
            {isPending || isUpdate && <PendingApi />}
            <div className='w-full'>
                <h1 className="w-full p-2 rounded-md shadow-md bg-blue-400 text-gray-50">
                    {data ? "ویرایش متخصص" : "افزودن متخصص"}
                </h1>
                <form className='my-3 flex flex-col gap-3' onSubmit={() => submitAction()}>
                    <div className='grid gap-3 items-start grid-cols-2'>
                        <TextField
                            fullWidth
                            autoComplete="off"
                            defaultValue={data?.name}
                            label={"نام"}
                            {...register("name", { required: true })}
                            helperText="نام نباید قبلا ثبت شده باشد!"
                        />
                        <TextField
                            fullWidth
                            autoComplete="off"
                            label={"تلفن"}
                            {...register("phone", { required: true })}
                            inputProps={{
                                onKeyDown: (event) => {
                                    const keyCode = event.keyCode || event.which;
                                    const keyValue = String.fromCharCode(keyCode);
                                    if (
                                        keyCode !== 8 &&
                                        keyCode !== 13 &&
                                        !/^\d+$/.test(keyValue)
                                    )
                                        event.preventDefault();
                                },
                            }}
                            helperText="تلفن نباید قبلا ثبت شده باشد!"
                        />
                        <TextField
                            fullWidth
                            autoComplete="off"
                            className="shadow-md"
                            label={"آدرس"}
                            multiline
                            rows={6}
                            {...register("address")}
                        />
                        <TextField
                            fullWidth
                            autoComplete="off"
                            className="shadow-md"
                            label={"توضیحات"}
                            multiline
                            rows={6}
                            {...register("description")}
                        />
                    </div>
                    <div>
                        <span className='font-semibold block mb-3'>
                            لینک اپلیکیشن
                        </span>
                        <div className='w-full flex items-center gap-3'>
                            <FormSocialMedia select={"selectMedia"} linkName={"linkSocial"} textName='textSocial' />
                            <Button onClick={createSocialMedia} color='primary' variant='contained' className='w-1/5' endIcon={<MdDataSaverOn />}>
                                ذخیره
                            </Button>
                        </div>
                        <div className='grid gap-3 mt-5 grid-cols-4'>
                            {socialMedia?.map((i, index) => (
                                <div key={index} className='border bg-slate-100 shadow-md p-2 rounded-md'>
                                    <div className='flex items-center my-4 justify-center gap-3'>
                                        <i>
                                            {dataSocialMedia.find(item => item.value === i.type)?.icon}
                                        </i>
                                        <Link to={i.link} className='text-blue-500 text-lg'>{i.text}</Link>
                                    </div>
                                    <div className='flex w-full gap-5 items-center justify-between'>
                                        <Button onClick={() => openEditSocialHandler(i)} color='success' variant='contained' endIcon={<FaPen />}>
                                            ویرایش
                                        </Button>
                                        <Button onClick={() => {
                                            const newArry = socialMedia.filter((filter) => filter.id !== i.id)
                                            setSocialMedia(newArry)
                                        }} color='error' variant='contained' endIcon={<FaTrash />}>
                                            حذف
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className='mb-1 inline-block'>انتخاب عکس پروفایل</span>
                        <SelectMedia addMedia={(alt, img) => setImage({ alt, url: img.url })} />
                        {
                            image ?
                                <figure className='group relative inline-block mt-3'>
                                    <img className='rounded-full w-36 p-1 h-36 object-cover shadow-md' src={image.url || "/notfound.webp"} alt="" />
                                    <i
                                        onClick={() => setImage(null)}
                                        className="absolute group-hover:opacity-100 opacity-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-2xl right-1/2 bg-red-500/70 p-1 rounded-full cursor-pointer text-white shadow-md"
                                    >
                                        <MdClose />
                                    </i>
                                </figure> :
                                <i className='mt-3 inline-block'
                                    onClick={() => setImage(null)}
                                >
                                    <FaUser className=" w-36 p-1 h-36 rounded-full bg-slate-200 shadow-md" />
                                </i>
                        }
                    </div>
                    <div>
                        <TagAutocomplete name='افزودن تگ' setTags={setTagWorker} tags={tagWorker} />
                    </div>
                    <div className='w-1/5'>
                        {search && data ?
                            <Button color='success' disabled={isUpdate} variant='contained' onClick={() => submitUpdate()} fullWidth endIcon={<BiMessageSquareEdit />}>
                                ویرایش
                            </Button>
                            :
                            <Button color='primary' disabled={isPending} variant='contained' onClick={() => submitAction()} fullWidth endIcon={<MdDataSaverOn />}>
                                ذخیره
                            </Button>
                        }
                    </div>
                </form>
            </div >
            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
                onClose={() => { setOpen(false), setIdEdit(null) }}
            >
                <DialogTitle>ویرایش شبکه های اجتماعی</DialogTitle>
                <DialogContent>
                    <div className='flex py-7'>
                        <FormSocialMedia linkName='editLinkSocial' textName='editTextSocial' select='editSelectMedia' linkValue={getValues("editLinkSocial")} textValue={getValues("editTextSocial")} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className="flex justify-between items-center w-full">
                        <Button
                            type="submit"
                            color="success"
                            variant="contained"
                            endIcon={<FaPenToSquare />}
                            onClick={editSocialHandler}
                        >
                            ذخیره
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            endIcon={<MdClose />}
                            onClick={() => { setOpen(false), setIdEdit(null) }}
                        >
                            بستن
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
}
