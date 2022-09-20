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
  useCreateOwnHighlightComment,
  useDeleteOwnHighlightComment,
  useHighlightComments,
} from "../../hooks/useComments";
import { useHighlightById } from "../../hooks/useHighlights";
import { getImgLink, getRelativeTime } from "../../utils/helper";

const Highlight = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, data: highlight } = useHighlightById(Number(id));
  const {
    isLoading: isCommentsLoading,
    data: comments,
    refetch: refetchComments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useHighlightComments("", Number(id));

  const [comment, setComment] = useState<any>(null);

  const onChange = (e: any) => setComment(e.target.value);

  const handleSuccess = () => {
    setComment("");
  };

  const { mutate: createOwnComment } =
    useCreateOwnHighlightComment(handleSuccess);

  const { mutate: deleteOwnHighlightComment } = useDeleteOwnHighlightComment();

  const deleteOwnComment = (id: number) => deleteOwnHighlightComment(id);

  const addComment = (e: any) => {
    e.preventDefault();
    createOwnComment({ content: comment, highlightId: Number(id) });
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
            commentType={CommentTypeEnum.highlightComment}
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
    return <>No comments section</>;
  };

  const getView = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (highlight?.data) {
      return (
        <>
          <Heading mb="5">Highlight</Heading>
          <Text fontWeight="bold" fontSize="3xl" mb="4" color="gray.600">
            {highlight.data.title}
          </Text>
          <Center>
            <ReactPlayer
              url={highlight.data.link}
              controls={true}
              width="100%"
              height="40rem"
            />
          </Center>
          {getCommentSection()}
        </>
      );
    }
    return <>No highlight found</>;
  };

  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Box py="5">{getView()}</Box>
      </CenterContainer>
    </MainContainer>
  );
};

export default Highlight;
