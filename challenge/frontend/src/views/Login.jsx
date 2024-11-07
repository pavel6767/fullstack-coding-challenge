import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
} from "@chakra-ui/react";

import { UserContext } from "../context/User";
import { getToken } from "../utils/token";

const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // :P:: TODO: add a loading state
    await login({ username, password });
    if (getToken()) navigate("/home");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.50"
    >
      <Box
        p={8}
        maxWidth="400px"
        w="80%"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <Heading mb={6} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
export default Login;
