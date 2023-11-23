import { executeDbCall } from "@/lib/database";
import InputProduct from "@/models/InputProduct";

export async function POST(request) {
  const body = await request.json();
  const response = await executeDbCall(() => InputProduct.create(body), { status: 201 });
  return response;
}

export async function GET() {
  return await executeDbCall(() => InputProduct.find({}));
}

export async function DELETE() {
  return await executeDbCall(() => InputProduct.deleteMany({}));
}
