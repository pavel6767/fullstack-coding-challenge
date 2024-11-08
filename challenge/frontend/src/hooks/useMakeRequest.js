import { useToast } from "@chakra-ui/react";
import { NETWORK_ERROR_TYPES, STATUS } from "../utils";
import { getToken } from "../utils/token";

const useMakeRequest = () => {
  const toast = useToast();
  const showErrorToast = (url) => toast({
    title: "Error",
    description: `error with endpoint ${url}, please check with support`,
    status: "error",
    duration: 5000,
    isClosable: true,
  });

  const makeRequest = async (url, options = {}) => {
    const token = getToken();
    try {
      // :P:: INFO: enable to test for errors
      // const error = Math.round(Math.random())
      // if(error) throw new Error('random error')
      const response = await fetch(url, {
        ...options,
        method: options.method ?? "GET",
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
        showErrorToast(url);

        return {
          status: STATUS.FAIL,
          type: NETWORK_ERROR_TYPES.NOT_OK,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      showErrorToast(url);
      return {
        status: STATUS.FAIL,
        type: NETWORK_ERROR_TYPES.ERROR,
      };
    }
  };
  return { makeRequest };
};
export default useMakeRequest;
