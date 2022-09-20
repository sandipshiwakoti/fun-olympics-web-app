import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  Image,
  Avatar,
  Input,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Comments, { CommentTypeEnum } from "../../components/comments/Comments";
import CenterContainer from "../../components/common/CenterContainer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import MainContainer from "../../components/common/MainContainer";
import {
  useCreateOwnNewsComment,
  useDeleteOwnNewsComment,
  useNewsComments,
} from "../../hooks/useComments";
import { useNewsById } from "../../hooks/useNews";
import {
  getFormattedDateWithoutTime,
  getImgLink,
  getRelativeTime,
} from "../../utils/helper";

const NewsArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, data: newsArticle } = useNewsById(Number(id));
  const {
    isLoading: isCommentsLoading,
    data: comments,
    refetch: refetchComments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useNewsComments("", Number(id));

  const [comment, setComment] = useState<any>(null);

  const onChange = (e: any) => setComment(e.target.value);

  const handleSuccess = () => {
    setComment("");
  };

  const { mutate: createOwnComment } = useCreateOwnNewsComment(handleSuccess);

  const { mutate: deleteOwnNewsComment } = useDeleteOwnNewsComment();

  const deleteOwnComment = (id: number) => deleteOwnNewsComment(id);

  const addComment = (e: any) => {
    e.preventDefault();
    createOwnComment({ content: comment, newsId: Number(id) });
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    setComment(comment ? `${comment}${emojiObject.emoji}` : emojiObject.emoji);
  };

  const getCommentSection = () => {
    if (isCommentsLoading) {
      return <LoadingSpinner />;
    }

    if (comments?.pages.length) {
      const commentsData: any[] = [];
      comments?.pages.forEach((page) => {
        page.data.items.forEach((comment: any) => {
          commentsData.push(comment);
        });
      });

      return (
        <>
          <Comments
            comments={commentsData}
            comment={comment}
            onSubmit={addComment}
            onChange={onChange}
            onEmojiClick={onEmojiClick}
            commentType={CommentTypeEnum.newsComment}
            deleteOwnComment={deleteOwnComment}
          />
          {hasNextPage && (
            <Center pt="3">
              {isFetchingNextPage && <LoadingSpinner />}
              <Button
                colorScheme="blue"
                size="lg"
                onClick={() => fetchNextPage()}
              >
                See more comments
              </Button>
            </Center>
          )}
        </>
      );
    }
  };
  const getView = () => {
    const { title, description, content, author, img, publishedAt } =
      newsArticle.data;

    return (
      <>
        <Text fontWeight="bold" fontSize="3xl" mb="5">
          {title}
        </Text>
        <Text fontWeight="bold" fontSize="lg" color="gray.500" mb="5">
          By {author} | {getFormattedDateWithoutTime(publishedAt)}
        </Text>
        <Text fontWeight="semibold" fontSize="xl" mb="5">
          {description}
        </Text>
        <Image
          src={getImgLink(img)}
          alt="hello"
          w="full"
          h="500px"
          objectFit="cover"
        />
        <Text fontSize="lg" my="5">
          {content}
        </Text>
        {getCommentSection()}
      </>
    );
  };
  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Box py="5">
          <Heading mb="3">News</Heading>
          {isLoading ? <LoadingSpinner /> : <>{getView()}</>}
        </Box>
      </CenterContainer>
    </MainContainer>
  );
};

export default NewsArticle;
