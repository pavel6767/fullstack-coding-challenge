import { Spinner, Center } from "@chakra-ui/react";

const CustomSpinner = ({ size = "xl" }) => (
  <Center height="100vh">
    <Spinner size="xl" />
  </Center>
);

export default CustomSpinner;
