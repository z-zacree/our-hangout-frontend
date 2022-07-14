import { Box, Button, Flex, Heading, HStack, Spacer, Stack, Text, useColorMode, Link } from "@chakra-ui/react";
import { FC } from "react";
import { IoEye, IoBookmark } from "react-icons/io5";
import { Link as DomLink } from "react-router-dom";
import { Post } from "../models/post";
import { fDate } from "../utils/date";

const PostCard: FC<{ post: Post }> = ({ post }) => {
    const { colorMode } = useColorMode();

    let cardBg = colorMode === "light" ? "white" : "hsl(0, 0%, 10%)";

    return (
        <Box bg={cardBg} p={4} maxW="3xl" borderWidth={1} borderRadius={8}>
            <HStack>
                <Text color="green.500" textTransform={"uppercase"} fontWeight="bold" fontSize={"sm"} letterSpacing={1.1}>
                    {post.type.toUpperCase()}
                </Text>
            </HStack>
            <Link as={DomLink} to={`/posts/${post.id}`}>
                <Heading mt={2} fontSize="xl" fontFamily={"body"} _hover={{ color: "current" }}>
                    {post.title}
                </Heading>
            </Link>
            <Flex align="baseline" mt={2}>
                {post.categories.map((category, index) => {
                    return (
                        <Button as={DomLink} to={`/c/${category.name.toLocaleLowerCase()}`} size="sm" mr={2} variant="outline" key={index}>
                            <Text fontSize="sm" fontWeight="bold" color="grey.800">
                                {category.name}
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
                        <b>{post.bookmarked_by}</b>
                    </Text>
                    <Box as={IoBookmark} color="green.500" />
                </Flex>
            </HStack>
        </Box>
    );

    // return (
    //     <Box
    //         as={DomLink}
    //         to={`/posts/${post.id}`}
    //         p={4}
    //         maxW="xl"
    //         borderWidth="1px"
    //         borderRadius={{ base: 4, sm: 12 }}
    //         bg={cardBg}
    //         position="relative"
    //         cursor="pointer"
    //     >
    //         <HStack>
    //             <Text color="green.500" textTransform={"uppercase"} fontWeight="bold" fontSize={"sm"} letterSpacing={1.1}>
    //                 Blog
    //             </Text>
    //             <Spacer />
    //         </HStack>
    //         <Link as={DomLink} to={`/posts/${post.id}`}>
    //             <Heading mt={2} fontSize="xl" fontFamily={"body"} _hover={{ color: "current" }}>
    //                 {post.title}
    //             </Heading>
    //         </Link>
    //         <Flex align="baseline" mt={2}>
    //             {post.categories.map((category, index) => {
    //                 return (
    //                     <Button
    //                         as={DomLink}
    //                         to={`/category/${category.name}`}
    //                         size="sm"
    //                         mr={2}
    //                         variant="outline"
    //                         key={index}
    //                         onClick={() => {
    //                             navigate(`category/${category.name}`, { replace: true });
    //                         }}
    //                     >
    //                         <Text fontSize="sm" fontWeight="bold" color="grey.800">
    //                             {category.name}
    //                         </Text>
    //                     </Button>
    //                 );
    //             })}
    //         </Flex>
    //         <HStack mt={2} alignItems="flex-end">
    //             <Stack ml={1} spacing={0}>
    //                 <Text fontSize="sm">
    //                     <b>Posted by: </b> {post.author}
    //                 </Text>
    //                 <Text fontSize="xs" color="gray">
    //                     {fDate(post.created_at)}
    //                 </Text>
    //             </Stack>
    //             <Spacer />
    //             <Flex align="center">
    //                 <Text mr={1} fontSize="sm">
    //                     <b>{post.views}</b>
    //                 </Text>
    //                 <Box as={IoEye} color="green.500" />
    //             </Flex>
    //             <Flex ml={10} align="center">
    //                 <Text mr={1} fontSize="sm">
    //                     <b>{post.bookmarked_by}</b>
    //                 </Text>
    //                 <Box as={IoBookmark} color="green.500" />
    //             </Flex>
    //         </HStack>
    //     </Box>
    // );
};

export default PostCard;
