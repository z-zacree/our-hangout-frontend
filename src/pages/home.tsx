import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    GridItem,
    HStack,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGetAllPosts } from "../api/post_api";
import PostCard from "../components/post/display/card";
import SkeletonCard from "../components/post/display/card_skeleton";
import { Sort } from "../models/enum";
import { Post } from "../models/post";

const HomePage = () => {
    const [sort, setSort] = useState(Sort.Latest);
    const { posts } = useGetAllPosts();

    const sortPosts = (a: Post, b: Post) => {
        switch (sort) {
            case Sort.Latest:
                return a.id - b.id;
            case Sort.Views:
                return b.views - a.views;
            case Sort.Saves:
                return b.bookmarked_by - a.bookmarked_by;
        }
    };

    return (
        <>
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
        </>
    );
};

export default HomePage;
