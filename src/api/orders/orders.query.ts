import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchItems, fetchAllItems } from '@/api/gift-cards/search.api';
import { CartItemType } from '@/types';

type FetchItemsResult = {
  items: CartItemType[],
  nextPage?: number | null
};

type searchQueryType = {
  query: string,
}

export const useOrdersQuery = () => {
  return useInfiniteQuery({
    queryKey: ['orders'],
    queryFn: ({ pageParam = 1 }) => {
      return fetchAllItems(pageParam)
    },
    getNextPageParam: (lastPage: FetchItemsResult) => lastPage.nextPage,
    enabled: true,
    initialPageParam: 1,
  });
}

