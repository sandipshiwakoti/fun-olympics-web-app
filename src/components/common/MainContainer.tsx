import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
  bg: string;
}

const MainContainer: React.FC<MainContainerProps> = ({ children, bg }) => {
  return <Box bg={bg}>{children}</Box>;
};

export default MainContainer;
