import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import ShowImage from "../ShowImage/ShowImage";
import { IoClose } from "react-icons/io5";
import UploadImage from "../UploadImage/UploadImage";
import { classImg } from "../../data/selectData";
import { FaTrash } from "react-icons/fa6";

type EditorType = {
  setEditor: (value: string) => void;
  editor: string;
};

const Editor = ({ setEditor, editor }: EditorType) => {
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [altValue, setAltValue] = useState("");
  const [imgClass, setImgClass] = useState<string[]>([]);
  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
    "code-block",
    "script",
  ];

  const addImage = () => {
    const quill = quillInstanceRef.current as any;
    if (quill) {
      let classImg = "";
      imgClass.forEach((i) => {
        classImg = classImg + i + " ";
      });
      quill.focus();
      const selection = quill.getSelection();
      if (selection) {
        const cursorPosition = selection.index;
        quill.insertEmbed(cursorPosition, "image", {
          url: imageUrl,
          alt: altValue,
          class: classImg,
        });
        quill.setSelection(cursorPosition + 1);
      }
      setImageUrl("");
      setOpen(false);
    }
  };

  const modules = {
    toolbar: [
      ["link", "video", "image"],
      [{ font: ["sansrif", "roboto", "iranSans"] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  useEffect(() => {
    if (!quillInstanceRef.current) {
      const CodeBlock = Quill.import("formats/code-block") as any;
      Quill.register(CodeBlock, true);

      const Script = Quill.import("formats/script") as any;
      Quill.register(Script, true);
      if (quillRef.current === null) return;

      const quill = new Quill(quillRef.current, {
        theme: "snow",
        modules,
        formats,
      });

      quill.clipboard.dangerouslyPasteHTML(editor); // Set initial content
      quillInstanceRef.current = quill;
      if (setEditor) {
        quill.on("text-change", () => {
          setEditor(quill.root.innerHTML);
        });
      }

      const CustomImage = Quill.import("formats/image") as any;
      CustomImage.create = function (value: any) {
        let node = document.createElement("img");
        node.setAttribute("src", value.url);
        node.setAttribute("alt", value.alt);
        node.setAttribute("class", value.class);
        return node;
      };
      CustomImage.value = function (node: any) {
        return {
          url: node.getAttribute("src"),
          alt: node.getAttribute("alt"),
          class: node.getAttribute("class"),
        };
      };
      Quill.register(CustomImage, true);

      const openDialog = (event: any) => {
        event.preventDefault();
        setOpen(true);
      };

      const toolbar = document.querySelector(".ql-toolbar");
      const button = document.createElement("button");
      button.onclick = openDialog;
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
        <path d="M.002 2.5A1.5 1.5 0 0 1 1.5 1h13a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 .002 13.5V2.5zm1.5-.5a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-13z"/>
        <path d="M4.5 10.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-2zm2.5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>`;
      if (toolbar) {
        toolbar.appendChild(button);
      }
    }
  }, [modules, formats, setEditor, editor]);
  return (
    <>
      <div className="box-editor">
        <div ref={quillRef} style={{ height: "300px" }}></div>
      </div>
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
              <TextField
                className="shadow-md"
                autoComplete="off"
                label={"عنوان تصویر"}
                value={altValue}
                onChange={({ target }) => setAltValue(target.value)}
              />
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
            </div>
            <Button variant="contained" color="primary" onClick={addImage}>
              افزودن
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Editor;
