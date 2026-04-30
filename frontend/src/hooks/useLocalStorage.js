import { useEffect, useState } from "react";

function readStorageValue(key, initialValue) {
  if (typeof window === "undefined") {
    return typeof initialValue === "function" ? initialValue() : initialValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue === null) {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }

    return JSON.parse(storedValue);
  } catch {
    return typeof initialValue === "function" ? initialValue() : initialValue;
  }
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorageValue(key, initialValue));

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
