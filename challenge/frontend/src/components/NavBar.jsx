import React from "react";
import { Box, Flex, Spacer, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { ROUTES } from "../utils";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  
  const handleLogOut = async () => {
    setLoading(true);
    await logout();
    navigate(ROUTES.LOGIN);
    setLoading(false);
  };

  return (
    <Box bg="teal.700" px={4} py={2}>
      <Flex align="center">
        <Box>
          <Text as="h1" fontSize="xl" color="white">
            Complaints App
          </Text>
        </Box>
        <Spacer />
        <Text fontSize="md" color="white" mr={4}>
          Hi, {user.full_name}
        </Text>
        <Button
          onClick={handleLogOut}
          isLoading={loading}
          loadingText="Logging out..."
          colorScheme="red"
          variant="outline"
          disabled={loading}
        >
          Log out
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
