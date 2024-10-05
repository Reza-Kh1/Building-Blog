import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { forwardRef, useEffect, useState } from "react";
import { fetchOnlinePrice } from "../../services/onlinePrice";
import { AllonlinePriceType } from "../../type";
import Pagination from "../../components/Pagination/Pagination";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slide,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { TransitionProps } from "@mui/material/transitions";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function OnlinePrice() {
  const [searchQuery, setSearchQuery] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const { search } = useLocation();
  const { data } = useInfiniteQuery<AllonlinePriceType>({
    queryKey: ["AllPost", searchQuery],
    queryFn: () => fetchOnlinePrice(searchQuery),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    getNextPageParam: (lastPage) => lastPage.paginate.nextPage || undefined,
    initialPageParam: "",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: () => {},
    onSuccess: () => {},
    onError: (err) => {},
  });
  useEffect(() => {
    const query = queryString.parse(search);
    setSearchQuery(query);
  }, [search]);
  return (
    <div className="w-full">
      <h1 className="w-full p-2 mb-3 rounded-md shadow-md bg-blue-400 text-gray-50">
        {data?.pages[0].count} درخواست قیمت
      </h1>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>نام</StyledTableCell>
                <StyledTableCell>شماره تلفن</StyledTableCell>
                <StyledTableCell>موضوع</StyledTableCell>
                <StyledTableCell>تاریخ</StyledTableCell>
                <StyledTableCell>وضعیت</StyledTableCell>
                <StyledTableCell>نمایش</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.pages[0].rows.length
                ? data.pages[0].rows?.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.phone}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.subject}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {new Date(row.createdAt).toLocaleString("fa")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          color={row.status ? "success" : "error"}
                          endIcon={row.status ? <FaCheck /> : <MdClose />}
                          disabled
                        >
                          {row.status ? "" : ""}
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          color={"success"}
                          endIcon={<IoEye />}
                          variant="contained"
                        >
                          نمایش اطلاعات
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination pager={data?.pages[0].paginate} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {/* {
    "data": {
        "id": 2,
        "name": "ali",
        "phone": "09390199977",
        "price": "250000",
        "description": "من نمیدونم چی مینویسم",
        "subject": "کناف",
        "images": [
            "srs",
            "srs"
        ],
        "size": "120000",
        "status": false,
        "createdAt": "2024-10-02T15:49:26.493Z",
        "updatedAt": "2024-10-02T15:49:26.493Z"
    }
} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={() => setOpen(false)}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
