import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import * as queryString from 'query-string'

export default function useGet<T>(path: string, params?: Record<string, string | number>) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);


  useEffect(() => {
    axios.get(path + (params ? ('?' + queryString.stringify(params)) : ''))
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        setError(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [path, queryString.stringify(params || {})]);

  return {
    data,
    setData,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      axios.get(path + (params ? ('?' + queryString.stringify(params)) : ''))
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          setError(err.response.data);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }
}