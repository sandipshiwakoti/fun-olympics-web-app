import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import {
  Box,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Center,
  HStack,
  VStack,
  Input,
  Avatar,
  InputGroup,
  InputRightElement,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useToast,
} from "@chakra-ui/react";
import React, { RefObject, useEffect, useRef, useState } from "react";
import CenterContainer from "../../components/common/CenterContainer";
import MainContainer from "../../components/common/MainContainer";
import ReactPlayer from "react-player";
import { getImgLink, isEventLive } from "../../utils/helper";
import { useRouter } from "next/router";
import { BsEmojiHeartEyes } from "react-icons/bs";
import {
  useBroadcastById,
  useCreateOwnBroadcastComment,
} from "../../hooks/useBroadcasts";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const LiveEvent = () => {
  const router = useRouter();
  const toast = useToast();

  const { id } = router.query;
  const ref = useRef<any>(null);
  const [comment, setComment] = useState<any>(null);

  const { isLoading, data: event, refetch } = useBroadcastById(Number(id));

  const handleSuccess = () => {
    refetch();
    setComment("");
  };

  const { mutate: createOwnComment } =
    useCreateOwnBroadcastComment(handleSuccess);

  const addComment = (e: any) => {
    e.preventDefault();
    createOwnComment({ content: comment, broadcastId: Number(id) });
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    setComment(comment ? `${comment}${emojiObject.emoji}` : emojiObject.emoji);
  };

  useEffect(() => {
    if (ref && ref.current) {
      ref.current?.scrollTo({
        top: ref.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [event]);

  const getView = () => {
    if (!isEventLive(event?.scheduledAt)) {
      toast({
        title: "No live event happening",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      router.push("/events");
    }
    return (
      <>
        <Heading mb="2"> {event.title}</Heading>
        <Image
          src={"/img/live.gif"}
          width="150px"
          height="60px"
          alt="live"
          rounded="2xl"
          mb="2"
          objectFit="cover"
        />
        <HStack alignItems="start" gap="2">
          <ReactPlayer url={event.link} playing={true} light={true} />
          <Box flex="1" position="relative" h="full" shadow="2xl">
            <Center
              p="3"
              bg="purple.900"
              color="white"
              borderTopRadius="lg"
              w="full"
            >
              <Text fontWeight="bold">Live Comment</Text>
            </Center>

            <Box
              flexGrow="1"
              h="37vh"
              overflow="scroll"
              p="4"
              ref={ref}
              id="comment-list"
            >
              {event?.comments?.length > 0 &&
                event?.comments.map((comment: any, index: number) => {
                  return (
                    <HStack key={index} mb="2" spacing="3" alignItems="start">
                      <HStack>
                        <Avatar
                          src={
                            comment?.author?.img
                              ? getImgLink(comment?.author?.img)
                              : "/img/user.png"
                          }
                          size="sm"
                        />
                        <Text fontWeight="bold" fontSize="lg" color="gray.700">
                          {comment.author.name}
                        </Text>
                      </HStack>
                      <Text fontWeight="semibold" fontSize="lg" flex="1">
                        {comment.content}
                      </Text>
                    </HStack>
                  );
                })}
            </Box>
            <Box w="full">
              <form onSubmit={addComment}>
                <HStack>
                  <InputGroup size="md">
                    <Input
                      variant="outline"
                      placeholder="Write something"
                      rounded="md"
                      fontSize="xl"
                      outline="2px solid gray"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Popover placement="bottom-start" isLazy>
                        <PopoverTrigger>
                          <Icon
                            as={BsEmojiHeartEyes}
                            fontSize="xl"
                            color="purple.500"
                          />
                        </PopoverTrigger>
                        <PopoverContent width="280px" height="320px">
                          <Center>
                            <Picker onEmojiClick={onEmojiClick} />
                          </Center>
                        </PopoverContent>
                      </Popover>
                    </InputRightElement>
                  </InputGroup>
                </HStack>
              </form>
            </Box>
          </Box>
        </HStack>
      </>
    );
  };

  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Box py="5">{isLoading ? <LoadingSpinner /> : getView()}</Box>
      </CenterContainer>
    </MainContainer>
  );
};

export default LiveEvent;
