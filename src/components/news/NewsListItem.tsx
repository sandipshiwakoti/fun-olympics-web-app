import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { getTruncatedText, getImgLink } from "../../utils/helper";
import NextLink from "next/link";
import Image from "../common/Image";

interface NewsListItemProps {
  id: number;
  title: string;
  description: string;
  img: string;
}

const NewsListItem: React.FC<NewsListItemProps> = ({
  id,
  title,
  description,
  img,
}) => {
  return (
    <Box rounded="lg" shadow="lg" boxShadow="lg" bg="white">
      <Image
        src={getImgLink(img)}
        width="full"
        height="200px"
        alt="Football"
        bg="red.300"
        objectFit="cover"
      />
      <Box px="4" py="2">
        <NextLink href={`/news/${id}`} passHref>
          <Text
            fontWeight="bold"
            fontSize="xl"
            textTransform="capitalize"
            _hover={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
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
    </Box>
  );
};

export default NewsListItem;
