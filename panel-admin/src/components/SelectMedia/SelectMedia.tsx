import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { IoMdImages } from "react-icons/io";
import MediaBox from "../MediaBox/MediaBox";
import { TransitionProps } from "@mui/material/transitions";
import { MdClose, MdOutlineLibraryAdd } from "react-icons/md";
import { MediaType } from "../../type";
import UploadMedia from "../UploadMedia/UploadMedia";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type SelectMediaType = {
  addMedia: (alt: string, image: MediaType) => void;
};
export default function SelectMedia({ addMedia }: SelectMediaType) {
  const [open, setOpen] = useState<boolean>(false);
  const [altMedia, setAltMedia] = useState<string>("");
  const [urlMedia, setUrlMedia] = useState<MediaType | null>(null);
  const mediaHandler = () => {
    if (!urlMedia || !altMedia) {
      return;
    }
    addMedia(altMedia, urlMedia);
    setUrlMedia(null);
    setAltMedia("");
    setOpen(false);
  };
  return (
    <div className="w-full">
      <Button
        onClick={() => setOpen(true)}
        color="primary"
        variant="contained"
        endIcon={<IoMdImages />}
      >
        انتخاب تصویر یا ویدئو
      </Button>
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div>
            <MediaBox setUrlImg={setUrlMedia} />
            <div className="mt-3 flex items-center gap-5">
              <div className="w-7/12">
                <TextField
                  autoComplete="off"
                  className="shadow-md"
                  label={"عنوان را مرتبط بنویسید"}
                  fullWidth
                  value={altMedia || ""}
                  onChange={({ target }) => {
                    setAltMedia(target.value);
                  }}
                />
              </div>
              <div className="w-2/12">
                <UploadMedia />
              </div>
              <figure className="w-3/12">
                {urlMedia && (
                  <img
                    className="rounded-md shadow-md object-cover h-48 w-full"
                    src={urlMedia.url}
                    alt="test"
                  />
                )}
              </figure>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="w-full flex justify-between border-t pt-5 border-dashed ">
            <Button
              className="w-1/6"
              disabled={!urlMedia || !altMedia ? true : false}
              onClick={mediaHandler}
              endIcon={<MdOutlineLibraryAdd />}
              color="success"
              variant="contained"
            >
              ذخیره
            </Button>
            <Button
              className="w-1/6"
              onClick={() => setOpen(false)}
              color="error"
              variant="contained"
              endIcon={<MdClose />}
            >
              بستن
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
