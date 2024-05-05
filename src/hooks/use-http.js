import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      setIsLoading(true);
      setHasError(null);
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!response.ok) {
        throw new Error("Some errors happen");
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      setHasError(error);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error: hasError,
    sendRequest,
  };
};

export default useHttp;
