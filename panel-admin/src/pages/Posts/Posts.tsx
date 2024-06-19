import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Posts() {
  return (
    <div>
      <Link to={"create-post"}>
        <Button color="info" variant="contained" endIcon={<FaPlus />}>
          ساخت پست
        </Button>
      </Link>
    </div>
  )
}
