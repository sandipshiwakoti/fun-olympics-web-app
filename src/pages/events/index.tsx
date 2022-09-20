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
  SimpleGrid,
  InputGroup,
  Input,
  InputRightElement,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CenterContainer from "../../components/common/CenterContainer";
import MainContainer from "../../components/common/MainContainer";
import { BsBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import { isEventLive, isEventOld, isEventUpcoming } from "../../utils/helper";
import NextLink from "next/link";
import EventListItem from "../../components/events/EventListItem";
import EventList from "../../components/events/EventList";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useBroadcasts } from "../../hooks/useBroadcasts";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../../hooks/useDebounce";

const Events = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    isLoading,
    data: broadcasts,
    fetchNextPage,
    hasNextPage,
  } = useBroadcasts(debouncedSearch);

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const scrollHeight = e.target.scrollingElement.scrollHeight;
      const scrollTop = e.target.scrollingElement.scrollTop;
      const clientHeight = e.target.scrollingElement.clientHeight;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const getView = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    const broadcastsData: any[] = [];
    broadcasts?.pages.forEach((page) => {
      page.data.items.forEach((broadcast: any) => {
        broadcastsData.push(broadcast);
      });
    });

    const liveEventsData = broadcastsData.filter((event: any) =>
      isEventLive(event.scheduledAt)
    );
    const upcomingEventsData = broadcastsData.filter((event: any) =>
      isEventUpcoming(event.scheduledAt)
    );
    const oldEventsData = broadcastsData.filter((event: any) =>
      isEventOld(event.scheduledAt)
    );
    return (
      <>
        <EventList title="Live events" data={liveEventsData} />
        <EventList title="Upcoming events" data={upcomingEventsData} />
        <EventList title="Old events" data={oldEventsData} />
      </>
    );
  };

  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Box py="5">
          <Heading mb="5">Events</Heading>
          <InputGroup size="lg" mb="6">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              pr="4.5rem"
              type="text"
              placeholder="Search events"
              boxShadow="outline"
              rounded="md"
              fontWeight="semibold"
              bg="white"
            />
            <InputRightElement width="4.5rem">
              <Icon as={FaSearch} fontSize="2xl" color="gray.500" />
            </InputRightElement>
          </InputGroup>
          {getView()}
        </Box>
      </CenterContainer>
    </MainContainer>
  );
};
export default Events;
