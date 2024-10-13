import { Button } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MdOutlinePersonAdd } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { fetchWorker } from "../../services/worker";
import queryString from "query-string";
import { AllWorkerType } from "../../type";
import Pagination from "../../components/Pagination/Pagination";

export default function Worker() {
  const [searchQuery, setSearchQuery] = useState<any>();
  const { search } = useLocation();
  const { data } = useInfiniteQuery<AllWorkerType>({
    queryKey: ["AllPost", searchQuery],
    queryFn: () => fetchWorker(searchQuery),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    getNextPageParam: (lastPage) => lastPage.paginate.nextPage || undefined,
    initialPageParam: "",
  });
  useEffect(() => {
    const query = queryString.parse(search);
    setSearchQuery(query);
  }, [search]);
  return (
    <div className="w-full">
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
      <div>{console.log(data)}</div>
      <Pagination pager={data?.pages[0].paginate} />
    </div>
  );
}
