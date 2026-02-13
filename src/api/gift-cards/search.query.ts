import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchItems, fetchAllItems } from '@/api/gift-cards/search.api';
import { GiftCardType } from '@/types';

type FetchItemsResult = {
  items: GiftCardType[],
  nextPage?: number | null
};

type searchQueryType = {
  query: string,
}

export const useSearchQuery = ({query}: searchQueryType  ) => {
  console.log('query', query);
  return useInfiniteQuery({
    queryKey: ['items', query],
    queryFn: ({ pageParam = 1 }) => {
      if(query == '%%%') {
        
        return fetchAllItems(pageParam)
      } else {
        return fetchItems(query, pageParam)
      }
    },
    getNextPageParam: (lastPage: FetchItemsResult) => lastPage.nextPage,
    enabled: query.length > 1,
    initialPageParam: 1,
  });
}

