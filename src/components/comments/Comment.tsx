import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { getImgLink, getRelativeTime } from "../../utils/helper";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useAuth } from "../../contexts/auth";
import { CommentTypeEnum } from "./Comments";

interface CommentProps {
  content: string;
  author: any;
  commentedAt: string;
  deleteOwnComment: () => void;
}

const Comment: React.FC<CommentProps> = ({
  content,
  author,
  commentedAt,
  deleteOwnComment,
}) => {
  const { user } = useAuth();
  const isOwnComment = user?.id === author?.id;

  return (
    <HStack spacing="4" mb="3" border="1px solid gray" rounded="lg" p="4">
      <Avatar
        src={author?.img ? getImgLink(author?.img) : "/img/user.png"}
        size="md"
        bg="white"
      />
      <Box flex="1">
        <HStack alignItems="baseline" spacing="3">
          <Text fontWeight="bold" fontSize="lg" color="purple.900" mb="2">
            {author?.name}
          </Text>
          <Text fontSize="md">{getRelativeTime(commentedAt)}</Text>
          {isOwnComment && (
            <Menu>
              <MenuButton>
                <Icon as={HiDotsVertical} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={deleteOwnComment}>Delete comment</MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
        <Text fontSize="lg">{content}</Text>
      </Box>
    </HStack>
  );
};

export default Comment;
