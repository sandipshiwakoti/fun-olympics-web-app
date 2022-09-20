import {
  Box,
  HStack,
  Icon,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import CenterContainer from "../../common/CenterContainer";
import Logo from "../../common/Logo";
import MainContainer from "../../common/MainContainer";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { FaViber } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { links } from "../../../data/navlinks";

const Footer = () => {
  return (
    <MainContainer bg="purple.900">
      <CenterContainer>
        <HStack py="10" gap="10" alignItems="start">
          <Box>
            <Logo size="lg" color="light" />
            <Text color="white" maxW="400px" mt="2">
              Fun Olympics website provides broadcasting platform, highlights
              and many more to entertain the sport audiences through out the
              world
            </Text>
          </Box>
          <Box>
            <Text color="white" fontWeight="bold" fontSize="2xl" mb="3">
              Contact us
            </Text>
            <List spacing="3">
              <ListItem color="white">
                <ListIcon as={BiMap} color="white" />
                Kathmandu, Nepal
              </ListItem>
              <ListItem color="white">
                <ListIcon as={BiPhone} color="white" />
                9841028997
              </ListItem>
              <ListItem color="white">
                <ListIcon as={BiEnvelope} color="white" />
                support@funolymics.com
              </ListItem>
            </List>
          </Box>
          <Box>
            <Text color="white" fontWeight="bold" fontSize="2xl" mb="3">
              Links
            </Text>
            <List spacing="3">
              {links.map(({ title, path }) => (
                <ListItem key={path}>
                  <NextLink href={path} passHref key={path}>
                    <Link
                      color="white"
                      style={{ textDecoration: "none" }}
                      _hover={{
                        color: "teal.500",
                      }}
                    >
                      {title}
                    </Link>
                  </NextLink>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <Text color="white" fontWeight="bold" fontSize="2xl" mb="3">
              Socials
            </Text>
            <HStack gap="2">
              <Icon as={BsFacebook} color="white" fontSize="3xl" />
              <Icon as={AiFillTwitterCircle} color="white" fontSize="3xl" />
              <Icon as={AiFillInstagram} color="white" fontSize="3xl" />
              <Icon as={FaViber} color="white" fontSize="3xl" />
              <Icon as={IoLogoWhatsapp} color="white" fontSize="3xl" />
            </HStack>
          </Box>
        </HStack>
        <Box color="gray.200" py="4">
          &copy; Copyright 2022 Fun Olympics | All rights reserved | Made with
          love by{" "}
          <Text display="inline-block" color="yellow.400" fontWeight="bold">
            Sandip Shiwakoti
          </Text>
        </Box>
      </CenterContainer>
    </MainContainer>
  );
};

export default Footer;
