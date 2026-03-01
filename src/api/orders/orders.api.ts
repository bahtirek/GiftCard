import { CartItemType } from '@/types';

export type Item = {
  id: string;
  name: string;
};

type ApiResponse = {
  items: Item[];
  nextPage: number | null;
};

const API_URL = 'http://localhost:3000/orders';

export const fetchOrders = async () => {
  const res = await fetch(
    `${API_URL}`
  );

  const data = await res.json();
  console.log('data', data);

    
  return {
    data
  };
};
export const fetchAllOrders = async (page: number) => {
  const res = await fetch(
    `${API_URL}?_page=${page}&_limit=20`
  );

  const data = await res.json();
  console.log('data', data);
  

  const hasNextPage =
    res.headers.get('x-total-count') !== null &&
    page * 20 < Number(res.headers.get('x-total-count'));

    console.log('hasNextPage', data, hasNextPage);
    
  return {
    items: data,
    nextPage: hasNextPage ? page + 1 : null,
  };
};

export const postOrder = async (orderData: CartItemType[]) => {
  console.log('Posting order data:', orderData);
  
  try {
    const requests = orderData.map((item) => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      item.orderDate = formattedDate;
      const { giftCard, ...itemWithoutGiftCard } = item;
      itemWithoutGiftCard.giftCardId = giftCard?.id;
      itemWithoutGiftCard.name = giftCard?.name;
      itemWithoutGiftCard.orderDate = formattedDate;
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
export const postOrder2 = async (orderData: CartItemType[]) => {
  console.log('Posting order data:', orderData);
  
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });
console.log('response', response);

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};


