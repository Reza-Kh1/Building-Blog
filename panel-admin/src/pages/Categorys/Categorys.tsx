import { Button, MenuItem, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CategortType } from '../../type'
import { FaMinus, FaPlus } from 'react-icons/fa6'
type FormCategoryType = {
  name: string
  slug: string
  categoryId: string
}
export default function Categorys() {
  const { register, handleSubmit, setValue } = useForm<FormCategoryType>()
  let num = 0
  const [allCategory, setAllCategory] = useState<CategortType[]>([])
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false)
  const getAllCategory = () => {
    if (num) return
    num++
    axios.get("category").then(({ data }) => {
      let array = [] as any
      const createArray = (data: CategortType[]) => {
        data.map((i: any) => {
          if (i.subCategory.length > 0) {
            createArray(i.subCategory)
          }
          array.push({ id: i.id, name: i.name })
        })
      }
      createArray(data)
      setAllCategory(array)
    }).catch((err) => {
      console.log(err);
    })
  }
  const createCategory = (form: FormCategoryType) => {

  }

  const deleteCategory = () => {

  }
  useEffect(() => {
    getAllCategory()
  }, [])
  return (
    <div>
      <div>
        {openAddCategory && (
          <form onSubmit={handleSubmit(createCategory)} className='flex gap-3 mb-3'>
            <TextField fullWidth className='shadow-md' {...register("name", { required: true })} label={"نام دسته را وارد کنید"} />
            <TextField fullWidth className='shadow-md' {...register("slug", { required: true })} label={"اسلاگ دسته را اضافه کنید"} />
            {allCategory.length && (
              <TextField
                fullWidth
                autoComplete="off"
                select
                className="shadow-md"
                label="تمام دسته ها"
                id="evaluationField"
                defaultValue={"s"}
                inputProps={{
                  inputRef: (ref: HTMLInputElement | null) => {
                    if (!ref) return;
                    setValue("categoryId", ref.id);
                  },
                }}
              >
                <MenuItem value={"s"}>انتخاب کنید</MenuItem>
                {allCategory.map((i, index) => (
                  <MenuItem key={index} value={i.id}>
                    {i.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </form>
        )}
        <div className='flex justify-between'>
          {openAddCategory && (
            <Button variant='contained' className='!w-1/6' color='warning' endIcon={<FaPlus />}>افزودن</Button>
          )}
          <Button onClick={() => setOpenAddCategory((prev) => !prev)} variant='outlined' className={openAddCategory ? "!w-1/6" : "w-full"} color='primary' endIcon={openAddCategory ? <FaMinus /> : <FaPlus />}>{openAddCategory ? "بستن باکس" : "افزودن دسته"}</Button>
        </div>
      </div>
    </div>
  )
}
