import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { links } from "../../../data/navlinks";
import CenterContainer from "../../common/CenterContainer";
import Logo from "../../common/Logo";
import MainContainer from "../../common/MainContainer";
import { FaAngleDown } from "react-icons/fa";
import { useAuth } from "../../../contexts/auth";
import { getImgLink } from "../../../utils/helper";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <MainContainer bg="white">
      <CenterContainer>
        <HStack px="3" justifyContent="space-between">
          <NextLink href="/">
            <Link cursor="pointer">
              <Logo size="md" color="dark" />
            </Link>
          </NextLink>
          <HStack gap="12">
            {links.map(({ title, path }) => (
              <NextLink href={path} key={path}>
                <Link
                  fontWeight="semibold"
                  style={{ textDecoration: "none" }}
                  _hover={{
                    color: "teal.500",
                  }}
                >
                  {title}
                </Link>
              </NextLink>
            ))}
          </HStack>

          {user ? (
            <HStack>
              <Avatar
                bg="gray.200"
                name={user?.name}
                src={user?.img ? getImgLink(user.img) : "/img/user.png"}
              />
              <Menu>
                <MenuButton as={Box}>
                  <Text
                    textTransform="capitalize"
                    fontWeight="bold"
                    color="purple.800"
                  >
                    {user?.name} <Icon as={FaAngleDown} />
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <NextLink href="/auth/update-profile" passHref>
                      Update Profile
                    </NextLink>
                  </MenuItem>

                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : (
            <HStack>
              <NextLink href="/auth/login" passHref>
                <Button>Login</Button>
              </NextLink>
              <NextLink href="/auth/register" passHref>
                <Button colorScheme="blue">Register</Button>
              </NextLink>
            </HStack>
          )}
        </HStack>
      </CenterContainer>
    </MainContainer>
  );
};

export default Navbar;
