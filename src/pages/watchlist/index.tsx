import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CenterContainer from "../../components/common/CenterContainer";
import MainContainer from "../../components/common/MainContainer";
import EventListItem from "../../components/events/EventListItem";
import { RootState } from "../../store";
import { isEventOld } from "../../utils/helper";
import {
  addEventToWatchlist,
  removeEventfromWatchlist,
} from "./watchlistSlice";

const Watchlist = () => {
  const dispatch = useDispatch();
  const watchlistEvents = useSelector(
    (state: RootState) => state.watchlist.events
  );

  const getView = () => {
    return (
      <>
        {watchlistEvents.length > 0 ? (
          <SimpleGrid columns={3} spacing={10}>
            {watchlistEvents.map((event: any) => (
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
              />
            </Center>
            <Text
              textAlign="center"
              fontWeight="bold"
              fontSize="2xl"
              color="purple.900"
            >
              Empty watchlist
            </Text>
          </Box>
        )}
      </>
    );
  };

  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Box py="5">
          <Heading mb="4">Watchlist</Heading>
          {getView()}
        </Box>
      </CenterContainer>
    </MainContainer>
  );
};

export default Watchlist;
