import { SmallCloseIcon } from "@chakra-ui/icons";
import {
    Avatar,
    AvatarBadge,
    Box,
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Icon,
    IconButton,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { ChangeEvent, FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/utils";

import * as Yup from "yup";
import axios from "axios";
import { Account, AccountResponse } from "../../models";

interface InputData {
    data: string;
    touched: boolean;
    error: string | null;
}

interface AvatarData {
    url: string | undefined;
    touched: boolean;
}

const initData: InputData = { data: "", touched: false, error: null };

const AccountPage: FC = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const { auth, dispatch } = useContext(AuthContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<InputData>(initData);
    const [username, setUsername] = useState<InputData>(initData);
    const [description, setDescription] = useState<InputData>(initData);
    const [avatar, setAvatar] = useState<AvatarData>({ url: undefined, touched: false });

    useEffect(() => {
        if (!auth.isLoading) {
            if (!auth.isAuthenticated) {
                navigate("/", { replace: true });
            } else {
                setAvatar({ url: auth.account?.avatar ?? undefined, touched: false });
            }
        }
    }, [auth]);

    const handleSubmit = async () => {
        setLoading(true);

        const avatar_url = avatar.url
            ? await axios
                  .post("https://api.cloudinary.com/v1_1/dodf3fmwt/upload", {
                      file: avatar.url,
                      upload_preset: "y4t77cxy",
                  })
                  .then(({ data }) => data.secure_url)
                  .catch(() => null)
            : null;

        const formData = {
            avatar: avatar_url,
            username: username.data ? username.data.trim() : null,
            email: email.data ? email.data.trim() : null,
            description: description.data ? description.data.trim() : null,
        };

        const res = await axios
            .put("http://localhost:8000/api/account", formData, {
                headers: { authorization: `Bearer ${auth.token}` },
            })
            .then(({ data }: { data: AccountResponse }) => {
                setLoading(false);
                toast({
                    title: data.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                return data;
            })
            .catch(({ response }) => {
                setLoading(false);
                toast({
                    title: response.data.message,
                    description: `The following fields were invalid: ${Object.keys(
                        response.data.errors
                    ).join(", ")}`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });

        if (res) dispatch({ ...auth, account: res.account });
        handleCancel();
    };

    const handleCancel = () => {
        setAvatar({ url: auth.account?.avatar ?? undefined, touched: false });
        setUsername(initData);
        setEmail(initData);
        setDescription(initData);
    };

    const handleUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const data = e.currentTarget.value;

        schema
            .validate({ username: data })
            .then(() => {
                setUsername({ error: null, touched: true, data: data });
            })
            .catch((err) => {
                setUsername({ error: err.errors[0], touched: true, data: data });
            });
    }, []);

    const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const data = e.currentTarget.value;

        schema
            .validate({ email: data })
            .then(() => {
                setEmail({ error: null, touched: true, data: data });
            })
            .catch((err) => {
                setEmail({ error: err.errors[0], touched: true, data: data });
            });
    }, []);

    const handleDescription = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const data = e.currentTarget.value;

        schema
            .validate({ description: data })
            .then(() => {
                setDescription({ error: null, touched: true, data: data });
            })
            .catch((err) => {
                setDescription({ error: err.errors[0], touched: true, data: data });
            });
    }, []);

    return (
        <Flex flexDir={"column"} minH={"100vh"}>
            <Button
                m={4}
                w="fit-content"
                leftIcon={<IoChevronBack />}
                colorScheme={"purple"}
                variant={"outline"}
                onClick={() => navigate("/")}
            >
                Back to home
            </Button>
            <Container
                flex={1}
                maxW={"7xl"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box
                    p={8}
                    rounded={"lg"}
                    boxShadow={"lg"}
                    position={"relative"}
                    bg={useColorModeValue("white", "gray.700")}
                    w={"full"}
                    maxW={"md"}
                >
                    <Heading mb={4}>Your Profile</Heading>
                    <Stack gap={4}>
                        <Stack direction={["column", "row"]} gap={4}>
                            <Center>
                                <Avatar size="xl" src={avatar.url}>
                                    <AvatarBadge
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme="red"
                                        aria-label="remove Image"
                                        icon={<SmallCloseIcon />}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setAvatar({
                                                url: undefined,
                                                touched: true,
                                            });
                                        }}
                                    />
                                </Avatar>
                            </Center>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                name={"avatar"}
                                ref={inputRef}
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    let fileList = e.target.files;
                                    if (fileList) {
                                        var reader = new FileReader();

                                        reader.addEventListener("load", (event) => {
                                            setAvatar({
                                                url: (event.target?.result as string) ?? undefined,
                                                touched: true,
                                            });
                                        });

                                        reader.readAsDataURL(fileList[0]);
                                    } else {
                                        setAvatar({
                                            url: undefined,
                                            touched: true,
                                        });
                                    }
                                }}
                            />
                            <Center w="full">
                                <Button w="full" onClick={() => inputRef.current?.click()}>
                                    Edit Avatar
                                </Button>
                            </Center>
                        </Stack>
                        <FormControl id="username" isInvalid={username.touched && !!username.error}>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type={"text"}
                                value={username.data}
                                onChange={handleUsername}
                                placeholder={auth.account?.username}
                                _placeholder={{ color: "gray.500" }}
                            />
                            <FormErrorMessage>{username.error}</FormErrorMessage>
                        </FormControl>
                        <FormControl id="email" isInvalid={email.touched && !!email.error}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type={"email"}
                                value={email.data}
                                onChange={handleEmail}
                                placeholder={auth.account?.email}
                                _placeholder={{ color: "gray.500" }}
                            />
                            <FormErrorMessage>{email.error}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            id="description"
                            isInvalid={description.touched && !!description.error}
                        >
                            <FormLabel>Description</FormLabel>
                            <Input
                                type={"text"}
                                value={description.data}
                                onChange={handleDescription}
                                placeholder={auth.account?.description}
                                _placeholder={{ color: "gray.500" }}
                            />
                            <FormErrorMessage>{description.error}</FormErrorMessage>
                        </FormControl>
                        <Stack spacing={6} direction={["column", "row"]}>
                            <Button w="full" colorScheme="red" onClick={handleCancel}>
                                Reset
                            </Button>
                            <Button
                                colorScheme={"purple"}
                                w="full"
                                onClick={handleSubmit}
                                isDisabled={
                                    loading ||
                                    !!username.error ||
                                    !!email.error ||
                                    !!description.error ||
                                    (!username.touched &&
                                        !email.touched &&
                                        !description.touched &&
                                        !avatar.touched)
                                }
                            >
                                {loading ? "Updating..." : "Update Profile"}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </Flex>
    );
};

export default AccountPage;

const schema = Yup.object({
    username: Yup.string().max(48, "Must be 48 characters or less"),
    email: Yup.string().email("Please enter a valid email."),
    description: Yup.string().max(65536, "Must be 65,536 characters or less"),
});
