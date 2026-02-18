import { GiftCardType, ProfileType } from '@/types';
import axios from 'axios';


type ApiResponse = {
  
};

const BASE_URL = "http://localhost:3000/profile";
export const submitPhone = async (profileData: ProfileType) => {
  profileData.pin = '1234'
  
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

export const fetchTenItems = async (limit = 20, city='Tashkent') => {
/*   android
  const res = await fetch(
    `http://10.0.2.2:3000/restaurants?_page=1&address.city=${city}&_limit=${limit}`
  ); */
  const res = await fetch(
    `http://localhost:3000/restaurants?_page=1&address.city=${city}&_limit=${limit}`
  );

  const data: GiftCardType[] = await res.json();
  console.log('data', data);
  

  return {items: data};
};
