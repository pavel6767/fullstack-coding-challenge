import React, { useContext } from "react";
import { Heading, Container, Button, Center } from "@chakra-ui/react";

import CustomSpinner from "../components/CustomSpinner";

import useHomeLogic from "../hooks/useHomeLogic";
import CommplaintsTable from "../components/ComplaintsTable";
import { ComplaintsContext } from "../context/Complaints";
import { UserContext } from "../context/User";
import TableOverview from "../components/TableOverview";

const Home = () => {
  const { loading, isFilterByAccount, handleToggleClick } = useHomeLogic();
  const {
    complaints: { allComplaints, topComplaintType, openCases, closedCases },
  } = useContext(ComplaintsContext);
  const {
    user: { district },
  } = useContext(UserContext);

  return (
    <Container maxW="container.xl" p={4}>
      <Heading as="h1" mb={4} textAlign="center">
        Complaints {isFilterByAccount ? "in" : "by constituents of"} District{" "}
        {district}
      </Heading>
      <Center>
        <Button
          onClick={handleToggleClick}
          disabled={isFilterByAccount}
          colorScheme="blue"
          borderRadius="10px 0px 0px 10px"
        >
          Complaints in My District
        </Button>
        <Button
          onClick={handleToggleClick}
          disabled={!isFilterByAccount}
          colorScheme="blue"
          borderRadius="0px 10px 10px 0px"
        >
          Complaints by my Constituents
        </Button>
      </Center>

      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <TableOverview {...{ topComplaintType, openCases, closedCases }} />
          <CommplaintsTable
            {...{ complaints: allComplaints, isFilterByAccount }}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
