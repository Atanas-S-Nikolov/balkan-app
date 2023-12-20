import { createQueryString } from "@/utils/URLUtils";

export async function createProduct(product) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productConstraints`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(product)
  });
  return await response.json();
}

export async function getProduct(productId) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productConstraints/${productId}`, { cache: 'no-store' });
  return await response.json();
}

export async function getProducts(productId, page) {
  const productIdQueryString = productId ? createQueryString('productId', productId) : '';
  const queryString = createQueryString('page', page, productIdQueryString);
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productConstraints?${queryString}`, {
    cache: 'no-store'
  });
  return await response.json();
}

export async function updateProduct(product) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productConstraints`, {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(product)
  });
  return await response.json();
}

export async function deleteProduct(productId) {
  const productIdQueryString = createQueryString(`productId`, productId);
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productConstraints?${productIdQueryString}`, {
    method: 'DELETE',
    cache: 'no-store'
  });
  return await response.json();
}
