import {
    Box,
    Button,
    Flex,
    HStack,
    Spacer,
    Stack,
    Text,
    useColorMode,
    Link,
} from "@chakra-ui/react";
import { FC } from "react";
import { IoEye, IoBookmark } from "react-icons/io5";
import { Link as DomLink } from "react-router-dom";
import { Post } from "@/models/post";
import { fDate } from "@/utils/date";

const PostCard: FC<{ post: Post }> = ({ post }) => {
    const { colorMode } = useColorMode();

    let cardBg = colorMode === "light" ? "white" : "hsl(0, 0%, 10%)";

    return (
        <Box as="article" bg={cardBg} p={4} borderWidth={1} borderRadius={8}>
            <Text
                color="green.500"
                textTransform={"uppercase"}
                fontWeight="bold"
                fontSize={"sm"}
                letterSpacing={1.1}
            >
                {post.type.toUpperCase()}
            </Text>
            <Link as={DomLink} to={`/post/${post.id}`}>
                <Text mt={2} fontWeight="bold" fontSize="xl">
                    {post.title}
                </Text>
            </Link>
            <Flex align="baseline" mt={2}>
                {post.categories.map((name, index) => {
                    return (
                        <Button
                            as={DomLink}
                            to={`/c/${name.toLocaleLowerCase()}`}
                            size="sm"
                            mr={2}
                            variant="outline"
                            key={index}
                        >
                            <Text fontSize="sm" fontWeight="bold" color="gray.500">
                                {name}
                            </Text>
                        </Button>
                    );
                })}
            </Flex>
            <HStack mt={2} alignItems="flex-end">
                <Stack ml={1} spacing={0}>
                    <Text fontSize="sm">
                        <b>Posted by: </b> {post.author}
                    </Text>
                    <Text fontSize="xs" color="gray">
                        {fDate(post.created_at)}
                    </Text>
                </Stack>
                <Spacer />
                <Flex align="center">
                    <Text mr={1} fontSize="sm">
                        <b>{post.views}</b>
                    </Text>
                    <Box as={IoEye} color="green.500" />
                </Flex>
                <Flex ml={10} align="center">
                    <Text mr={1} fontSize="sm">
                        <b>{post.bookmarks}</b>
                    </Text>
                    <Box as={IoBookmark} color="green.500" />
                </Flex>
            </HStack>
        </Box>
    );
};

export default PostCard;
