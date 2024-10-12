import { Button } from "@mui/material";
import { PiStackPlusFill } from "react-icons/pi";
import { BiSolidBookmarkPlus, BiSolidLayerPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
export default function Projects() {
  return (
    <div className="w-full">
      <Link to={"create-project"}>
        <Button
          endIcon={<PiStackPlusFill />}
          startIcon={<PiStackPlusFill />}
          color="primary"
          fullWidth
          variant="contained"
        >
          ایجاد پروژه
        </Button>
      </Link>
    </div>
  );
}
