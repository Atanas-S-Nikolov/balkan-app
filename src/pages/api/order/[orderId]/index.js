import { DELETE, GET } from "@/constants/RequestMethodsConstants";
import { executeDbCall } from "@/lib/database";
import Order from "@/models/Order";

export default async function handler(req, res) {
  const { method, query } = req;
  const { orderId } = query;
  if (method === GET) {
    const order = await executeDbCall(() => Order.findOne({ orderId: orderId }));
    res.status(200).json(order);
  } else if (method === DELETE) {
    const deleted = await executeDbCall(() => Order.deleteOne({ orderId: orderId }));
    res.status(200).json(deleted);
  }
}
