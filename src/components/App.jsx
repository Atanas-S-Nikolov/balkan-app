'use client';
import { useMountEffect } from "@react-hookz/web";

import Link from 'next/link';
import { useState } from "react";

const BREAKDOWN_LINK = '/breakdown';
const BREAKDOWN_INPUT_LINK = '/breakdown/input';
const PRODUCTS_LINK = '/products?page=1';

export default function App({ inputProductsRequest }) {
  const [breakdownHref, setBreakdownHref] = useState(BREAKDOWN_INPUT_LINK);

  useMountEffect(async () => {
    const inputProducts = await inputProductsRequest();
    const areProductsPresent = inputProducts && inputProducts.length > 0;
    setBreakdownHref(areProductsPresent ? BREAKDOWN_LINK : BREAKDOWN_INPUT_LINK);
  })

  return (
    <>
      <li>
        <Link href={breakdownHref}>Разбивка</Link>
      </li>
      <li>
        <Link href={PRODUCTS_LINK}>Изделия</Link>
      </li>
    </>
  )
}
