import ProductsContainer from "@/components/products/ProductsContainer";
import ProductsLayout from "./layout";

import { getProducts } from "@/services/ProductConstraintsService";

export async function getServerSideProps(context) {
  const { productId, page } = context.query;
  const products = await getProducts(productId, page);
  return { props: { products } }
}

export default function Products({ products }) {
  return (
    <ProductsContainer response={products}/>
  )
}

Products.getLayout = function getLayout(page) {
  return (
    <ProductsLayout>{page}</ProductsLayout>
  )
}
