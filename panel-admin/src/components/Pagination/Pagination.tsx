import { IconButton } from "@mui/material";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { PaginationType } from "../../type";
export default function Pagination({ pager }: { pager?: PaginationType }) {
  if (!pager || !pager.allPage) return;
  const { search, pathname } = useLocation();
  let { page, ...other } = queryString.parse(search) as any;
  const searchQuery = new URLSearchParams(other);
  page = page || (1 as any);
  const startPage = Math.max(1, Number(page) - 3);
  const endPage = Math.min(pager.allPage, Number(page) + 3);

  return (
    <div className="flex justify-between items-center mt-3">
      <Link
        to={
          pathname +
          `?page=${pager.prevPage ? Number(page) - 1 : page}&${searchQuery}`
        }
      >
        <IconButton color="primary" disabled={pager.prevPage ? false : true}>
          <FaAnglesRight size={25} />
        </IconButton>
      </Link>
      <div className="flex gap-2 items-center justify-evenly">
        {Number(page) > 4 && (
          <>
            <Link to={`${pathname}?page=${1}&${searchQuery}`}>
              <IconButton color="primary">1</IconButton>
            </Link>
            <span>...</span>
          </>
        )}
        {pager.allPage
          ? Array.from(
            { length: Math.min(11, endPage - startPage + 1) },
            (_, i) => startPage + i
          ).map((i) => {
            return (
              <Link to={`${pathname}?page=${i}&${searchQuery}`} key={i}>
                <IconButton disabled={Number(page) === i} color="primary">
                  {i}
                </IconButton>
              </Link>
            );
          })
          : null}
        {pager.allPage - Number(page) > 3 && (
          <>
            <span>...</span>
            <Link to={`${pathname}?page=${pager.allPage}&${searchQuery}`}>
              <IconButton color="primary">{pager.allPage}</IconButton>
            </Link>
          </>
        )}
      </div>
      <Link
        to={
          pathname +
          `?page=${pager.nextPage ? Number(page) + 1 : page}&${searchQuery}`
        }
      >
        <IconButton color="primary" disabled={pager.nextPage ? false : true}>
          <FaAnglesLeft size={25} />
        </IconButton>
      </Link>
    </div>
  );
}
