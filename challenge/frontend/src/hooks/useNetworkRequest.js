import { useToast } from "@chakra-ui/react";
import { NETWORK_ERROR_TYPES, STATUS, TOAST_STATUS } from "../utils";
import { getToken } from "../utils/token";

const useNetworkRequest = () => {
  const toast = useToast();
  const showToast = ({ title, status, description }) =>
    toast({
      title,
      description,
      status,
      duration: 2500,
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
        console.error("makeRequest error:", response.statusText, {
          url,
          status: response.status,
        });
        showToast({
          title: "Error",
          status: TOAST_STATUS.ERROR,
          description: `error with this request, please try again`,
        });
        return {
          status: STATUS.FAIL,
          type: NETWORK_ERROR_TYPES.NOT_OK,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("makeRequest error:", {
        url,
        message: error.message,
      });
      showToast({
        title: "Error",
        status: TOAST_STATUS.ERROR,
        description: `error with endpoint ${url}, please check with support`,
      });
      return {
        status: STATUS.FAIL,
        type: NETWORK_ERROR_TYPES.ERROR,
      };
    }
  };
  return { makeRequest, showToast };
};
export default useNetworkRequest;
