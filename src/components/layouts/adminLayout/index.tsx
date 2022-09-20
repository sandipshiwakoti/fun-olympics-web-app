import { Box, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { useAuth } from "../../../contexts/auth";
import NavHeader from "./NavHeader";
import Sidebar from "./Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isSidebarFull, setIsSiderbarFull] = useState(false);

  if (user && user?.role === "user") {
    router.push("/games");
    return <>Not Authorized</>;
  }

  const toggleSidebar = () => {
    setIsSiderbarFull(!isSidebarFull);
  };

  return (
    <>
      <HStack bg="gray.100" alignItems="start" gap="0" spacing="0">
        <Sidebar isSidebarFull={isSidebarFull} />
        <Box flex="1" p="4">
          <NavHeader toggleSidebar={toggleSidebar} />
          <Box bg="white" p="4" rounded="md">
            {children}
          </Box>
        </Box>
      </HStack>
    </>
  );
};

export default AdminLayout;
