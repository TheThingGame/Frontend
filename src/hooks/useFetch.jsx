import {useState} from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (call) => {
    setLoading(true);
    setError(null);

    try {
      const response = await call();
      setData(response.data);
      return {data: response?.data, loading: false, error: null};
    } catch (err) {
      setError(err.response.data);
      return {data: null, loading: false, error: err.response.data};
    } finally {
      setLoading(false);
    }
  };

  return {data, error, loading, fetchData};
};
export default useFetch;
