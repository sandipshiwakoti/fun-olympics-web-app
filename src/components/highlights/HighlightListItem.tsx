import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { getTruncatedText } from "../../utils/helper";
import NextLink from "next/link";
import Image from "../common/Image";

interface HighlightListItemProps {
  id: number;
  title: string;
  description: string;
  broadcast: any;
}

const HighlightListItem: React.FC<HighlightListItemProps> = ({
  id,
  title,
  broadcast,
  description,
}) => {
  return (
    <Box
      justifyContent="space-between"
      rounded="lg"
      shadow="lg"
      boxShadow="lg"
      bg="white"
      p="4"
      gap="5"
      mb="5"
    >
      <HStack alignItems="start" gap="3" position="relative">
        <Image
          src="/img/video.png"
          width="100px"
          height="100px"
          alt="Football"
          rounded="2xl"
        />
        <Box>
          <NextLink href={`/highlights/${id}`} passHref>
            <Text
              fontWeight="bold"
              fontSize="xl"
              textTransform="capitalize"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
              my="1"
            >
              {title}
            </Text>
          </NextLink>

          <Text
            fontWeight="bold"
            fontSize="md"
            color="gray.600"
            textTransform="capitalize"
            mb="2"
          >
            {getTruncatedText(description)}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default HighlightListItem;
