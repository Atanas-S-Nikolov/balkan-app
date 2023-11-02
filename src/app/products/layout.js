import ProductSearch from "@/components/products/ProductSearch";
import CreateProductForm from "@/components/utils/CreateProductForm";

async function createProduct(product) {
  'use server';
  await fetch('/api/productConstraints', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(product)
  });
}

export default function ProductsLayout({ children }) {
  return (
    <div className="grid-center">
      <h1>Изделия</h1>
      <CreateProductForm request={createProduct}/>
      <ProductSearch/>
      {children}
    </div>
  )
}
  