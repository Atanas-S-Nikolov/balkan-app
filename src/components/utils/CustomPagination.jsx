'use client';

import "@/styles/utils/CustomPagination.css";
import { createQueryString } from "@/utils/URLUtils";

import Pagination from "@mui/material/Pagination";
import { useMediaQuery } from "@react-hookz/web";
import { useRouter, useSearchParams } from "next/navigation";

export default function CustomPagination({ pagesCount}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 350px)', false);
  const size = isMobile ? 'small' : 'medium';
  const currentPage = parseInt(searchParams.get('page')) || 1;

  async function handleChange(event, value) {
    const pageQueryString = createQueryString('page', value, searchParams);
    router.push(`?${pageQueryString}`);
  }

  return (
    <Pagination
      className="pagination"
      count={pagesCount}
      size={size}
      page={currentPage}
      onChange={handleChange}
    />
  )
}
