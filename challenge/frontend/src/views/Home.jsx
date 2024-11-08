import React from "react";
import { Box, Heading, Text, Container } from "@chakra-ui/react";

import CustomSpinner from "../components/CustomSpinner";

import useHomeLogic from "../hooks/useHomeLogic";
import CommplaintsTable from "../components/ComplaintsTable";

const Home = () => {
  const { district, loading, openCases, closedCases, topComplaintType, complaints } =
    useHomeLogic();

  if (loading) return <CustomSpinner />;

  return (
    <Container maxW="container.xl" p={4}>
      <Heading as="h1" mb={4}>
        Dashboard
      </Heading>
      <Box mb={4}>
        <Text fontSize="lg">
          <Text fontWeight="bold" as="span">
            Open Cases:&nbsp;
          </Text>
          {openCases}
        </Text>
        <Text fontSize="lg">
          <Text fontWeight="bold" as="span">
            Closed Cases:&nbsp;
          </Text>
          {closedCases}
        </Text>
        <Text fontSize="lg">
          <Text fontWeight="bold" as="span">
            Top Complaint Type:&nbsp;
          </Text>
          {topComplaintType}
        </Text>
      </Box>

      <Box>
        <Heading as="h2" size="lg" mb={4}>
          All Complaints in District {district}
        </Heading>
        <CommplaintsTable complaints={complaints} />
      </Box>
    </Container>
  );
};

export default Home;
