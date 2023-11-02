import { executeDbCall } from "@/lib/database";
import ProductConstraint from "@/models/ProductConstraint";

export async function GET(request, { params }) {
  const productId = params.productId;
  console.log(params)
  const query = ProductConstraint.find({ productId: {$regex: productId} });
  return await executeDbCall(() => ProductConstraint.paginate(query, {
    page: 1,
    limit: 50,
    sort: { productId: 1 }
  }));
}
