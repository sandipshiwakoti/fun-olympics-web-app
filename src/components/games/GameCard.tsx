import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Game } from "../../types/game";
import { getImgLink } from "../../utils/helper";

interface GameCardProps extends Game {}

const GameCard: React.FC<GameCardProps> = ({ id, title, img }) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      overflow="hidden"
      shadow="xl"
      boxShadow="md"
      _hover={{
        boxShadow: "dark-lg",
      }}
      key={id}
    >
      <Image
        src={getImgLink(img)}
        alt="{title}"
        w="full"
        h="150px"
        objectFit="cover"
      />
      <Text
        p="1"
        textAlign="center"
        fontWeight="bold"
        fontSize="lg"
        textTransform="capitalize"
      >
        {title}
      </Text>
    </Box>
  );
};

export default GameCard;
