"use client"
import CustomButton from '@/components/CustomButton/CustomButton';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import React from 'react'
import { FaUpload } from 'react-icons/fa6';
import { PiWarningDiamondFill } from 'react-icons/pi';
import { TbReceipt2 } from 'react-icons/tb';
const options = ["لوله کشی گاز", "کناف", "گچ کاری", "برق کاری", "خراب کاری", "کابینت", "سقف کاذب", "لوله کشی آب", "نقاشی", "درب و پنجره", "کانال کولر", "شومینه", "موتور خانه", "کاشی کاری", "دیوارکشی", "طراحی (اتوکد)", "تمیز کردن", "آهنگری", "مشاوره"];
export default function FormRequest() {
    const submitHandler = (form: FormData) => {
        console.log(form);

    }
    return (
        <form action={submitHandler} className='flex flex-col gap-3'>
            <div className='grid grid-cols-3 gap-3'>
                <TextField className='shadow-md' fullWidth label="نام :" required />
                <TextField className='shadow-md' fullWidth label="شماره تلفن :"
                    onChange={(e) => {
                        e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                        );
                    }}
                    required />
                <Autocomplete className='shadow-md'
                    freeSolo
                    options={options}
                    renderInput={(params) => <TextField required {...params} label="نوع درخواست" name='type' />}
                />
                <TextField className='shadow-md' fullWidth label="بودجه مورد نظر :" placeholder='پر کردن این بخش الزامی نیست!' />
                <TextField className='shadow-md' slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">متر مربع</InputAdornment>,
                    }
                }} fullWidth label="متراژ کار :" />
            </div>
            <TextField className='shadow-md' fullWidth label="توضیحات بیشتر" required multiline rows={10} maxRows={20} />
            <div className='flex gap-5'>
                <div className='w-1/2'>
                    <span className='block mb-3'>عکس های خود را آپلود کنید</span>
                    <label htmlFor="upload" className='w-1/3 h-32 cursor-pointer bg-blue-200/80 block rounded-md shadow-md relative'>
                        <input type='file' multiple placeholder='upload' id='upload' hidden />
                        <i className='absolute p-3 bg-green-500/80 hover:bg-orange-500 transition-all shadow-md border border-white text-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <FaUpload />
                        </i>
                    </label>
                </div>
                <div className='w-1/2'>

                </div>
            </div>
            <div className='w-1/3'>
                <CustomButton name='درخواست قیمت' iconEnd={<TbReceipt2 size={20} />} type='submit' />
            </div>
        </form>
    )
}
