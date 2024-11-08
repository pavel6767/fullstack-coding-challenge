import { NETWORK_ERROR_TYPES, STATUS } from ".";
import { getToken } from "./token";

const makeRequest = async (url, options = {}) => {
  const token = getToken();
  try {
    const response = await fetch(url, {
      ...options,
      method: options.method ?? 'GET',
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
      
      // :P:: TODO: handle different response failures, 400s vs 500s
      return {
        status: STATUS.FAIL,
        type: NETWORK_ERROR_TYPES.NOT_OK,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("makeRequest error:", { url, error });
    return {
      status: STATUS.FAIL,
      type: NETWORK_ERROR_TYPES.ERROR,
    };
  }
};

export default makeRequest;
