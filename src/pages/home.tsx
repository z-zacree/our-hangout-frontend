import { Box, Center, Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import { getPosts } from "../api/post_api";
import PostCard from "../components/post_card";
import { Post } from "../models/post";

const posts: Post[] = await getPosts();

const HomePage = () => {
    return (
        <Flex>
            <Box flex={1} display={{ base: "none", md: "block" }}></Box>
            <Stack gap={2} p={4} flex={2}>
                {posts.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </Stack>
        </Flex>
    );
};

export default HomePage;
