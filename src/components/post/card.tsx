import { Post } from "@/models/post";
import { fDate } from "@/utils/date";
import {
    Box,
    Button,
    Flex,
    HStack,
    Link,
    Spacer,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { IoBookmark, IoEye } from "react-icons/io5";
import { Link as DomLink } from "react-router-dom";

const PostCard: FC<{ post: Post }> = ({ post }) => {
    return (
        <Box
            as="article"
            bg={useColorModeValue("white", "gray.700")}
            p={4}
            boxShadow="md"
            borderRadius={8}
        >
            <Text
                color="purple.400"
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
                {post.categories.map(({ id, color, name }) => {
                    return (
                        <Button
                            as={DomLink}
                            to={`/c/${name.toLowerCase()}`}
                            size="sm"
                            mr={2}
                            variant="outline"
                            key={id}
                        >
                            <Text fontSize="sm" fontWeight="bold" color={color}>
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
                    <Box as={IoEye} color="purple.400" />
                </Flex>
                <Flex ml={10} align="center">
                    <Text mr={1} fontSize="sm">
                        <b>{post.bookmarks}</b>
                    </Text>
                    <Box as={IoBookmark} color="purple.400" />
                </Flex>
            </HStack>
        </Box>
    );
};

export default PostCard;
