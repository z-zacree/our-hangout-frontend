import { FC } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Avatar,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik } from "formik";

const Register: FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {};

    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
            <Stack spacing={20} maxW={"md"}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign up</Heading>
                    <Text fontSize={"lg"} color={"gray.500"}>
                        to enjoy all of our cool features ✌️
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
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur }) => {
                            return (
                                <>
                                    <Avatar
                                        position={"absolute"}
                                        top={-12}
                                        left={0}
                                        right={0}
                                        mx={"auto"}
                                        size={"xl"}
                                        name={values.username}
                                        src={values.avatar}
                                    />
                                    <Button mx="auto">Change Profile</Button>
                                </>
                            );
                        }}
                    </Formik>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Register;
