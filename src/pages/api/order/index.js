import { POST, PUT } from "@/constants/RequestMethodsConstants";
import { executeDbCall } from "@/lib/database";
import Order from "@/models/Order";
import { handleServerErrors } from "@/utils/ApiUtils";

export default async function handler(req, res) {
  const { method, body } = req;
  try {
    if (method === POST) {
      const order = await executeDbCall(() => Order.create(body));
      res.status(201).json(order);
    } else if (method === PUT) {
      const order = await executeDbCall(() => Order.findOneAndUpdate({ orderId: body.orderId }, body));
      res.status(200).json(order);
    }
  } catch (error) {
    handleServerErrors(error, res);
  }
}
