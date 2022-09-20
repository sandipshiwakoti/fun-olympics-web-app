import {
  Avatar,
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../../contexts/auth";
import { adminLinks } from "../../../data/navlinks";
import { getImgLink } from "../../../utils/helper";
import Logo from "../../common/Logo";

interface SidebarProps {
  isSidebarFull: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarFull }) => {
  const { user } = useAuth();
  const router = useRouter();
  const isActiveLink = (href: string) =>
    router.asPath === href ? true : false;

  return (
    <>
      <Box
        h="100vh"
        position="sticky"
        top="0"
        background="white"
        w={isSidebarFull ? "20rem" : "5rem"}
        transition="all linear 0.3s"
      >
        <Center>
          {isSidebarFull ? (
            <Logo size="md" color="dark" />
          ) : (
            <Logo size="xs" withoutName />
          )}
        </Center>
        <Divider shadow="dark-lg" />
        <Center>
          <HStack alignItems="center" py="4">
            <Avatar
              bg="gray.200"
              name={user?.name}
              src={user?.img ? getImgLink(user.img) : "/img/user.png"}
            />
            {isSidebarFull && (
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  {user?.name}
                </Text>
                <Text fontWeight="semibold" color="gray">
                  {user?.email}
                </Text>
              </Box>
            )}
          </HStack>
        </Center>
        <Divider shadow="dark-lg" />
        <Box>
          {adminLinks.map((link) => {
            return (
              <Box key={link.title}>
                <Link href={link.path}>
                  <Box>
                    <Tooltip
                      label={link.title}
                      aria-label="A tooltip"
                      color="white"
                      bg="purple.500"
                      isDisabled={isSidebarFull ? true : false}
                      placement="right"
                      hasArrow
                    >
                      <Center
                        color={isActiveLink(link.path) ? "white" : "gray"}
                        bg={isActiveLink(link.path) ? "purple.400" : "white"}
                        _hover={{
                          bg: "purple.400",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        <HStack
                          w={isSidebarFull ? "10rem" : "auto"}
                          py="4"
                          gap=".4rem"
                        >
                          <Icon as={link.icon} fontSize="2xl" />
                          {isSidebarFull && (
                            <Text fontWeight="bold" fontSize="lg">
                              {link.title}
                            </Text>
                          )}
                        </HStack>
                      </Center>
                    </Tooltip>
                  </Box>
                </Link>
                <Divider shadow="2xl" />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
