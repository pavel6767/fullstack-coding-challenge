import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./context/User";

const Providers = ({  children }) => {
  return (
    <UserProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </UserProvider>
  );
};
export default Providers;
