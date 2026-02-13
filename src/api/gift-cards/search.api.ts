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

export const fetchItems = async (query: string, page: number) => {
  console.log(query);
  
  
  const res = await fetch(
    `http://localhost:3000/restaurants?name_like=${query}&_page=${page}&_limit=20`
  );

  const data = await res.json();
  console.log('data', data);
  

  const hasNextPage =
    res.headers.get('x-total-count') !== null &&
    page * 20 < Number(res.headers.get('x-total-count'));

  return {
    items: data,
    nextPage: hasNextPage ? page + 1 : null,
  };
};

export const fetchAllItems = async (page: number) => {
  const res = await fetch(
    `http://localhost:3000/restaurants?_page=${page}&_limit=20`
  );

  const data = await res.json();
  console.log('data', data);
  

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
    `http://localhost:3000/restaurants?_page=1&address.city=${city}&_limit=${limit}`
  );

  const data: GiftCardType[] = await res.json();
  console.log('data', data);
  

  return {items: data};
};
