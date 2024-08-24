import { useMemo, useRef, useState } from 'react'
import JoditEditor, { Jodit } from 'jodit-react';
import ShowImage from '../ShowImage/ShowImage';
import { Autocomplete, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa6';
import UploadImage from '../UploadImage/UploadImage';
import { classImg } from '../../data/selectData';
import { Button } from 'jodit/esm/modules';
import { toast } from 'react-toastify';
type EditorType = {
    setEditor: (value: string) => void;
    editor: string;
};
export default function JoditForm({ setEditor, editor }: EditorType) {
    const editorRef = useRef<null>(null);
    const [open, setOpen] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<string>("")
    const [imgClass, setImgClass] = useState<string[]>([])
    const config = useMemo(() => ({
        readonly: false,
        placeholder: editor || 'شروع به تایپ کنید...',
        uploader: {
            insertImageAsBase64URI: true,
        },
        buttons: [
            ...Jodit.defaultOptions.buttons,
            {
                tooltip: "بازکردن عکس ها",
                name: "images",
                exec: () => {
                    setOpen((prev) => !prev)
                }
            }
            // {
            //     name: 'custom',
            //     tooltip: 'باز کردن عکس',
            //     iconURL: 'https://th.bing.com/th/id/OIP.VH7cg73Iesjoi9lvFyirCgHaHa?rs=1&pid=ImgDetMain',
            //     popup: (editor) => {
            //         const form = editor.create.fromHTML(
            //             `<form>
            //     <input type="text" placeholder="Image URL" id="imageUrl" />
            //     <input type="text" placeholder="Image Class" id="imageClass" value="custom-class" />
            //     <input type="text" placeholder="Image Tag (e.g., img)" id="imageTag" value="img" />
            //     <button type="submit">Insert</button>
            //   </form>`
            //         );
            //         editor.e.on(form, 'submit', (e) => {
            //             e.preventDefault();
            //             const imageUrl = form.querySelector('#imageUrl').value;
            //             const imageTag = form.querySelector('#imageTag').value;
            //             const newImage = `<img src="${imageUrl}" class="${imageClass}" alt="${imageTag}" />`;
            //             editor.s.insertHTML(newImage);
            //         });

            //         return form;
            //     }
            // }
        ],
    }), [editor]);
    return (
        <>
            <JoditEditor
                ref={editorRef}
                value={editor}
                config={config}
                onBlur={newContent => setEditor(newContent)}
            />
            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    <IconButton onClick={() => setOpen(false)} color="error">
                        <IoClose />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <ShowImage setUrl={setImageUrl} />
                </DialogContent>
                <DialogActions>
                    <div className="w-full items-center gap-3 flex justify-between">
                        <div className="w-1/5">
                            {imageUrl ? (
                                <div className="relative">
                                    <img
                                        src={imageUrl}
                                        alt=""
                                        className="object-contain rounded-md shadow-md"
                                    />
                                    <IconButton
                                        className="!absolute bottom-0 left-1/2 transform -translate-x-1/2"
                                        color="error"
                                        onClick={() => setImageUrl("")}
                                    >
                                        <FaTrash size={18} />
                                    </IconButton>
                                </div>
                            ) : (
                                <UploadImage setUpload={setImageUrl} />
                            )}
                        </div>
                        <div className="grid grid-cols-2 w-full gap-3">
                            {/* <TextField
                                className="shadow-md"
                                autoComplete="off"
                                label={"عنوان تصویر"}
                                value={altValue}
                                onChange={({ target }) => setAltValue(target.value)}
                            /> */}
                            <Autocomplete
                                multiple
                                className="shadow-md"
                                id="tags-filled"
                                options={classImg.map((option) => option)}
                                defaultValue={[]}
                                freeSolo
                                onChange={(_, newValue) => setImgClass(newValue)}
                                value={imgClass}
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
                                        label="کلاس های عکس"
                                        placeholder="اینتر بزنید..."
                                    />
                                )}
                            />

                            <button className='bg-blue-400 text-white rounded-lg w-1/2 shadow-lg' onClick={() => {
                                const gog = imgClass.toString()
                                navigator.clipboard.writeText(gog.replace(/,/g, " "))
                                toast.success("کلاس عکس کپی شد")
                            }}>
                                کپی کلاس ها
                            </button>
                        </div>


                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}