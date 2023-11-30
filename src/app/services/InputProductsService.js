'use server';

export async function createInputProducts(inputProducts) {
  console.log(inputProducts)
  const response = await fetch(`${process.env.PUBLIC_SERVER_URL}/api/inputProducts`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify([...inputProducts])
  });
  return await response.json();
}

export async function getInputProducts() {
  const response = await fetch(`${process.env.PUBLIC_SERVER_URL}/api/inputProducts`, {
    cache: 'no-store'
  });
  return await response.json();
}

export async function deleteInputProducts() {
  const response = await fetch(`${process.env.PUBLIC_SERVER_URL}/api/inputProducts`, {
    method: 'DELETE',
    cache: 'no-store'
  });
  return await response.json();
}
