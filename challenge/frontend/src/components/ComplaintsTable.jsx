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
} from "@chakra-ui/react";

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
        {complaints.map((complaint) => (
          <Tr key={complaint.unique_key}>
            <Td>{complaint.unique_key}</Td>
            <Td aria-label={displayAriaLabel(complaint.complaint_type)}>
              {handleNull(complaint.complaint_type)}
            </Td>
            <Td aria-label={displayAriaLabel(complaint.complaint_type)}>
              {handleNull(complaint.opendate)}
            </Td>
            <Td aria-label={displayAriaLabel(complaint.closedate)}>
              {handleNull(complaint.closedate)}
            </Td>
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
            <Td aria-label={displayAriaLabel(isFilterByAccount ? complaint.council_dist : complaint.account)}>
              {handleNull(isFilterByAccount ? complaint.council_dist : complaint.account)}
            </Td>
            <Td aria-label={displayAriaLabel(complaint.community_board)}>
              {handleNull(complaint.community_board)}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CommplaintsTable;
