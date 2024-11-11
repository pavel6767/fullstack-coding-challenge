import { Text } from "@chakra-ui/react";

const ErrorText = ({ message = "Error" }) => (
  <Text color="red.500" fontSize="lg" mt={2} role="alert" as="span">
    {message}
  </Text>
);

export default ErrorText;
