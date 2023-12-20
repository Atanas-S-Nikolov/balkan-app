import { getProduct } from "./ProductConstraintsService";

async function breakdownProducts({ orderId, orderDate, inputProducts }) {
  const standards = [];
  const leftovers = [];
  let palletNum = 1;
  const promises = inputProducts.map(item => getProduct(item.productId));
  const resolved = await Promise.all(promises);
  inputProducts.forEach((item, index) => {
    const response = resolved[index];
    const productConstraint = response[0];
    if (!productConstraint) {
      console.log(item);
      return;
    }
    const { productId, quantityPerPallet, palletType } = productConstraint;
    if (quantityPerPallet) {
      const breakdownQuantity = item.quantity;
      const standardPalletsCount = parseInt(breakdownQuantity / quantityPerPallet);
      const leftoversCount = breakdownQuantity % quantityPerPallet;
      for (let index = 0; index < standardPalletsCount; index++) {
        standards.push({
          palletName: `Пале ${palletNum}`,
          productId,
          quantity: quantityPerPallet,
          palletType
        });
        ++palletNum;
      }
      if (leftoversCount > 0) {
        leftovers.push({
          productId,
          quantity: leftoversCount
        });
      }
    }
  });
  return {
    orderId,
    orderDate,
    inputProducts,
    standardPallets: standards,
    leftoverProducts: leftovers,
    palletNumber: palletNum
  };
}

export async function createOrder(order) {
  order = await breakdownProducts(order);
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(order)
  });
  return await response.json();
}

export async function getOrder(orderId) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/${orderId}`, {
    cache: 'no-store'
  });
  return await response.json();
}

export async function updateOrder(order) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order`, {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(order)
  });
  return await response.json();
}

export async function deleteOrder(orderId) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/${orderId}`, {
    method: 'DELETE',
    cache: 'no-store'
  });
  return await response.json();
}
