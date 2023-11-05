import { executeDbCall } from "@/lib/database";
import ProductConstraint from "@/models/ProductConstraint";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { status } = await executeDbCall(() => ProductConstraint.create(body), { status: 201 });
  if (status === 201) {
    return NextResponse.json({
      message: 'Изделието е създадено'
    });
  }
  return NextResponse.json({
    message: 'Изделието не можа да се създаде'
  });
}

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get('page')) || 1;
  const productId = searchParams.get('productId');
  const parameters = productId ? { productId: {$regex: productId} } : {};
  const query = ProductConstraint.find(parameters);
  return await executeDbCall(() => ProductConstraint.paginate(query, {
    page: page,
    limit: 50,
    sort: { productId: 1 }
  }));
}

export async function PUT(request) {
  const body = await request.json();
  const { status } = await executeDbCall(() => ProductConstraint.findOneAndUpdate({ productId: body.productId }, body));
  if (status === 200) {
    return NextResponse.json({
      message: 'Изделието беше променено'
    });
  }
  return NextResponse.json({
    message: `Изделието не съществува`
  });
}

export async function DELETE(request) {
  const productId = request.nextUrl.searchParams.get('productId');
  if (productId) {
    const { status } = await executeDbCall(() => ProductConstraint.deleteOne({ productId: productId }));
    if (status === 200) {
      return NextResponse.json({
        message: 'Изделието е изтрито'
      });
    }
  }
  return NextResponse.json({
    message: `Изделието не съществува`
  });
}
