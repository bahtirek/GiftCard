import { RedeemerType } from "@/types";

const BASE_URL = 'https://giftcard.startng.app/redeemers';

export const fetchRedeemersAPI = async(accountIds: number[]=[], page: number) => {

  const res = await fetch(
    `${BASE_URL}`
  );

  const data = await res.json();

  const hasNextPage =
    res.headers.get('x-total-count') !== null &&
    page * 20 < Number(res.headers.get('x-total-count'));

  return {
    redeemers: data || [],
    nextPage: hasNextPage ? page + 1 : null,
  };
}

export const postRedeemerAPI = async (redeemer: RedeemerType) => {
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

export const deleteRedeemerAPI = async (redeemerId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${redeemerId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete profile");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const updateRedeemerAPI = async (redeemer: RedeemerType) => {  
  const response = await fetch(`${BASE_URL}/${redeemer.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(redeemer)
  });

  return response.json();
};