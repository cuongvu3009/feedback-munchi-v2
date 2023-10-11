import axios from "axios";

export const getFetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
  }
};

export const postFetcher = async (
  url: string,
  payload: RequestInit | undefined
) => {
  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to post data to ${url}: ${error.message}`);
  }
};
