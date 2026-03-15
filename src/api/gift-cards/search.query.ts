import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchItems, fetchAllItems, fetchAccounts } from '@/api/gift-cards/search.api';
import { GiftCardType } from '@/types';

type FetchItemsResult = {
  items: GiftCardType[],
  nextPage?: number | null
};

type searchQueryType = {
  query: string,
  city: string
}

type FetchAccountsResult = {
  accounts: GiftCardType[],
  nextPage?: number | null
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

export const useAccountsQuery = (accountIds: number[]) => {
  return useInfiniteQuery({
    queryKey: ['items', accountIds],
    queryFn: ({pageParam }) => {
      return fetchAccounts(accountIds, pageParam)
    },
    getNextPageParam: (lastPage: FetchAccountsResult) => lastPage.nextPage,
    enabled: !!accountIds.length,
    initialPageParam: 1,
  })
}
