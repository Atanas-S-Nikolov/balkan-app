import styles from '@/styles/breakdown/Breakdown.module.css';

import Typography from '@mui/material/Typography'

import { getOrder } from "@/services/OrderService";
import dayjs from 'dayjs';
import BreakdownActions from '@/components/breakdown/BreakdownActions';

export async function getServerSideProps(context) {
  const order = await getOrder(context.params.orderId);
  return { props: { order } };
}

export default function BreakdownPage({ order }) {
  const { orderId, orderDate } = order;
  return (
    <div className={`${styles.grid_center} grid_center`}>
      <span className={`${styles.order_identifiers}`}>
        {orderDate
          ? <>
            <Typography>Номер на поръчка: <b>{orderId}</b></Typography>
            <Typography>Дата на поръчка: <b>{dayjs(orderDate).format('MM/DD/YYYY')}</b></Typography>
          </>
          : null
        }
      </span>
      <BreakdownActions order={order} />
    </div>
  )
}
