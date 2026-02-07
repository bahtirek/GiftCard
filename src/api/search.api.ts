import axios from 'axios';

export type Item = {
  id: string;
  name: string;
};

type ApiResponse = {
  items: Item[];
  nextPage: number | null;
};

/* export const fetchItems = async (
  query: string,
  page: number
): Promise<ApiResponse> => {
  const { data } = await axios.get(
    'https://api.example.com/items',
    {
      params: {
        search: query,
        page,
        limit: 20,
      },
    }
  );

  return data;
}; */


export const fetchItems = async (query: string, page: number) => {
  const url = new URL('https://rickandmortyapi.com/api/character');
  url.searchParams.append('page', `${page}`);
  if (query) {
    url.searchParams.append('name', query);
  }
  const response = await axios.get(url.toString());
  
  return {
    items: response.data.results,
    nextPage: response.data.info.next
      ? page + 1
      : null,
  };
};