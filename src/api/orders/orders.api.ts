import { CartItemType } from '@/types';
import { getDate } from '@/utils/utils';

export type Item = {
  id: string;
  name: string;
};

const API_URL = 'http://localhost:3000/orders';

export const fetchOrderById = async (orderId: string) => {
  const res = await fetch(
    `${API_URL}?id=${orderId}`
  );

  const data = await res.json();

  return {
    data: data[0]
  };
};

export const fetchAllOrders = async (page: number) => {
  const res = await fetch(
    `${API_URL}?_page=${page}&_limit=20`
  );

  const data = await res.json();
  
  const hasNextPage =
    res.headers.get('x-total-count') !== null &&
    page * 20 < Number(res.headers.get('x-total-count'));
    
  return {
    items: data,
    nextPage: hasNextPage ? page + 1 : null,
  };
};

export const postOrder = async (orderData: CartItemType[]) => {
  try {
    const requests = orderData.map((item) => {
      const dateNow = getDate();
      item.orderDate = dateNow;
      const { giftCard, ...itemWithoutGiftCard } = item;
      itemWithoutGiftCard.giftCardId = giftCard?.id;
      itemWithoutGiftCard.name = giftCard?.name;
      itemWithoutGiftCard.orderDate = dateNow;
      return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemWithoutGiftCard)
      });
    });

    await Promise.all(requests);

    return { success: true };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const updateBalance = async (orderId: string, balance: string, dateNow: string) => {
  await fetch(`${API_URL}/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      balance: balance,
      redeemDate: dateNow
    })
  });
}


