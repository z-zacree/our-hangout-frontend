import { Box, Button, ButtonGroup, Text, HStack, Stack, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPostsByCategory } from "@/hooks/post";
import { Sort, Post } from "@/models";
import { PostCard, SkeletonCard } from "@/components";
import Layout from "./layout";
import { FC } from "react";

const Category: FC = () => {
    const [sort, setSort] = useState(Sort.Latest);
    const { name } = useParams();

    const { posts } = useGetPostsByCategory(name!);

    const sortPosts = (a: Post, b: Post) => {
        switch (sort) {
            case Sort.Latest:
                return a.id - b.id;
            case Sort.Views:
                return b.views - a.views;
            case Sort.Saves:
                return b.bookmarks - a.bookmarks;
        }
    };

    return (
        <Layout>
            <HStack my={4}>
                <ButtonGroup variant="ghost" colorScheme="purple">
                    <Button
                        color={useColorModeValue("black", "white")}
                        onClick={() => setSort(Sort.Latest)}
                    >
                        <Text
                            fontWeight={sort === Sort.Latest ? "bold" : "normal"}
                            textDecoration={sort === Sort.Latest ? "underline" : "normal"}
                        >
                            Latest
                        </Text>
                    </Button>
                    <Button
                        color={useColorModeValue("black", "white")}
                        onClick={() => setSort(Sort.Views)}
                    >
                        <Text
                            fontWeight={sort === Sort.Views ? "bold" : "normal"}
                            textDecoration={sort === Sort.Views ? "underline" : "normal"}
                        >
                            Most Viewed
                        </Text>
                    </Button>
                    <Button
                        color={useColorModeValue("black", "white")}
                        onClick={() => setSort(Sort.Saves)}
                    >
                        <Text
                            fontWeight={sort === Sort.Saves ? "bold" : "normal"}
                            textDecoration={sort === Sort.Saves ? "underline" : "normal"}
                        >
                            Most Saved
                        </Text>
                    </Button>
                </ButtonGroup>
            </HStack>
            <Stack gap={1}>
                {posts?.sort(sortPosts).map((post) => <PostCard post={post} key={post.id} />) ??
                    [...Array(10).keys()].map((number) => <SkeletonCard key={number} />)}
            </Stack>
        </Layout>
    );
};

export default Category;
