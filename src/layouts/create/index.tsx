import { AuthContext } from "@/utils/context/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChangeEvent, createRef, FC, useContext, useEffect, useState } from "react";

import {
    Box,
    Button,
    Center,
    Container,
    Divider,
    Grid,
    GridItem,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import axios from "axios";
import { TbCheck } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { PostType } from "../../models/enums";
import EditorMenu from "./components/menu";

const CreatePost: FC = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { auth } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [type, setType] = useState<string>(PostType.Advice);
    const [categoryText, setCategoryText] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const titleRef = createRef<HTMLParagraphElement>();
    const subtitleRef = createRef<HTMLParagraphElement>();
    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Placeholder.configure({
                placeholder: "Write your post content here...",
            }),
        ],
    });

    const handleTitle = (e: ChangeEvent<HTMLParagraphElement>) => {
        let text = e.target.innerText;
        text = text.replace(/(\r\n|\n|\r)/gm, "");

        if (text.length <= 48) {
            setTitle(text);
        } else {
            if (!toast.isActive("title-max-char")) {
                setTitle(text.substring(0, 48));

                toast({
                    id: "title-max-char",
                    title: "Title Max Characters",
                    description: "Post title can only contain 48 characters or less",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const handleSubtitle = (e: ChangeEvent<HTMLParagraphElement>) => {
        let text = e.target.innerText;
        text = text.replace(/(\r\n|\n|\r)/gm, "");

        if (text.length <= 128) {
            setSubtitle(text);
        } else {
            subtitleRef.current!.innerText = subtitle;
            if (!toast.isActive("subtitle-max-char")) {
                setSubtitle(text.substring(0, 128));

                toast({
                    id: "subtitle-max-char",
                    title: "Subtitle Max Characters",
                    description: "Post subtitle can only contain 128 characters or less",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const formData = {
            title,
            subtitle,
            type,
            categories,
            content: editor?.getHTML(),
        };

        axios
            .post("http://localhost:8000/api/posts", formData, {
                headers: { Authorization: `Bearer ${auth.token}` },
            })
            .then(({ data }) => {
                setLoading(false);
                if (!toast.isActive("create-post-success")) {
                    toast({
                        id: "create-post-success",
                        title: "Post Created Successfully",
                        description: data.message,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                }
                navigate("/", { replace: true });
            })
            .catch(() => {
                setLoading(false);
                if (!toast.isActive("create-post-failure")) {
                    toast({
                        id: "create-post-failure",
                        title: "Post Was Not Created Successfully",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            });
    };

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            navigate(-1);
        }
    }, [auth]);

    return (
        <Container maxW={"7xl"} pb={8}>
            <Heading>Create a Post</Heading>
            <Box
                pt={8}
                rounded={"lg"}
                border={"1px"}
                bg={useColorModeValue("white", "gray.700")}
                maxH={"2xl"}
                overflow="scroll"
            >
                <Text
                    mx={8}
                    p={4}
                    rounded={"lg"}
                    ref={titleRef}
                    fontSize={"4xl"}
                    textAlign={"left"}
                    onInput={handleTitle}
                    fontWeight={"extrabold"}
                    bg={useColorModeValue("gray.100", "gray.600")}
                    _before={
                        title
                            ? {}
                            : {
                                  color: "#adb5bd",
                                  content: '"Post title here!"',
                                  pointerEvents: "none",
                              }
                    }
                    onKeyDown={(evt) => {
                        if (evt.key === "Enter") evt.preventDefault();
                        if ((titleRef.current?.innerText.length ?? 0) >= 48) {
                            if (evt.key !== "Backspace") {
                                evt.preventDefault();
                            }
                        }
                    }}
                    contentEditable
                    suppressContentEditableWarning
                />
                <Text
                    mx={8}
                    my={2}
                    p={4}
                    fontSize={"xl"}
                    ref={subtitleRef}
                    variant={"unstyled"}
                    onInput={handleSubtitle}
                    _before={
                        subtitle
                            ? {}
                            : {
                                  color: "#adb5bd",
                                  content: '"Post subtitle here!"',
                                  pointerEvents: "none",
                              }
                    }
                    onKeyDown={(evt) => {
                        if (evt.key === "Enter") evt.preventDefault();
                        if ((subtitleRef.current?.innerText.length ?? 0) >= 128) {
                            if (evt.key != "Backspace") {
                                evt.preventDefault();
                            }
                        }
                    }}
                    contentEditable
                    suppressContentEditableWarning
                />
                <EditorMenu editor={editor} />
                <EditorContent editor={editor} placeholder={"editor"} autoFocus />
            </Box>
            <Box my={4} rounded={"lg"} border={"1px"} bg={useColorModeValue("white", "gray.700")}>
                <Text m={4} fontSize={"lg"}>
                    Select Type & Category
                </Text>
                <Divider />
                <Grid
                    h="100%"
                    templateColumns={{
                        base: "auto 1fr",
                    }}
                    gap={4}
                >
                    <GridItem p={4}>Type</GridItem>
                    <GridItem p={4}>
                        <Select
                            value={type}
                            onChange={(e) => {
                                setType(e.currentTarget.value);
                            }}
                        >
                            <option value={PostType.Advice}>{PostType.Advice}</option>
                            <option value={PostType.Blog}>{PostType.Blog}</option>
                            <option value={PostType.Complaint}>{PostType.Complaint}</option>
                            <option value={PostType.Request}>{PostType.Request}</option>
                        </Select>
                    </GridItem>
                    <GridItem p={4}>Categories</GridItem>
                    <GridItem p={4}>
                        <InputGroup mb={1}>
                            <Input
                                pr={12}
                                type={"text"}
                                value={categoryText}
                                onChange={(e) => setCategoryText(e.currentTarget.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur();
                                        if (
                                            !categories.includes(categoryText.trim()) &&
                                            categoryText.trim().length != 0
                                        ) {
                                            setCategories([...categories, categoryText.trim()]);
                                        }
                                        setCategoryText("");
                                    }
                                }}
                            />
                            <InputRightElement w={12}>
                                <IconButton
                                    h={8}
                                    w={8}
                                    aria-label="Set Category"
                                    icon={<TbCheck />}
                                    onClick={() => {
                                        if (
                                            !categories.includes(categoryText.trim()) &&
                                            categoryText.trim().length != 0
                                        ) {
                                            setCategories([...categories, categoryText.trim()]);
                                        }
                                        setCategoryText("");
                                    }}
                                />
                            </InputRightElement>
                        </InputGroup>
                        {categories.map((category, index) => {
                            return (
                                <Tag
                                    m={1}
                                    size={"md"}
                                    variant={"outline"}
                                    colorScheme={"purple"}
                                    key={index}
                                >
                                    <TagLabel>{category}</TagLabel>
                                    <TagCloseButton
                                        onClick={() => {
                                            const index = categories.indexOf(category);
                                            categories.splice(index, 1);
                                            setCategories([...categories]);
                                        }}
                                    />
                                </Tag>
                            );
                        })}
                    </GridItem>
                </Grid>
            </Box>
            <Button
                w={["full", "auto"]}
                onClick={handleSubmit}
                isLoading={loading}
                isDisabled={!title || !subtitle || !type || loading || categories.length < 1}
            >
                Create Post
            </Button>
        </Container>
    );
};

export default CreatePost;
