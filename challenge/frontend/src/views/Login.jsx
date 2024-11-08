import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { UserContext } from "../context/User";
import { ROUTES, STATUS } from "../utils";

const Login = () => {
  const { login } = useContext(UserContext);
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const response = await login(loginData);
    setLoading(false);

    if (response.status === STATUS.SUCCESS) {
      navigate(ROUTES.HOME);
      toast({
        title: "Login success!",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    }

  };

  useEffect(() => {
    setDisableButton(!loginData.username.length && !loginData.password.length);
  }, [loginData.username, loginData.password]);

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
                name="username"
                value={loginData.username}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInput}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              disabled={disableButton || loading}
              isLoading={loading}
              loadingText="Logging in..."
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
export default Login;
