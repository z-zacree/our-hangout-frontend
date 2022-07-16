import {
    Box,
    Button,
    ButtonGroup,
    Text,
    Grid,
    GridItem,
    HStack,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPostsByCategory } from "../../api/post_api";
import PostCard from "../../components/post/display/card";
import SkeletonCard from "../../components/post/display/card_skeleton";
import { Sort } from "../../models/enum";
import { Post } from "../../models/post";

const Category = () => {
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
                return b.bookmarked_by - a.bookmarked_by;
        }
    };

    return (
        <Grid
            maxW="7xl"
            h="100%"
            templateColumns={{
                base: "2fr",
                md: "240px 2fr",
                xl: "240px 2fr 1fr",
            }}
            gap={4}
            mx="auto"
        >
            <GridItem
                position="sticky"
                alignSelf="flex-start"
                maxW="xs"
                display={{ base: "none", md: "block" }}
                bg="blue.500"
                borderRadius={12}
            >
                <Box p={8}>Left Sidebar</Box>
            </GridItem>
            <GridItem w="100%">
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
                <Stack gap={1} mt={4}>
                    {posts?.sort(sortPosts).map((post) => <PostCard post={post} key={post.id} />) ??
                        [...Array(10).keys()].map((number) => <SkeletonCard key={number} />)}
                </Stack>
            </GridItem>
            <GridItem
                position="sticky"
                alignSelf="flex-start"
                maxW="xl"
                display={{ base: "none", xl: "block" }}
                bg="blue.500"
                borderRadius={12}
            >
                <Box p={8}>Right Sidebar</Box>
            </GridItem>
        </Grid>
    );
};

export default Category;
