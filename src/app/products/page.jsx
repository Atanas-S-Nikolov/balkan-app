'use server';

import ProductsContainer from "@/components/products/ProductsContainer";

import { getProducts } from "../services/ProductConstraintsService";

export default async function Products({ searchParams }) {
  const { productId, page } = searchParams;
  const response = await getProducts(productId, page);
  return (
    <ProductsContainer response={response}/>
  )
}
