import { AuthContext } from "@/utils/context/utils";
import { RouteNames } from "@/utils/routes";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { FC, useCallback, useContext, useRef, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AccountResponse } from "../../models";

interface RegisterData {
    avatar: string;
    username: string;
    email: string;
    password: string;
}

const Register: FC = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const inputRef = useRef<HTMLInputElement>(null);
    const { auth, dispatch } = useContext(AuthContext);
    const [showPW, setShowPW] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = useCallback(async (values: RegisterData) => {
        setLoading(true);
        const avatar_url = await axios
            .post("https://api.cloudinary.com/v1_1/dodf3fmwt/upload", {
                file: values.avatar,
                upload_preset: "y4t77cxy",
            })
            .then(({ data }) => data.secure_url)
            .catch(() => "");

        const formData = {
            avatar: avatar_url,
            username: values.username.trim().length == 0 ? null : values.username.trim(),
            email: values.email.trim(),
            password: values.password.trim(),
        };

        axios
            .post("http://localhost:8000/api/register", formData)
            .then(async ({ data }: { data: AccountResponse }) => {
                setLoading(false);

                dispatch({
                    ...auth,
                    isAuthenticated: true,
                    token: data.token,
                    account: data.account,
                });

                navigate("/");
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

        setLoading(false);
    }, []);

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"} mb={12}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up for an account
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.500"}>
                        to enjoy all of our cool <Link color={"purple.400"}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    p={8}
                    rounded={"lg"}
                    boxShadow={"lg"}
                    position={"relative"}
                    bg={useColorModeValue("white", "gray.700")}
                >
                    <Formik
                        initialValues={{
                            avatar: "",
                            username: "",
                            email: "",
                            password: "",
                        }}
                        validationSchema={SignUpSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
                            return (
                                <Form>
                                    <Box
                                        position={"absolute"}
                                        top={-12}
                                        left={0}
                                        right={0}
                                        display={"flex"}
                                        flexDir={"column"}
                                        alignItems={"center"}
                                    >
                                        <Avatar
                                            border={useColorModeValue(
                                                "4px solid white",
                                                "4px solid var(--chakra-colors-gray-700)"
                                            )}
                                            size={"2xl"}
                                            src={values.avatar ?? undefined}
                                        />
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
                                                        setFieldValue(
                                                            "avatar",
                                                            event.target?.result
                                                        );
                                                    });

                                                    reader.readAsDataURL(fileList[0]);
                                                } else {
                                                    setFieldValue("avatar", null);
                                                }
                                            }}
                                        />
                                        <Button
                                            mt={4}
                                            w="32"
                                            onClick={() => inputRef.current?.click()}
                                        >
                                            Select Picture
                                        </Button>
                                    </Box>
                                    <Stack spacing={6} mt={32}>
                                        <FormControl
                                            id="email"
                                            isInvalid={touched.email && !!errors.email}
                                        >
                                            <FormLabel htmlFor="email">Email Address</FormLabel>
                                            <Field
                                                as={Input}
                                                id="email"
                                                name="email"
                                                variant="filled"
                                                autoComplete="new-email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            id="username"
                                            isInvalid={touched.username && !!errors.username}
                                        >
                                            <FormLabel htmlFor="username">Username</FormLabel>
                                            <Field
                                                as={Input}
                                                id="username"
                                                name="username"
                                                variant="filled"
                                                autoComplete="none"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <FormErrorMessage>{errors.username}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            id="password"
                                            isInvalid={touched.password && !!errors.password}
                                        >
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <InputGroup>
                                                <Input
                                                    id="registerPassword"
                                                    name="password"
                                                    autoComplete="new-password"
                                                    type={showPW ? "text" : "password"}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    variant="filled"
                                                />
                                                <InputRightElement>
                                                    <Button
                                                        variant={"ghost"}
                                                        onClick={() => setShowPW(!showPW)}
                                                    >
                                                        {showPW ? <ViewIcon /> : <ViewOffIcon />}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                                        </FormControl>
                                        <Button
                                            disabled={isLoading}
                                            isLoading={isLoading}
                                            color={useColorModeValue("white", "black")}
                                            colorScheme="purple"
                                            type="submit"
                                        >
                                            {isLoading ? "Attempting to register" : "Register"}
                                        </Button>
                                    </Stack>
                                </Form>
                            );
                        }}
                    </Formik>
                </Box>
                <Text align="center">
                    Have an account?{" "}
                    <Link as={ReactRouterLink} to={RouteNames.login} color={"purple.400"}>
                        Login!
                    </Link>
                </Text>
            </Stack>
        </Flex>
    );
};

const SignUpSchema = Yup.object({
    username: Yup.string()
        .max(48, "Must be 48 characters or less")
        .required("Username is required"),
    email: Yup.string().email("Please enter a valid email.").required("Email is required."),
    password: Yup.string()
        .min(8, "Password has to be longer than 8 characters.")
        .matches(
            RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
            "Minimum eight characters,\n\nat least one uppercase letter,\n\none lowercase letter and\n\none number."
        )
        .required("Password is required."),
});

export default Register;
