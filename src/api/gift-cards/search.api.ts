import { GiftCardType } from '@/types';
import axios from 'axios';

export type Item = {
  id: string;
  name: string;
};

type ApiResponse = {
  items: Item[];
  nextPage: number | null;
};

/* export const fetchItems = async (
  query: string,
  page: number
): Promise<ApiResponse> => {
  const { data } = await axios.get(
    'https://api.example.com/items',
    {
      params: {
        search: query,
        page,
        limit: 20,
      },
    }
  );

  return data;
}; */


/* export const fetchItems = async (query: string, page: number) => {
  const url = new URL('https://rickandmortyapi.com/api/character');
  url.searchParams.append('page', `${page}`);
  if (query) {
    url.searchParams.append('name', query);
  }
  const response = await axios.get(url.toString());
  
  return {
    items: response.data.results,
    nextPage: response.data.info.next
      ? page + 1
      : null,
  };
}; */

const BASE_URL = 'https://giftcard.startng.app/restaurants';

export const fetchItems = async (query: string, page: number, city: string) => {
  const res = await fetch(
    `${BASE_URL}?name_like=${query}&_page=${page}&_limit=20&address.city=${city}`
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

export const fetchAllItems = async (page: number, city: string) => {
  const res = await fetch(
    `${BASE_URL}?_page=${page}&_limit=20`
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

export const fetchTenItems = async (limit = 20, city='Tashkent') => {
/*   android
  const res = await fetch(
    `http://10.0.2.2:3000/restaurants?_page=1&address.city=${city}&_limit=${limit}`
  ); */
  const res = await fetch(
    `${BASE_URL}?_page=1&_limit=${limit}`
  );
  
  const data: GiftCardType[] = await res.json();
  
  return {items: data};
};


export const fetchAccounts = async(accountIds: number[], page: number) => {
  const query = accountIds.map(id => `id=${id}`).join("&");

  const res = await fetch(
    `${BASE_URL}?${query}`
  );

  const data = await res.json();

  const hasNextPage =
    res.headers.get('x-total-count') !== null &&
    page * 20 < Number(res.headers.get('x-total-count'));

  return {
    accounts: data,
    nextPage: hasNextPage ? page + 1 : null,
  };
}

export const fetchGiftCardById = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}?id=${id}`
  );

  const data: GiftCardType[] = await res.json();

  return {
    data: data[0]
  };
}
