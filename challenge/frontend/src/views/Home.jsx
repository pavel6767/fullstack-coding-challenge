import React from "react";
import { Box, Heading, Text, Container, Button } from "@chakra-ui/react";

import CustomSpinner from "../components/CustomSpinner";

import useHomeLogic from "../hooks/useHomeLogic";
import CommplaintsTable from "../components/ComplaintsTable";

const Home = () => {
  const {
    district,
    loading,
    complaints: { allComplaints, topComplaintType, openCases, closedCases },
    isFilterByAccount,
    handleToggleClick,
  } = useHomeLogic();

  if (loading) return <CustomSpinner />;

  return (
    <Container maxW="container.xl" p={4}>
      <Heading as="h1" mb={4}>
        Main Dashboard
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
          All Complaints {isFilterByAccount ? "in" : "by constituents of"}{" "}
          District {district}
        </Heading>
        <Button onClick={handleToggleClick}>
          {isFilterByAccount
            ? "Complaints by My Constituents"
            : "Complaints in My District"}
        </Button>
        <CommplaintsTable
          {...{ complaints: allComplaints, isFilterByAccount }}
        />
      </Box>
    </Container>
  );
};

export default Home;
