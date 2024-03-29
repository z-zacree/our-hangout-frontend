import { Post } from "@/models/post";
import { fDate } from "@/utils/date";
import {
    Avatar,
    Box,
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
import { Link as ReactRouterLink } from "react-router-dom";
import CategoryButton from "./category_link";

const PostCard: FC<{ post: Post }> = ({ post }) => {
    return (
        <Box
            as={"article"}
            bg={useColorModeValue("white", "gray.700")}
            p={4}
            boxShadow={"md"}
            borderRadius={8}
        >
            <HStack>
                <Text
                    color={"purple.400"}
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                    fontSize={"sm"}
                    letterSpacing={1.1}
                >
                    {post.type.toUpperCase()}
                </Text>
                <Spacer />
                <HStack>
                    <Avatar size={"sm"} src={post.author.avatar ?? undefined} />
                    <Text fontSize={"sm"}>{post.author.username}</Text>
                </HStack>
            </HStack>
            <Link as={ReactRouterLink} to={`/post/${post.id}`}>
                <Text mt={2} fontWeight={"bold"} fontSize={"xl"}>
                    {post.title}
                </Text>
            </Link>
            <Flex align="baseline" mt={2}>
                {post.categories.map((category, index) => {
                    return <CategoryButton category={category} key={index} />;
                })}
            </Flex>
            <HStack mt={2} alignItems={"flex-end"}>
                <Text fontSize={"xs"} color={"gray"}>
                    {fDate(post.created_at)}
                </Text>
                <Spacer />
                <Flex align={"center"}>
                    <Text mr={1} fontSize={"sm"}>
                        <b>{post.views}</b>
                    </Text>
                    <Box as={IoEye} color={"purple.400"} />
                </Flex>
                <Flex ml={10} align={"center"}>
                    <Text mr={1} fontSize={"sm"}>
                        <b>{post.bookmarks}</b>
                    </Text>
                    <Box as={IoBookmark} color={"purple.400"} />
                </Flex>
            </HStack>
        </Box>
    );
};

export default PostCard;
