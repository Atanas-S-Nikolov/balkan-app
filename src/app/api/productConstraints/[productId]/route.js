import { executeDbCall } from "@/lib/database";
import ProductConstraint from "@/models/ProductConstraint";

export async function GET(request, { params }) {
  const productId = params.productId;
  return await executeDbCall(() => ProductConstraint.find({ productId: {$regex: productId} }));
}