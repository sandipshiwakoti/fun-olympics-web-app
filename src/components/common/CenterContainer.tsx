import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface CenterContainerProps {
  children: ReactNode;
}

const CenterContainer: React.FC<CenterContainerProps> = ({ children }) => {
  return (
    <Box maxW="1170px" mx="auto">
      {children}
    </Box>
  );
};

export default CenterContainer;
