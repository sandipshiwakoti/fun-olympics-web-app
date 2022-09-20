import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  Input,
  Text,
  Image,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverTrigger,
  Icon,
  PopoverContent,
} from "@chakra-ui/react";
import { BsEmojiHeartEyes } from "react-icons/bs";
import Comment from "./Comment";
import React, { useState } from "react";
import { getImgLink, getRelativeTime } from "../../utils/helper";
import { useAuth } from "../../contexts/auth";

export enum CommentTypeEnum {
  highlightComment = "highlight-comment",
  newsComment = "broadcast-comment",
}

interface CommentsProps {
  comments: any;
  comment: string;
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
  onEmojiClick: (e: any, emojiObject: any) => void;
  commentType: CommentTypeEnum;
  deleteOwnComment: (id: number) => void;
}
const Comments: React.FC<CommentsProps> = ({
  comments,
  comment,
  onChange,
  onSubmit,
  onEmojiClick,
  commentType,
  deleteOwnComment,
}) => {
  const { user } = useAuth();

  const getView = () => {
    return (
      <>
        <HStack spacing="4" mb="7">
          <Avatar
            name={user?.name}
            src={user?.img ? getImgLink(user.img) : "/img/user.png"}
            size="md"
            bg="white"
          />
          <Box flex="1">
            <form onSubmit={onSubmit}>
              <InputGroup size="md">
                <Input
                  value={comment}
                  onChange={onChange}
                  variant="outline"
                  placeholder="Add a comment.."
                  rounded="md"
                  fontSize="lg"
                  outline="2px solid gray"
                  py="7"
                  pr="16"
                />
                <InputRightElement width="4.5rem" py="7">
                  <Popover placement="bottom-start" isLazy>
                    <PopoverTrigger>
                      <Box>
                        <Icon
                          as={BsEmojiHeartEyes}
                          fontSize="xl"
                          color="purple.500"
                        />
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent width="280px" height="320px">
                      <Center>
                        <Picker onEmojiClick={onEmojiClick} />
                      </Center>
                    </PopoverContent>
                  </Popover>
                </InputRightElement>
              </InputGroup>
            </form>
          </Box>
        </HStack>
        {comments.length > 0 ? (
          comments.map((comment: any) => {
            const { id, content, commentedAt, author } = comment;
            return (
              <Comment
                key={id}
                content={content}
                author={author}
                commentedAt={commentedAt}
                deleteOwnComment={() => deleteOwnComment(id)}
              />
            );
          })
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
              No comments found
            </Text>
          </Box>
        )}
      </>
    );
  };
  return (
    <>
      <Heading my="4" size="lg">
        Add Comments
      </Heading>
      <Box mb="4">{getView()}</Box>
    </>
  );
};

export default Comments;
