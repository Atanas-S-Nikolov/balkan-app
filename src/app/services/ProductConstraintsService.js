'use server';

import { createQueryString } from "@/utils/URLUtils";

export async function getAllProducts(productId, page) {
  const productIdQueryString = productId ? createQueryString('productId', productId) : '';
  const queryString = createQueryString('page', page, productIdQueryString);
  const response = await fetch(`${process.env.SERVER_URL}/api/productConstraints?${queryString}`, {
    cache: 'no-store'
  });
  return await response.json();
}
