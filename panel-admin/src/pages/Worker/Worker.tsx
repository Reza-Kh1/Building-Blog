import { Button } from '@mui/material'
import { MdOutlinePersonAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Worker() {
  return (
    <div className='w-full'>
      <Link to={"create-worker"}>
        <Button
          endIcon={<MdOutlinePersonAdd />}
          startIcon={<MdOutlinePersonAdd />}
          color="primary"
          fullWidth
          variant="contained"
        >
          ایجاد متخصص
        </Button>
      </Link>
    </div>
  )
}
