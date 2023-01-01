import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  InputRightElement,
  InputGroup,
  Input,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CenterContainer from "../../components/common/CenterContainer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import MainContainer from "../../components/common/MainContainer";
import HighlightListItem from "../../components/highlights/HighlightListItem";
import { useDebounce } from "../../hooks/useDebounce";
import { useHighlights } from "../../hooks/useHighlights";
import Image from "../../components/common/Image";
import { useNews } from "../../hooks/useNews";

const Highlights = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    isLoading,
    data: highlights,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHighlights(debouncedSearch);

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

    const highlightsData: any[] = [];
    highlights?.pages.forEach((page) => {
      page.data.items.forEach((article: any) => {
        highlightsData.push(article);
      });
    });

    if (highlightsData.length > 0) {
      return (
        <SimpleGrid columns={3} spacing={10}>
          {highlightsData.map((highlight: any) => (
            <HighlightListItem
              key={highlight.id}
              id={highlight.id}
              title={highlight.title}
              broadcast={highlight.broadcast}
              description={highlight.description}
            />
          ))}
          {isFetchingNextPage && <LoadingSpinner />}
        </SimpleGrid>
      );
    }

    return (
      <Box py="4">
        <Center mb="2">
          <Image
            src="/img/highlight.png"
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
          No highlights found!
        </Text>
      </Box>
    );
  };

  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Box py="5">
          <Heading mb="4">Highlights</Heading>
          <InputGroup size="lg" mb="6">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              pr="4.5rem"
              type="text"
              placeholder="Search highlights"
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

export default Highlights;
