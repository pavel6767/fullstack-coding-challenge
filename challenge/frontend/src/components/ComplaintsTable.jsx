import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Tooltip,
  Box,
  Heading,
} from "@chakra-ui/react";
import ErrorText from "./ErrorText";
import TableCell from "./TableCell";

const CommplaintsTable = ({ complaints, isFilterByAccount }) => {
  const truncateText = (text, maxLength = 30) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const handleNull = (text) => text || "---";

  const displayAriaLabel = (field) => (field ? undefined : "Not available");

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        All Complaints
      </Heading>
      {complaints.error ? (
        <ErrorText message="complaints error" />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Complaint ID</Th>
              <Th>Complaint Type</Th>
              <Th>Open Date</Th>
              <Th>Close Date</Th>
              <Th>Description</Th>
              <Th>
                <Text>Borough</Text>
                <Text>City</Text>
                <Text>Zipcode</Text>
              </Th>
              <Th>{isFilterByAccount ? "Filer's" : "Filing"} District</Th>
              <Th>Comm. Board</Th>
            </Tr>
          </Thead>
          <Tbody>
            {complaints.data.map((complaint) => (
              <Tr key={complaint.unique_key}>
                <Td>{complaint.unique_key}</Td>
                {[
                  complaint.complaint_type,
                  complaint.opendate,
                  complaint.closedate,
                ].map((value, vInx) => (
                  <TableCell
                    {...{ key: `${complaint.unique_key}-${vInx}-left`, value }}
                  />
                ))}
                <Td aria-label={displayAriaLabel(complaint.descriptor)}>
                  {handleNull(complaint.descriptor).length > 30 ? (
                    <Tooltip
                      label={complaint.descriptor}
                      aria-label="Full Description"
                    >
                      <Text isTruncated maxWidth="150px">
                        {truncateText(handleNull(complaint.descriptor))}
                      </Text>
                    </Tooltip>
                  ) : (
                    handleNull(complaint.descriptor)
                  )}
                </Td>
                <Td>
                  <Text aria-label={displayAriaLabel(complaint.borough)}>
                    {handleNull(complaint.borough)}
                  </Text>
                  <Text aria-label={displayAriaLabel(complaint.city)}>
                    {handleNull(complaint.city)}
                  </Text>
                  <Text aria-label={displayAriaLabel(complaint.zip)}>
                    {handleNull(complaint.zip)}
                  </Text>
                </Td>
                {[
                  isFilterByAccount
                    ? complaint.council_dist
                    : complaint.account,
                  complaint.community_board,
                ].map((value, vInx) => (
                  <TableCell
                    {...{ key: `${complaint.unique_key}-${vInx}-right`, value }}
                  />
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default CommplaintsTable;
