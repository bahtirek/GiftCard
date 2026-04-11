import { useInfiniteQuery } from '@tanstack/react-query';
import { GiftCardType, RedeemerType } from '@/types';
import { fetchRedeemers } from './redeemer.api';

type FetchItemsResult = {
  items: GiftCardType[],
  nextPage?: number | null
};

type searchQueryType = {
  query: string,
  city: string
}

type FetchRedeemersResult = {
  redeemers: RedeemerType[],
  nextPage?: number | null
}

export const useRedeemersQuery = (accountIds: number[]) => {
  return useInfiniteQuery({
    queryKey: ['redeemers', accountIds],
    queryFn: ({pageParam }) => {
      return fetchRedeemers(accountIds, pageParam)
    },
    getNextPageParam: (lastPage: FetchRedeemersResult) => lastPage.nextPage,
    enabled: !!accountIds.length,
    initialPageParam: 1,
  })
}
