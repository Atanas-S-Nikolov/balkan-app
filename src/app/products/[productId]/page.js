import ProductsContainer from "@/components/products/ProductsContainer";

import { getProduct } from "@/app/services/ProductConstraintsService";

export default async function Products({ params, searchParams }) {
  console.log(params)
  const response = await getProduct(params.productId, searchParams.page);
  return (
    <ProductsContainer response={response}/>
  )
}
