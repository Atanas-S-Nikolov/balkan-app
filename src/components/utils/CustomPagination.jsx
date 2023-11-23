'use client';

import "@/styles/utils/CustomPagination.css";
import { createQueryString } from "@/utils/URLUtils";

import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function CustomPagination({ pagesCount}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  async function handleChange(event, value) {
    const pageQueryString = createQueryString('page', value, searchParams);
    router.push(`?${pageQueryString}`);
  }

  return (
    <Pagination
      className="pagination"
      count={pagesCount}
      page={currentPage}
      onChange={handleChange}
    />
  )
}
