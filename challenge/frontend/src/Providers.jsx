import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./context/User";
import { ComplaintsProvider } from "./context/Complaints";

const providers = [ChakraProvider, UserProvider, ComplaintsProvider];

const Providers = ({ children }) => {
  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};
export default Providers;
