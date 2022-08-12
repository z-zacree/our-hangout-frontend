import { AccountResponse } from "@/models";
import { AuthContext } from "@/utils/context/utils";
import { RouteNames } from "@/utils/routes";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Checkbox,
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
import { useCallback, useContext, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface LoginData {
    email: string;
    password: string;
    stay: boolean;
}

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const [showPW, setShowPW] = useState(false);

    const handleSubmit = useCallback(async (values: LoginData) => {
        setLoading(true);
        const formData = {
            stay: values.stay,
            email: values.email.trim(),
            password: values.password.trim(),
        };

        axios
            .post("http://localhost:8000/api/login", formData)
            .then(({ data }: { data: AccountResponse }) => {
                setLoading(false);
                dispatch({
                    isLoading: false,
                    isAuthenticated: true,
                    token: data.token,
                    account: data.account,
                });
                toast({
                    title: "Login success.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/", { replace: true });
            })
            .catch(() => {
                setLoading(false);
                toast({
                    title: "Invalid Credentials.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    }, []);

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"gray.500"}>
                        to enjoy all of our cool <Link color={"purple.400"}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    p={8}
                    rounded={"lg"}
                    boxShadow={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                >
                    <Stack spacing={4}>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                stay: false,
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={SignInSchema}
                        >
                            {({ values, errors, touched, handleChange, handleBlur }) => (
                                <Form>
                                    <Stack spacing={6}>
                                        <FormControl
                                            id="email"
                                            isInvalid={touched.email && !!errors.email}
                                        >
                                            <FormLabel>Email address</FormLabel>
                                            <Field
                                                as={Input}
                                                id="email"
                                                name="email"
                                                autoComplete="email"
                                                variant="filled"
                                            />
                                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            id="password"
                                            isInvalid={touched.password && !!errors.password}
                                        >
                                            <FormLabel>Password</FormLabel>
                                            <InputGroup>
                                                <Input
                                                    id="password"
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
                                        <Stack
                                            direction={{ base: "column", sm: "row" }}
                                            align={"start"}
                                            justify={"space-between"}
                                        >
                                            <Checkbox
                                                colorScheme="purple"
                                                name="stay"
                                                onChange={handleChange}
                                            >
                                                Remember me
                                            </Checkbox>
                                            <Link color={"purple.400"}>Forgot password?</Link>
                                        </Stack>
                                        <Button
                                            disabled={isLoading}
                                            color={useColorModeValue("white", "black")}
                                            colorScheme="purple"
                                            type="submit"
                                        >
                                            {isLoading ? "Attempting to sign you in" : "Sign in"}
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                </Box>
                <Text align="center">
                    No account?{" "}
                    <Link as={ReactRouterLink} to={RouteNames.register} color={"purple.400"}>
                        Create one now!
                    </Link>
                </Text>
            </Stack>
        </Flex>
    );
};

const SignInSchema = Yup.object({
    email: Yup.string().email("Please enter a valid email.").required("Email is required."),
    password: Yup.string().min(8, "Password is invalid").required("Password is required"),
});

export default Login;
