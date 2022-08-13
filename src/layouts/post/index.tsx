import { useGetPost } from "@/hooks/post";
import { fDate } from "@/utils/date";
import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    SimpleGrid,
    Stack,
    Text,
    VStack,
    Wrap,
} from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import CategoryButton from "../../components/post/category_link";
import Layout from "./layout";

const Post: FC = () => {
    window.scroll(0, 0);
    let { id } = useParams();
    let { post, isLoading } = useGetPost(parseInt(id!));

    if (!isLoading) {
        console.table(post);
    }

    return (
        <Layout>
            <Container maxW={"7xl"} display={"flex"} justifyContent={"center"}>
                {post ? (
                    <VStack gap={4} mt={12}>
                        <Text color={"gray.500"} fontSize={"md"}>
                            Published {fDate(post.created_at)}
                        </Text>
                        <Heading>{post.title}</Heading>
                        <Wrap gap={4} justify="center">
                            {post.categories.map((category) => (
                                <CategoryButton category={category} key={category.id} />
                            ))}
                        </Wrap>
                        <Text>{post.content}</Text>
                        <HStack w="100%" justifyContent={"space-between"}>
                            <Text>By: {post.author}</Text>
                            <Text>
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
