import {
  Center,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEventToWatchlist,
  removeEventfromWatchlist,
} from "../../pages/watchlist/watchlistSlice";
import { RootState } from "../../store";
import EventListItem from "./EventListItem";

interface EventListProps {
  title: string;
  data: any;
}
const EventList: React.FC<EventListProps> = ({ title, data }) => {
  const dispatch = useDispatch();
  const watchlistEvents = useSelector(
    (state: RootState) => state.watchlist.events
  );

  return (
    <Box mb="5">
      <Heading mb="3" fontSize="3xl">
        {title}
      </Heading>
      {data?.length > 0 ? (
        <SimpleGrid columns={3} spacing={10}>
          {data.map((event: any) => (
            <EventListItem
              key={event.id}
              id={event.id}
              title={event.title}
              game={event.game}
              eventDate={event.scheduledAt}
              description={event.description}
              addToWatchlist={() => dispatch(addEventToWatchlist(event))}
              removeFromWatchlist={() =>
                dispatch(removeEventfromWatchlist(event.id))
              }
              isBookmarked={
                !!watchlistEvents.find((item) => item.id === event.id)
              }
            />
          ))}
        </SimpleGrid>
      ) : (
        <Box>
          <Center mb="2">
            <Image
              src="/img/no-event.png"
              alt="No Event"
              h="100px"
              w="100px"
              objectFit="cover"
            />
          </Center>
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize="2xl"
            color="purple.900"
          >
            No event found
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default EventList;
