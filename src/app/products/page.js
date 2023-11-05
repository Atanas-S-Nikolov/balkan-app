import ProductsContainer from "@/components/products/ProductsContainer";

import { getAllProducts } from "../services/ProductConstraintsService";

export default async function Products({ searchParams }) {
  const { productId, page } = searchParams;
  const response = await getAllProducts(productId, page);
  return (
    <ProductsContainer response={response}/>
  )
}
