import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";
import ErrorText from "./ErrorText";

const TableOverview = ({ openCases, closedCases, topComplaintType }) => {
  const stats = [
    {
      label: "Open Cases",
      obj: openCases,
    },
    {
      label: "Closed Cases",
      obj: closedCases,
    },
    {
      label: "Top Complaint Type",
      obj: topComplaintType,
    },
  ];

  return (
    <Box mb={4} mt={6}>
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Overview
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Statistic</Th>
            <Th isNumeric>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stats.map((stat, inx) => (
            <Tr key={stat.label}>
              <Td>{stat.label}</Td>
              <Td isNumeric>
                {stat.obj.error ? <ErrorText /> : stat.obj.data}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableOverview;
