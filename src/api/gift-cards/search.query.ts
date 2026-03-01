import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchItems, fetchAllItems } from '@/api/gift-cards/search.api';
import { GiftCardType } from '@/types';

type FetchItemsResult = {
  items: GiftCardType[],
  nextPage?: number | null
};

type searchQueryType = {
  query: string,
  city: string
}

export const useSearchQuery = ({query, city}: searchQueryType  ) => {
  return useInfiniteQuery({
    queryKey: ['items', query, city],
    queryFn: ({ pageParam = 1 }) => {
      if(query == '%%%') {
        
        return fetchAllItems(pageParam, city)
      } else {
        return fetchItems(query, pageParam, city)
      }
    },
    getNextPageParam: (lastPage: FetchItemsResult) => lastPage.nextPage,
    enabled: query.length > 1,
    initialPageParam: 1,
  });
}

