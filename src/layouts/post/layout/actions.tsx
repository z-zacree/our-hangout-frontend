import { useGetPost } from "@/hooks/post";
import { IconButton, Text, Tooltip, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { IoBookmarkOutline, IoDocuments } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { AccountResponse } from "@/models";
import { AuthContext } from "@/utils/context/utils";

const Actions = () => {
    const toast = useToast();
    let { id } = useParams();
    let { post } = useGetPost(parseInt(id!));
    const [loading, setLoading] = useState(false);
    const { auth, dispatch } = useContext(AuthContext);
    const handleCopyURL = () => {
        navigator.clipboard.writeText(window.location.href).then(
            () => {
                if (!toast.isActive("copy-url-success")) {
                    toast({
                        id: "copy-url-success",
                        title: "Post URL successfully copied",
                        description: window.location.href,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            },
            (e) => {
                if (!toast.isActive("copy-url-error")) {
                    toast({
                        id: "copy-url-error",
                        title: "Post URL failed to copy",
                        description: e,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            }
        );
    };

    const handleBookmark = async () => {
        if (post) {
            setLoading(true);
            if (auth.account?.bookmarks.includes(post.id)) {
                const res = await axios
                    .delete(`http://localhost:8000/api/bookmark/${post.id}`, {
                        headers: { Authorization: `Bearer ${auth.token}` },
                    })
                    .then(({ data }) => {
                        setLoading(false);
                        if (!toast.isActive("remove-bookmark-success")) {
                            toast({
                                id: "remove-bookmark-success",
                                title: "Successfully removed post from bookmarks",
                                description: data.message,
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                            });
                        }
                        return data as AccountResponse;
                    })
                    .catch(({ response }) => {
                        setLoading(false);
                        if (!toast.isActive("remove-bookmark-error")) {
                            toast({
                                id: "remove-bookmark-error",
                                title: "Failed to remove post from bookmarks",
                                description: response,
                                status: "error",
                                duration: 3000,
                                isClosable: true,
                            });
                        }
                        return null;
                    });
                if (res) {
                    dispatch({ ...auth, account: res.account });
                    post.bookmarks--;
                }
            } else {
                const res = await axios
                    .post(
                        `http://localhost:8000/api/bookmark/${post.id}`,
                        {},
                        { headers: { Authorization: `Bearer ${auth.token}` } }
                    )
                    .then(({ data }) => {
                        setLoading(false);
                        if (!toast.isActive("add-bookmark-success")) {
                            toast({
                                id: "add-bookmark-success",
                                title: "Successfully added post to bookmarks",
                                description: data.message,
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                            });
                        }
                        return data as AccountResponse;
                    })
                    .catch(({ response }) => {
                        setLoading(false);
                        if (!toast.isActive("add-bookmark-error")) {
                            toast({
                                id: "add-bookmark-error",
                                title: "Failed to add post to bookmarks",
                                description: response,
                                status: "error",
                                duration: 3000,
                                isClosable: true,
                            });
                        }
                        return null;
                    });
                if (res) {
                    dispatch({ ...auth, account: res.account });
                    post.bookmarks++;
                }
            }
        }
    };

    return (
        <VStack as={"aside"} p={4} gap={4}>
            <VStack gap={0}>
                <Tooltip label={"Bookmark"} placement={"right"} hasArrow shouldWrapChildren>
                    <IconButton
                        colorScheme={
                            auth.isAuthenticated && auth.account?.bookmarks?.includes(post?.id)
                                ? "purple"
                                : "gray"
                        }
                        disabled={!auth.isAuthenticated || !post || loading}
                        isLoading={loading}
                        size={"lg"}
                        aria-label={"Bookmark"}
                        icon={<IoBookmarkOutline />}
                        onClick={handleBookmark}
                    />
                </Tooltip>
                <Text fontFamily={"mono"}>{post ? post.bookmarks : null}</Text>
            </VStack>
            <Tooltip label={"Copy Link"} placement={"right"} hasArrow>
                <IconButton
                    size={"lg"}
                    aria-label={"Copy Link"}
                    icon={<IoDocuments />}
                    onClick={handleCopyURL}
                />
            </Tooltip>
        </VStack>
    );
};

export default Actions;
