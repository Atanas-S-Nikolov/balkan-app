import ProductSearch from "@/components/products/ProductSearch";
import CreateProductForm from "@/components/utils/CreateProductForm";

export default function ProductsLayout({ children }) {
  return (
    <div className="grid_center">
      <h1>Изделия</h1>
      <CreateProductForm/>
      <ProductSearch/>
      {children}
    </div>
  )
}
  