import { useInfiniteQuery } from '@tanstack/react-query';
import { CartItemType } from '@/types';
import { fetchAllOrders } from './orders.api';

type FetchItemsResult = {
  items: CartItemType[],
  nextPage?: number | null
};

export const useOrdersQuery = (profileId: string) => {
  return useInfiniteQuery({
    queryKey: ['orders'],
    queryFn: ({ pageParam = 1 }) => {
      return fetchAllOrders(pageParam, profileId)
    },
    getNextPageParam: (lastPage: FetchItemsResult) => lastPage.nextPage,
    enabled: true,
    initialPageParam: 1,
  });
}

