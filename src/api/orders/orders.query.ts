import { useInfiniteQuery } from '@tanstack/react-query';
import { CartItemType } from '@/types';
import { fetchAllOrders } from './orders.api';

type FetchItemsResult = {
  items: CartItemType[],
  nextPage?: number | null
};

export const useOrdersQuery = () => {
  return useInfiniteQuery({
    queryKey: ['orders'],
    queryFn: ({ pageParam = 1 }) => {
      return fetchAllOrders(pageParam)
    },
    getNextPageParam: (lastPage: FetchItemsResult) => lastPage.nextPage,
    enabled: true,
    initialPageParam: 1,
  });
}

