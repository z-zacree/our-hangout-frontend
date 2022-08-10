import { FC, useCallback, useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthErrorResponse } from "@/models/enums";

interface LoginData {
    email: string;
    password: string;
    stay: boolean;
}

const Login: FC = () => {
    const navigate = useNavigate();
    const [showError, setShowError] = useState({
        open: false,
        text: AuthErrorResponse.Default,
    });
    const [showPW, setShowPW] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleDefault = useCallback(async (values: LoginData) => {
        setLoading(true);
        const formData = {
            stay: values.stay,
            email: values.email.trim(),
            password: values.password.trim(),
        };

        axios
            .post("http://localhost:8000/api/login", formData)
            .then(({ data }) => {
                setLoading(false);
                localStorage.setItem("token", data?.token);
                navigate("/", { replace: true });
            })
            .catch(({ response }) => {
                setLoading(false);
            });
    }, []);

    const handleError = useEffect(() => {}, []);

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
                            onSubmit={handleDefault}
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
                                    <Stack spacing={10} mt={4}>
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
                                            color={useColorModeValue("white", "black")}
                                            colorScheme="purple"
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Login;
