import { executeDbCall } from "@/lib/database";
import ProductConstraint from "@/models/ProductConstraint";
import { handleServerErrors } from "@/utils/ApiUtils";

export default async function handler(req, res) {
  const { productId } = req.query;
  try {
    const product = await executeDbCall(() => ProductConstraint.findOne({ productId: productId }));
    res.status(200).json(product)
  } catch (error) {
    handleServerErrors(error, res);
  }
}
