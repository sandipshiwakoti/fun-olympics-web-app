import {
  Box,
  Center,
  Grid,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { BsBroadcastPin, BsNewspaper } from "react-icons/bs";
import { FaUser, FaVideo } from "react-icons/fa";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { useBroadcastsForTable } from "../../hooks/useBroadcasts";
import { useGamesForTable } from "../../hooks/useGames";
import { useHighlightsForTable } from "../../hooks/useHighlights";
import { useNewsForTable } from "../../hooks/useNews";
import { useUsersForTable } from "../../hooks/useUsers";

const Home = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [gamesCount, setGamesCount] = useState(0);
  const [broadcastsCount, setBroadcastsCount] = useState(0);
  const [highlightsCount, setHighlightsCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);

  const { isLoading: isUsersLoading, data: users } = useUsersForTable();
  const { isLoading: isGamesLoading, data: games } = useGamesForTable();
  const { isLoading: isBroadcastsLoading, data: broadcasts } =
    useBroadcastsForTable();
  const { isLoading: isHighlightsLoading, data: highlights } =
    useHighlightsForTable();
  const { isLoading: isNewsLoading, data: news } = useNewsForTable();

  const insights = [
    { id: 1, icon: FaUser, title: "Total users", count: usersCount },
    {
      id: 2,
      icon: MdOutlineSportsBasketball,
      title: "Total games",
      count: gamesCount,
    },
    {
      id: 3,
      icon: BsBroadcastPin,
      title: "Total events",
      count: broadcastsCount,
    },
    { id: 4, icon: FaVideo, title: "Total highlights", count: highlightsCount },
    { id: 5, icon: BsNewspaper, title: "Total news", count: newsCount },
  ];

  useEffect(() => {
    if (!isUsersLoading) {
      setUsersCount(users?.data.meta.totalItems);
    }
    if (!isGamesLoading) {
      setGamesCount(games?.data.meta.totalItems);
    }
    if (!isBroadcastsLoading) {
      setBroadcastsCount(broadcasts?.data.meta.totalItems);
    }
    if (!isNewsLoading) {
      setNewsCount(news?.data.meta.totalItems);
    }
    if (!isHighlightsLoading) {
      setHighlightsCount(highlights?.data.meta.totalItems);
    }
    if (!isNewsLoading) {
      setNewsCount(news?.data.meta.totalItems);
    }
  }, [
    isUsersLoading,
    isGamesLoading,
    isBroadcastsLoading,
    isNewsLoading,
    isHighlightsLoading,
    news,
    games,
    broadcasts,
    highlights,
    users,
  ]);

  useEffect(() => {
    if (!isUsersLoading) {
      setUsersCount(users?.data.meta.totalItems);
    }
    if (!isGamesLoading) {
      setGamesCount(games?.data.meta.totalItems);
    }
    if (!isBroadcastsLoading) {
      setBroadcastsCount(broadcasts?.data.meta.totalItems);
    }
    if (!isNewsLoading) {
      setNewsCount(news?.data.meta.totalItems);
    }
    if (!isHighlightsLoading) {
      setHighlightsCount(highlights?.data.meta.totalItems);
    }
    if (!isNewsLoading) {
      setNewsCount(news?.data.meta.totalItems);
    }
  }, [
    isUsersLoading,
    isGamesLoading,
    isBroadcastsLoading,
    isNewsLoading,
    isHighlightsLoading,
    news,
    games,
    broadcasts,
    highlights,
    users,
  ]);

  useEffect(() => {
    if (!isUsersLoading) {
      setUsersCount(users?.data.meta.totalItems);
    }
  }, [isUsersLoading, , users]);

  useEffect(() => {
    if (!isGamesLoading) {
      setGamesCount(games?.data.meta.totalItems);
    }
  }, [isGamesLoading, games]);

  useEffect(() => {
    if (!isBroadcastsLoading) {
      setBroadcastsCount(broadcasts?.data.meta.totalItems);
    }
  }, [isBroadcastsLoading, broadcasts]);

  useEffect(() => {
    if (!isNewsLoading) {
      setNewsCount(news?.data.meta.totalItems);
    }
  }, [isNewsLoading, news]);

  useEffect(() => {
    if (!isHighlightsLoading) {
      setHighlightsCount(highlights?.data.meta.totalItems);
    }
  }, [isHighlightsLoading, highlights]);

  return (
    <>
      <Heading size="lg" mb="3">
        Insights
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap="4">
        {insights.map((insight: any) => {
          return (
            <Box shadow="lg" p="4" bg="gray.100" rounded="lg" key={insight.id}>
              <Center mb="1">
                <Icon
                  as={insight.icon}
                  fontSize="6xl"
                  color="white"
                  bg="purple.400"
                  p="3"
                  rounded="lg"
                />
              </Center>
              <Text fontWeight="extrabold" fontSize="5xl" textAlign="center">
                {insight.count || 0}
              </Text>
              <Text
                fontWeight="semibold"
                textAlign="center"
                fontSize="2xl"
                color="gray"
              >
                {insight.title}
              </Text>
            </Box>
          );
        })}
      </Grid>
    </>
  );
};

export default Home;

export const getServerSideProps = async (ctx: ReactElement) => {
  return {
    props: {
      typeLayout: "admin",
    },
  };
};
