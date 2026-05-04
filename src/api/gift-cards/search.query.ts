import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchItems, fetchAllItems, fetchAccounts } from '@/api/gift-cards/search.api';
import { GiftCardType } from '@/types';
import { shouldRetry } from '@/utils/api-error';

type FetchItemsResult = {
  items: GiftCardType[],
  nextPage?: number | null
};

type SearchQueryParams = {
  query: string,
  city: string
}

type FetchAccountsResult = {
  accounts: GiftCardType[],
  nextPage?: number | null
}

const STALE_TIME = 1000 * 60 * 2; // 2 minutes

export const useSearchQuery = ({ query, city }: SearchQueryParams) => {
  return useInfiniteQuery<FetchItemsResult, Error>({
    queryKey: ['items', query, city],
    queryFn: ({ pageParam = 1 }) => {
      const page = pageParam as number;
      return query === '%%%'
        ? fetchAllItems(page, city)
        : fetchItems(query, page, city);
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
    enabled: query.length > 1,
    staleTime: STALE_TIME,
    retry: (failureCount, error) => {
      if (!shouldRetry(error)) return false;
      return failureCount < 2; // retry up to 2 times for server/network errors
    },
  });
};

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
