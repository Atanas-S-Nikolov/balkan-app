import { executeDbCall } from "@/lib/database";
import ProductConstraint from "@/models/ProductConstraint";

export default async function handler(req, res) {
  const { productId } = req.query;
  const products = await executeDbCall(() => ProductConstraint.find({ productId: {$regex: productId} }));
  res.status(200).json(products)
}
