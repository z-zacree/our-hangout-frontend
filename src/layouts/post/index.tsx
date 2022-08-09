import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetPost } from "@/hooks/post";
import Layout from "./layout";

const Post: FC = () => {
    let { id } = useParams();
    let { post, isLoading } = useGetPost(parseInt(id!));

    if (!isLoading) {
        console.table(post);
    }

    return (
        <Layout>
            <Box w="fit-content" h="100%" m="auto">
                asdasd
            </Box>
        </Layout>
    );
};

export default Post;
