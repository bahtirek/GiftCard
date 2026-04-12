import { GiftCardType } from '@/types';


const BASE_URL = "https://giftcard.startng.app/restaurants";

export const updateAccountAPI = async (account: GiftCardType) => {  
  const response = await fetch(`${BASE_URL}/${account.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account)
  });

  return response.json();
};

/* const uploadImage = async (asset) => {
  const formData = new FormData();
  
  formData.append('photo', {
    uri: Platform.OS === 'ios' ? asset.uri.replace('file://', '') : asset.uri,
    type: asset.type, // e.g., 'image/jpeg'
    name: asset.fileName || 'upload.jpg',
  });

  try {
    const response = await fetch('YOUR_SERVER_URL/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const result = await response.json();
    console.log('Upload success:', result);
  } catch (error) {
    console.error('Upload error:', error);
  }
}; */
