import { FC, useContext, useEffect } from "react";
import { AuthContext } from "@/utils/context/utils";
import BookmarksLayout from "./layout";
import { useNavigate } from "react-router-dom";
import { useGetBookmarks } from "@/hooks/post";
import { Center, CircularProgress, Stack } from "@chakra-ui/react";
import { PostCard } from "../../components";

const Bookmarks: FC = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const { posts } = useGetBookmarks(auth.token!);

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) navigate("/");
    }, [auth]);

    return (
        <BookmarksLayout>
            {posts ? (
                <Stack gap={1}>
                    {posts.map((post) => {
                        return <PostCard post={post} key={post.id} />;
                    })}
                </Stack>
            ) : (
                <Center h={"calc(100vh - 80px)"}>
                    <CircularProgress isIndeterminate color={"gray.500"} />
                </Center>
            )}
        </BookmarksLayout>
    );
};

export default Bookmarks;
