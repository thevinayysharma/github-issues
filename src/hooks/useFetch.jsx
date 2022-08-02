import { useState, useEffect } from 'react';
const url = 'https://api.github.com/repos/facebook/react/issues?per_page=100';

//custom hook for heavy-lifting
function useFetch() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData(url);
  }, [url]);
  return { loading, data, error };
}

export default useFetch;
