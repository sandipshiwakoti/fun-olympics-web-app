import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CenterContainer from "../../components/common/CenterContainer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import MainContainer from "../../components/common/MainContainer";
import HighlightListItem from "../../components/highlights/HighlightListItem";
import NewsListItem from "../../components/news/NewsListItem";
import { useDebounce } from "../../hooks/useDebounce";
import { useNews } from "../../hooks/useNews";

const data = [
  {
    id: 1,
    title: "article 1",
    description: "description 1",
    content: "article content 1",
    author: "Article author 1",
    img: "uploads/cdde7a888bd6e13f03d3c0f5f7cecf32.jpg",
    publishedAt: "2022-10-12",
  },
  {
    id: 2,
    title: "article 2",
    description: "description 2",
    content: "article content 1",
    author: "Article author 1",
    img: "uploads/d3a32510cdd9c5469dfce3817602eaa02.jpg",
    publishedAt: "2022-10-12",
  },
  {
    id: 3,
    title: "article 3",
    description: "description 3",
    content: "article content 1",
    author: "Article author 1",
    img: "uploads/5a2d79108c15d433fa5894d4e4e73f113.jpg",
    publishedAt: "2022-10-12",
  },
];
const News = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    isLoading,
    data: news,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useNews(debouncedSearch);

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

    const newsData: any[] = [];
    news?.pages.forEach((page) => {
      page.data.items.forEach((article: any) => {
        newsData.push(article);
      });
    });

    if (newsData.length > 0) {
      return (
        <>
          <SimpleGrid columns={3} spacing={10}>
            {newsData.map((article: any) => (
              <NewsListItem
                key={article.id}
                id={article.id}
                title={article.title}
                img={article.img}
                description={article.description}
              />
            ))}
            {isFetchingNextPage && <LoadingSpinner />}
          </SimpleGrid>
        </>
      );
    }

    return (
      <Box py="5">
        <Center mb="2">
          <Image
            src="/img/news.png"
            alt="No news articles"
            h="100px"
            w="100px"
            objectFit="cover"
          />
        </Center>
        <Text
          textAlign="center"
          fontWeight="bold"
          fontSize="3xl"
          color="purple.900"
        >
          No articles found!
        </Text>
      </Box>
    );
  };
  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Box py="5" minH="80vh">
          <Heading mb="4">News</Heading>
          <InputGroup size="lg" mb="6">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              pr="4.5rem"
              type="text"
              placeholder="Search news articles"
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

export default News;
