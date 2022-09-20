import {
  Box,
  Button,
  Center,
  Heading,
  Link,
  Stack,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { ReactElement } from "react";

const ErrorPage = () => {
  return (
    <Center h="70vh">
      <Box justifyContent="center">
        <Heading size="xl" color="blue.700" mb="5">
          Page not found!
        </Heading>
        <Center>
          <Button colorScheme="teal" px="2rem">
            <NextLink href="/" passHref>
              <Link fontWeight="semibold" style={{ textDecoration: "none" }}>
                Back to Home
              </Link>
            </NextLink>
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default ErrorPage;
