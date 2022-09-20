import {
  Box,
  Heading,
  HStack,
  Text,
  Image,
  Button,
  Grid,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import CenterContainer from "../common/CenterContainer";
import MainContainer from "../common/MainContainer";

interface ServicesProps {
  services: any;
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Box py="10">
          <Heading size="2xl" fontWeight="bold" mb="8" maxW="35rem">
            What{" "}
            <Text
              display="inline-block"
              color="purple.500"
              fontWeight="extrabold"
            >
              services
            </Text>{" "}
            you get to access?
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap="5">
            {services.map((service: any) => {
              return (
                <Box bg="white" rounded="xl" p="5" key={service.id}>
                  <Icon
                    as={service.icon}
                    fontSize="5xl"
                    rounded="full"
                    mb="2"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    p="2"
                    color="gray.100"
                  />
                  <Text
                    fontWeight="semibold"
                    fontSize="xl"
                    color="gray.600"
                    mb="2"
                  >
                    {service.name}
                  </Text>
                  <Text fontSize="lg" color="gray.800" mb="4">
                    {service.description}
                  </Text>
                  <Link href={service.urlPath}>
                    <Button
                      rightIcon={<Icon as={AiOutlineArrowRight} />}
                      colorScheme="blue"
                      variant="outline"
                      _hover={{
                        bgGradient: "linear(to-l, #7928CA, #FF0080)",
                        color: "white",
                      }}
                    >
                      Learn more
                    </Button>
                  </Link>
                </Box>
              );
            })}
          </Grid>
        </Box>
      </CenterContainer>
    </MainContainer>
  );
};

export default Services;
