import { Box, Heading, HStack, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import CenterContainer from "../common/CenterContainer";
import MainContainer from "../common/MainContainer";
import Image from "../common/Image";

const Hero = () => {
  return (
    <MainContainer bg="white">
      <CenterContainer>
        <Box py="5">
          <HStack alignItems="center">
            <Box>
              <Heading size="3xl" fontWeight="bold" mb="5">
                Welcome to{" "}
                <Text
                  display="inline-block"
                  color="purple.500"
                  fontWeight="extrabold"
                >
                  Fun Olympics 2022
                </Text>
              </Heading>
              <Text fontSize="lg" color="gray.800" mb="4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
                rem fuga, dicta, adipisci debitis delectus molestiae nostrum
                incidunt voluptas autem, suscipit molestias reiciendis officia
                similique! Fugiat sequi autem nemo? Eius natus aliquid alias
              </Text>
              <HStack gap="3">
                <Link href="/auth/register">
                  <Button
                    colorScheme="blue"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    rounded="xl"
                    fontSize="lg"
                    w="13rem"
                    _hover={{
                      bgGradient: "linear(to-r, red.500, yellow.500)",
                    }}
                  >
                    Join us
                  </Button>
                </Link>
              </HStack>
            </Box>
            <Image
              src="img/hero-img.jpg"
              w="38rem"
              h="38rem"
              alt="hero image"
              transform="scaleX(-1)"
              objectFit="cover"
            />
          </HStack>
        </Box>
      </CenterContainer>
    </MainContainer>
  );
};

export default Hero;
