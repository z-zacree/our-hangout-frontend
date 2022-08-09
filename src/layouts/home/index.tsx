import { PostCard, SkeletonCard } from "@/components";
import { useGetAllPosts } from "@/hooks/post";
import { Post, Sort } from "@/models";
import { Button, ButtonGroup, HStack, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FC, useState } from "react";

import HomeLayout from "./layout";

const HomePage: FC = () => {
    const [sort, setSort] = useState(Sort.Latest);
    const { posts } = useGetAllPosts();

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
        <HomeLayout>
            <HStack>
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
            <Stack gap={1} mt={{ base: 2, md: 4 }}>
                {posts?.sort(sortPosts).map((post) => <PostCard post={post} key={post.id} />) ??
                    [...Array(10).keys()].map((number) => <SkeletonCard key={number} />)}
            </Stack>
        </HomeLayout>
    );
};

export default HomePage;
