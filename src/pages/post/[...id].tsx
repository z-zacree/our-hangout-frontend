import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPost } from "../../api/post_api";

const Post = () => {
    let { id } = useParams();
    let { post } = useGetPost(parseInt(id!));
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (post) {
            setIsLoaded(true);
        } else {
            setIsLoaded(false);
        }
    }, [post]);

    return (
        <Box w="fit-content" h="100%" mx="auto">
            asdasd
        </Box>
    );
};

export default Post;
