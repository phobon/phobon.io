import useSWR from 'swr';

const useApi = (url) => {
  const fetcher = async (key) => {
    const res = await fetch(key);
    const newResult = await res.json();
    return newResult;
  };
  const { data, error } = useSWR(url, fetcher);
  return [data, error];
};

export default useApi;