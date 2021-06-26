export const fetcher = async (uri: string) => {
  const response = await fetch(uri);
  return response.json();
};

export default fetcher;
