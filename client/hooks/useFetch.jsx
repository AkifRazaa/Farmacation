import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (query = "", params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://192.168.100.10:5000/${query}`,
        { params } // Pass params as the second argument
      );

      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
