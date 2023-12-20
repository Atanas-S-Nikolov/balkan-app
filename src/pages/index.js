import Link from 'next/link';

import { executeDbCall } from "@/lib/database";
import Order from "@/models/Order";

const BREAKDOWN_INPUT_LINK = '/breakdown/input';
const PRODUCTS_LINK = '/products?page=1';

export async function getServerSideProps() {
  const orders = await executeDbCall(() => Order.find({}));
  const isOrderExists = orders && orders.length === 1;
  const orderId = orders[0]?.orderId;
  const breakdownHref = isOrderExists ? `/breakdown/${orderId}` : BREAKDOWN_INPUT_LINK;
  return { props: { breakdownHref } }
}

export default function Home({ breakdownHref = '' }) {  
  return (
    <ul className={'home grid_center'}>
      <li>
        <Link href={breakdownHref}>Разбивка</Link>
      </li>
      <li>
        <Link href={PRODUCTS_LINK}>Изделия</Link>
      </li>
    </ul>
  )
}
