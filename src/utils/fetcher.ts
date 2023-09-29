export const getFetcher = (url: string) => fetch(url).then((res) => res.json());

export const postFetcher = async <T>(
  url: string,
  options: RequestInit | undefined
): Promise<T> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
