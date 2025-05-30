import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const useDebouncedQueryParam = (
  key: string,
  value: string,
  delay: number = 500
): [string, boolean] => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isTyping, setIsTyping] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsTyping(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsTyping(false);
      const newParams = new URLSearchParams(searchParams.toString());
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      navigate(`?${newParams.toString()}`, { replace: true });
      setSearchParams(newParams);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, key, navigate, searchParams, setSearchParams, value]);

  return [debouncedValue, isTyping];
};
