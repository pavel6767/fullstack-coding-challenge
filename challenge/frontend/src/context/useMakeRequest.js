import { RESPONSE_OBJECT, STATUS } from "../utils";
import { getToken } from "../utils/token";

export const useMakeRequest = () => {
  const token = getToken()
  const makeRequest = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          ...(token && { Authorization: `Token ${token}` }),
        },
      });

      if (!response.ok) {
        console.error("HTTP error:", response.statusText, {
          url,
          status: response.status,
        });
        return RESPONSE_OBJECT(STATUS.FAIL);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("makeRequest error:", { url, error });
      return RESPONSE_OBJECT(STATUS.FAIL);
    }
  };
  return { makeRequest };
};
