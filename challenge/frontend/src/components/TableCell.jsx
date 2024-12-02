import React from "react";
import { Td, Text } from "@chakra-ui/react";

const TableCell = ({ key, value }) => {
  const handleNull = (text) => text || "---";
  const displayAriaLabel = (field) => (field ? undefined : "Not available");

  return (
    <Td key={key}>
      <Text aria-label={displayAriaLabel(value)}>{handleNull(value)}</Text>
    </Td>
  );
};

export default TableCell;
