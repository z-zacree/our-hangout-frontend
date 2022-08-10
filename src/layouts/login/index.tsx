import { FC, useCallback, useContext, useEffect, useState } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { AccountResponse } from "@/models";
import { AuthContext } from "@/utils/context/utils";
import { RouteNames } from "../../utils/routes";

export interface LoginData {
    email: string;
    password: string;
    stay: boolean;
}

const Login: FC = () => {
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
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
            <Stack spacing={8} maxW={"md"}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"gray.500"}>
                        to enjoy all of our cool <Link color={"purple.400"}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                stay: false,
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({ values, errors, touched, handleChange, handleBlur }) => (
                                <Form>
                                    <FormControl
                                        id="email"
                                        isInvalid={touched.email && !!errors.email}
                                        isRequired
                                    >
                                        <FormLabel>Email address</FormLabel>
                                        <Field
                                            as={Input}
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            variant="filled"
                                        />
                                    </FormControl>
                                    <FormControl
                                        id="password"
                                        isInvalid={touched.password && !!errors.password}
                                        isRequired
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
                                    </FormControl>
                                    <Stack spacing={6} mt={4}>
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
                        <Text align="center">
                            No account?{" "}
                            <Link
                                as={ReactRouterLink}
                                to={RouteNames.register}
                                color={"purple.400"}
                            >
                                Create one now!
                            </Link>
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Login;
