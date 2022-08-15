import { CategoryButton } from "@/components";
import { useGetPost } from "@/hooks/post";
import { fDate } from "@/utils/date";
import { Avatar, Container, Heading, HStack, Stack, Text, VStack, Wrap } from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import Layout from "./layout";

const Post: FC = () => {
    window.scroll(0, 0);
    let { id } = useParams();
    let { post } = useGetPost(parseInt(id!));

    return (
        <Layout>
            <Container maxW={"7xl"} display={"flex"} justifyContent={"center"}>
                {post ? (
                    <VStack gap={4} mt={12}>
                        <HStack>
                            <Avatar size={"md"} src={post.author.avatar ?? undefined} />
                            <Stack gap={0}>
                                <Text fontSize={"sm"}>{post.author.username}</Text>
                                <Text m={"0 !important"} color={"gray.500"} fontSize={"md"}>
                                    Published {fDate(post.created_at)}
                                </Text>
                            </Stack>
                        </HStack>
                        <VStack gap={0}>
                            <Heading fontWeight={"extrabold"} my={0}>
                                {post.title}
                            </Heading>
                            <Text fontSize={"xl"}>{post.subtitle ?? null}</Text>
                        </VStack>
                        <Wrap gap={4} justify="center">
                            {post.categories.map((category) => (
                                <CategoryButton category={category} key={category.id} />
                            ))}
                        </Wrap>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        <HStack w="100%" justifyContent={"end"}>
                            <Text color={"gray.500"} fontSize={"md"}>
                                {post.updated_at != post.created_at
                                    ? `Updated ${fDate(post.updated_at)}`
                                    : ""}
                            </Text>
                        </HStack>
                    </VStack>
                ) : (
                    <Text color={"gray.500"}>Loading . . .</Text>
                )}
            </Container>
        </Layout>
    );
};

export default Post;
