import {
  Avatar,
  Box,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaAngleDown, FaBars, FaBell } from "react-icons/fa";
import { useAuth } from "../../../contexts/auth";
import { getImgLink } from "../../../utils/helper";

interface NavHeaderProps {
  toggleSidebar: () => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <HStack
      justifyContent="space-between"
      bg="white"
      rounded="lg"
      p="4"
      mb="5"
      position="sticky"
      top="0"
      shadow="md"
      zIndex="100"
    >
      <HStack>
        <Icon
          as={FaBars}
          fontSize="xl"
          _hover={{ color: "gray", cursor: "pointer" }}
          onClick={toggleSidebar}
        />
      </HStack>
      <HStack>
        <Icon as={FaBell} fontSize="lg" />
        <HStack>
          <Avatar
            bg="gray.200"
            name={user?.name}
            src={user?.img ? getImgLink(user.img) : "/img/user.png"}
            size="sm"
          />
          <Menu>
            <MenuButton as={Box}>
              <Icon as={FaAngleDown} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href="update-profile" passHref>
                  Update Profile
                </Link>
              </MenuItem>

              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default NavHeader;
