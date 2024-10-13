import { Autocomplete, Button, TextField } from '@mui/material'
import { TagType } from '../../type'
import { useQuery } from '@tanstack/react-query';
import { fetchTags } from '../../services/tag';
import { Link } from 'react-router-dom';
import { FaShare } from 'react-icons/fa6';
type TagsBoxType = {
    tags: TagType[],
    setTags: (value: TagType[]) => void
}
type TagsType = {
    count: number
    rows: TagType[]
}
export default function TagAutocomplete({ tags, setTags }: TagsBoxType) {
    const { data } = useQuery<TagsType>({
        queryKey: ["tagsName"],
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        queryFn: fetchTags,
    });
    console.log(data);
    
    return (
        data?.rows?.length ? <Autocomplete
            multiple
            className="shadow-md w-1/2"
            id="tags-outlined"
            options={data?.rows}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={tags}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="تگ های پروژه"
                />
            )}
            onChange={(_, newValue) => setTags(newValue)}
        /> : <Link to={"/home/tags"}>
            <Button endIcon={<FaShare />} variant='outlined'>
                هیچ تگ در دیتابیس ذخیره نشده لطفا تگ جدید ایجاد کنید!
            </Button>
        </Link>

    )
}
