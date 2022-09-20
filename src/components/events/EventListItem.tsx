import React from "react";
import {
  Box,
  Heading,
  HStack,
  Avatar,
  Flex,
  Text,
  Image,
  Badge,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  BsBookmarkHeartFill,
  BsBookmarkHeart,
  BsFillPlayCircleFill,
} from "react-icons/bs";
import {
  getFormattedDateWithoutTime,
  getFirstLetterCapitalized,
  isEventLive,
  getFormattedTime,
  isEventOld,
  isEventUpcoming,
  getImgLink,
} from "../../utils/helper";
import NextLink from "next/link";
import { StringLocale } from "yup/lib/locale";
import { Game } from "../../types/game";
import { useDispatch } from "react-redux";
import { addEventToWatchlist } from "../../pages/watchlist/watchlistSlice";

interface EventListItemProps {
  id: number;
  title: string;
  eventDate: string;
  game: Game;
  description?: string;
  addToWatchlist: () => void;
  removeFromWatchlist: () => void;
  isBookmarked: boolean;
}
const EventListItem: React.FC<EventListItemProps> = ({
  id,
  title,
  eventDate,
  game,
  description,
  addToWatchlist,
  removeFromWatchlist,
  isBookmarked,
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
    >
      <HStack alignItems="center" gap="3" position="relative">
        <Image
          src={getImgLink(game.img)}
          width="120px"
          height="120px"
          alt={game.title}
          rounded="2xl"
          objectFit="cover"
        />
        <Box>
          <Badge
            variant="outline"
            colorScheme="green"
            fontSize="sm"
            p="1"
            textTransform="capitalize"
          >
            {game.title}
          </Badge>

          <Text
            fontWeight="bold"
            fontSize="xl"
            textTransform="capitalize"
            my="1"
          >
            {title}
          </Text>
          <Text
            fontWeight="bold"
            fontSize="md"
            color="gray.600"
            textTransform="capitalize"
          >
            {getFormattedDateWithoutTime(eventDate)}
          </Text>

          {isEventUpcoming(eventDate) && (
            <Text
              fontWeight="bold"
              fontSize="md"
              color="gray.600"
              textTransform="capitalize"
              my="1"
            >
              {getFormattedTime(eventDate)}
            </Text>
          )}

          {isEventLive(eventDate) && (
            <NextLink href={`/events/${id}`} passHref>
              <Button
                leftIcon={<BsFillPlayCircleFill />}
                colorScheme="orange"
                variant="solid"
                mt="2"
                fontWeight="bold"
                size="sm"
              >
                Watch Live Stream
              </Button>
            </NextLink>
          )}

          {isEventOld(eventDate) && (
            <Text
              fontWeight="bold"
              fontSize="md"
              textTransform="capitalize"
              mb="1"
            >
              {description}
            </Text>
          )}

          <Icon
            as={isBookmarked ? BsBookmarkHeartFill : BsBookmarkHeart}
            fontSize="3xl"
            position="absolute"
            top="0"
            right="0"
            onClick={isBookmarked ? removeFromWatchlist : addToWatchlist}
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default EventListItem;
