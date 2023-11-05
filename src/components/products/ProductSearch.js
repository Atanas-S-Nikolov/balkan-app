'use client';

import { createQueryString } from '@/utils/URLUtils';
import TextField from '@mui/material/TextField';
import { useDebouncedCallback } from '@react-hookz/web';
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const handleChange = useDebouncedCallback((event) => {
    const productId = event.target.value.trim();
    const productIdQueryString = productId ? createQueryString('productId', productId, searchParams) : '';
    const queryString = createQueryString('page', currentPage, productIdQueryString);
    router.push(`?${queryString}`);
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
