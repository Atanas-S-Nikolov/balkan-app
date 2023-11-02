import { executeDbCall } from "@/lib/database";
import ProductConstraint from "@/models/ProductConstraint";

export async function POST(request) {
  return executeDbCall(async () => ProductConstraint.create(await request.json()))
}

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get('page')) || 1;
  const query = ProductConstraint.find({});
  return await executeDbCall(() => ProductConstraint.paginate(query, {
    page: page,
    limit: 50,
    sort: { productId: 1 }
  }));
} 
