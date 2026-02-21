import { GiftCardType, ProfileType } from '@/types';
import axios from 'axios';


type ApiResponse = {
  
};

const BASE_URL = "http://localhost:3000/profile";
export const submitPhone = async (profileData: ProfileType) => {
  profileData.pin = '123456'
  
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const fetchProfileByPhone = async (phone: string) => {
  const res = await fetch(
    `${BASE_URL}?phone=${phone}`
  );
  const data: ProfileType[] = await res.json();
  const profile = data[0]
  
  return {profile};
}

export const updateProfile = async (profileData: ProfileType) => {  
  const response = await fetch(`${BASE_URL}/${profileData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData)
  });

  return response.json();
};

/* export const updateRestaurantPatch = async (id, data) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return response.json();
}; */
