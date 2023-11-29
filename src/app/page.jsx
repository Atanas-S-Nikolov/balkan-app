import styles from './page.module.css';

import App from '@/components/App';

import { executeDbCall } from "@/lib/database";
import InputProduct from "@/models/InputProduct";

async function getProducts() {
  'use server';
  const request = await executeDbCall(() => InputProduct.find({}));
  return await request.json();
}

export default function Home() {
  return (
    <ul className={`${styles.home} grid-center`}>
      <App inputProductsRequest={getProducts}/>
    </ul>
  )
}
