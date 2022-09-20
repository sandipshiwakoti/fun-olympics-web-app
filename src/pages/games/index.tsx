import {
  SimpleGrid,
  Image,
  Box,
  Text,
  Heading,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";
import CenterContainer from "../../components/common/CenterContainer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import MainContainer from "../../components/common/MainContainer";
import GameCard from "../../components/games/GameCard";
import { useGames } from "../../hooks/useGames";
import { Game } from "../../types/game";
import { getImgLink } from "../../utils/helper";

const Games = () => {
  const { isLoading, data: games, fetchNextPage, hasNextPage } = useGames();

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
    const gamesData: any[] = [];
    games?.pages.forEach((page) => {
      page.data.items.forEach((article: any) => {
        gamesData.push(article);
      });
    });
    return (
      <>
        <SimpleGrid columns={5} spacing={10}>
          {gamesData.map((game: Game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              img={game.img}
            />
          ))}
        </SimpleGrid>
      </>
    );
  };

  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Box py="5">
          <Heading mb="4">Games</Heading>

          {getView()}
        </Box>
      </CenterContainer>
    </MainContainer>
  );
};

export default Games;
