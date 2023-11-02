'use server';

export async function getProduct(productId, page) {
  const response = await fetch(`${process.env.SERVER_URL}/api/productConstraints/${productId}`, {
    cache: 'no-store'
  });
  return await response.json();
}

export async function getAllProducts() {
  const response = await fetch(`${process.env.SERVER_URL}/api/productConstraints`, {
    cache: 'no-store'
  });
  return await response.json();
}
