'use client';

import { createQueryString } from '@/utils/URLUtils';
import TextField from '@mui/material/TextField';
import { useDebouncedCallback } from '@react-hookz/web';
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ProductSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const handleChange = useDebouncedCallback((event) => {
    event.preventDefault();
    const productId = event.target.value.trim();
    const pageQueryString = createQueryString('page', currentPage, searchParams);
    router.push(`${pathname}/${productId}?${pageQueryString}`);
  }, [], 400);

  return (
    <TextField
      id='product-search'
      label='Номер на изделие'
      variant='filled'
      onChange={handleChange}
    />
  )
}
