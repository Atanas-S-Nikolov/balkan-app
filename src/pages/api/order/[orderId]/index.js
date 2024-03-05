import { DELETE, GET } from "@/constants/RequestMethodsConstants";
import { executeDbCall } from "@/lib/database";
import Order from "@/models/Order";
import { handleServerErrors } from "@/utils/ApiUtils";

export default async function handler(req, res) {
  const { method, query } = req;
  const { orderId } = query;
  try {
    if (method === GET) {
      const order = await executeDbCall(() => Order.findOne({ orderId: orderId }));
      res.status(200).json(order);
    } else if (method === DELETE) {
      const deleted = await executeDbCall(() => Order.deleteOne({ orderId: orderId }));
      res.status(200).json(deleted);
    }
  } catch (error) {
    handleServerErrors(error, res);
  }
}
