import React, { useEffect, useState } from "react";

const url = "https://fakestoreapi.com/products";

function useFetch(urlParams) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const respone = await fetch(url);
      const data = await respone.json();
      if (data) {
        setData(data);
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(`${url}${urlParams}`);
  }, [urlParams]);

  return { data, loading, error };
}

export default useFetch;
