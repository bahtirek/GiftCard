import { RedeemerType } from "@/types";

const BASE_URL = 'https://giftcard.startng.app/redeemers';

export const fetchRedeemers = async(accountIds: number[]=[], page: number) => {

  const res = await fetch(
    `${BASE_URL}`
  );

  const data = await res.json();
console.log('redeemer API data',data);

  const hasNextPage =
    res.headers.get('x-total-count') !== null &&
    page * 20 < Number(res.headers.get('x-total-count'));

  return {
    redeemers: data || [],
    nextPage: hasNextPage ? page + 1 : null,
  };
}

export const postRedeemer = async (redeemer: RedeemerType) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(redeemer)
    });

    if (!response.ok) {
      throw new Error("Failed to create profile");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}