const BASE_URL = 'https://giftcard.startng.app/redeemers';

export const fetchRedeemers = async(accountIds: number[]=[], page: number) => {

  const res = await fetch(
    `${BASE_URL}`
  );

  const data = await res.json();
console.log(data);

  const hasNextPage =
    res.headers.get('x-total-count') !== null &&
    page * 20 < Number(res.headers.get('x-total-count'));

  return {
    redeemers: data || [],
    nextPage: hasNextPage ? page + 1 : null,
  };
}