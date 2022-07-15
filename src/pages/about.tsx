import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    Box,
} from "@chakra-ui/react";
import { IoBicycle, IoPeople, IoSearchSharp } from "react-icons/io5";
import { ReactElement } from "react";

interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
    return (
        <Stack direction={"row"} align={"center"}>
            <Flex w={8} h={8} align={"center"} justify={"center"} rounded={"full"} bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};

const SplitWithImage = () => {
    return (
        <Box maxW="5xl">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    <Text
                        textTransform={"uppercase"}
                        color={"blue.400"}
                        fontWeight={600}
                        fontSize={"sm"}
                        bg={useColorModeValue("blue.50", "blue.900")}
                        p={2}
                        alignSelf={"flex-start"}
                        rounded={"md"}
                    >
                        Our Story
                    </Text>
                    <Heading>Our Hangout</Heading>
                    <Text color={"gray.500"} fontSize={"lg"}>
                        It's become more and more unlikely for people to find a new place to explore
                        in Singapore as we are all busy with school, work, etc...
                        <br />
                        <br />
                        With this Blog website, we can share about our favourite places to hang out
                        with friends or alone. This will give opportunities not only for anyone to
                        find new places to visit, but also for companies to grow
                    </Text>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider borderColor={useColorModeValue("gray.900", "gray.700")} />
                        }
                    >
                        <Feature
                            icon={
                                <Icon
                                    as={IoSearchSharp}
                                    color={useColorModeValue("purple.500", "purple.600")}
                                    w={5}
                                    h={5}
                                />
                            }
                            iconBg={useColorModeValue("purple.200", "purple.300")}
                            text={"Discovery"}
                        />
                        <Feature
                            icon={
                                <Icon
                                    as={IoPeople}
                                    color={useColorModeValue("green.500", "green.600")}
                                    w={5}
                                    h={5}
                                />
                            }
                            iconBg={useColorModeValue("green.200", "green.300")}
                            text={"Outings"}
                        />
                        <Feature
                            icon={
                                <Icon
                                    as={IoBicycle}
                                    color={useColorModeValue("yellow.500", "yellow.600")}
                                    w={5}
                                    h={5}
                                />
                            }
                            iconBg={useColorModeValue("yellow.200", "yellow.300")}
                            text={"Activities"}
                        />
                    </Stack>
                </Stack>
                <Flex>
                    <Image
                        rounded={"md"}
                        alt={"feature image"}
                        src={
                            "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        }
                        objectFit={"cover"}
                    />
                </Flex>
            </SimpleGrid>
        </Box>
    );
};

export default SplitWithImage;
