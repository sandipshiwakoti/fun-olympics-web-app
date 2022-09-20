import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import CenterContainer from "../common/CenterContainer";
import MainContainer from "../common/MainContainer";

interface FAQProps {
  FAQs: any;
}

const FAQ: React.FC<FAQProps> = ({ FAQs }) => {
  return (
    <MainContainer bg="white">
      <CenterContainer>
        <Box py="10">
          <Heading size="2xl" fontWeight="bold" mb="8" textAlign="center">
            Frequently{" "}
            <Text
              display="inline-block"
              color="purple.500"
              fontWeight="extrabold"
            >
              Asked
            </Text>{" "}
            Questions
          </Heading>
          <Text
            fontSize="lg"
            color="gray.800"
            maxW="40rem"
            textAlign="center"
            mx="auto"
            mb="7"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem
            fuga, dicta, adipisci debitis delectus molestiae nostrum incidunt
          </Text>
          <Accordion maxW="60rem" mx="auto" allowToggle>
            {FAQs.map((item: any) => {
              return (
                <AccordionItem
                  rounded="lg"
                  shadow="xl"
                  overflow="hidden"
                  mb="6"
                  key={item.id}
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        shadow="md"
                        p="4"
                        bg="purple.400"
                        color="white"
                        _hover={{
                          bg: "purple.400",
                        }}
                        _expanded={{
                          bgGradient: "linear(to-l, #7928CA, #FF0080)",
                        }}
                      >
                        <Box flex="1" textAlign="left">
                          <Text fontWeight="bold" fontSize="lg">
                            {item.title}
                          </Text>
                        </Box>
                        {isExpanded ? (
                          <Icon as={AiFillMinusCircle} fontSize="3xl" />
                        ) : (
                          <Icon as={AiFillPlusCircle} fontSize="3xl" />
                        )}
                      </AccordionButton>
                      <AccordionPanel>
                        <Text fontSize="lg" color="gray.800" mt="2">
                          {item.content}
                        </Text>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              );
            })}
          </Accordion>
        </Box>
      </CenterContainer>
    </MainContainer>
  );
};

export default FAQ;
