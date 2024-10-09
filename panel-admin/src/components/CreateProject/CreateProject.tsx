import { TextField } from '@mui/material'
import { Button } from 'jodit/esm/modules'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function CreateProject() {
    const { register, handleSubmit } = useForm()
    const submitHandler = (from) => {

    }
    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <TextField
                fullWidth
                autoComplete="off"
                className="shadow-md"
                label={"نام"}
                {...register("name", { required: true })}
            />
            <TextField
                fullWidth
                multiline
                rows={6}
                autoComplete="off"
                className="shadow-md"
                label={"نام"}
                {...register("name", { required: true })}
            />
            <Button
                onClick={handleSubmit((data) => submitHandler(data))}
                className=""
                endIcon={<MdDataSaverOn />}
                color="success"
                variant="contained"
            >
                ذخیره کردن اطلاعات
            </Button>
        </form>
    )
}
