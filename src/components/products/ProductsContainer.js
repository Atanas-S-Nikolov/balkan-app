import styles from '@/styles/products/ProductContainer.module.css';

import CustomPagination from "../utils/CustomPagination";
import Product from "./Product";
import Typography from '@mui/material/Typography';

export default function ProductsContainer({ response }) {
  const { docs, totalDocs, totalPages } = response;
  const docsCount = docs?.length;

  return (
    <div className={`${styles.product_container} grid_center`}>
      <section className={styles.products_count_section}>
        <Typography>Изделия на страница: <b>{docsCount}</b></Typography>
        <Typography>Общо изделия: <b>{totalDocs}</b></Typography>
      </section>
      {docs?.map(product => <Product key={product.productId} product={product}/>)}
      <CustomPagination pagesCount={totalPages}/>
    </div>
  )
}
