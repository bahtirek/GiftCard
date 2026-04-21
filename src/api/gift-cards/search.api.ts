import { GiftCardType } from '@/types';
import { normalizeError } from '@/utils/api-error';
import axios from 'axios';
import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

export type Item = {
  id: string;
  name: string;
};

export type FetchItemsResult = {
  items: GiftCardType[];
  nextPage: number | null;
};

type ApiResponse = {
  items: Item[];
  nextPage: number | null;
};

const BASE_URL = 'https://giftcard.startng.app/restaurants';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const buildPaginationResult = (
  data: GiftCardType[],
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders,
  page: number
): FetchItemsResult => {
  const totalCount = headers['x-total-count'];
  const hasNextPage = totalCount != null && page * 20 < Number(totalCount);
  return {
    items: data,
    nextPage: hasNextPage ? page + 1 : null,
  };
};

export const fetchAllItems = async (page: number, city: string) => {
try {
    const { data, headers } = await apiClient.get('', {
      params: { _page: page, _limit: 20, city },
    });
    return buildPaginationResult(data, headers, page);
  } catch (error) {
    throw normalizeError(error, 'Failed to fetch all items');
  }
};

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

export const fetchTenItems = async (limit = 20, city='Tashkent') => {
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
