import ProductsContainer from "@/components/products/ProductsContainer";

import { getAllProducts } from "../services/ProductConstraintsService";

export default async function Products() {
  const response = await getAllProducts();
  return (
    <ProductsContainer response={response}/>
  )
}
