'use client';

import '@/styles/products/ProductContainer.css';

import CustomPagination from "../utils/CustomPagination";
import Product from "./Product";
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function ProductsContainer({ response }) {
  const [productResponse, setProductResponse] = useState(response);
  const { docs, totalDocs, totalPages } = productResponse;
  const docsCount = docs?.length;
  
  function handleResponseChange(response) {
    setProductResponse(response);
  }

  return (
    <div className="product-container grid-center">
      {/* <div className='flex'>
        <Typography>Изделия на страница: {docsCount}</Typography>
        <Typography>Общо изделия: {totalDocs}</Typography>
      </div> */}
      {docs?.map(product => <Product key={product.productId} product={product}/>)}
      <CustomPagination className="pagination" pagesCount={totalPages} onChangeCallback={handleResponseChange}/>
    </div>
  )
}
