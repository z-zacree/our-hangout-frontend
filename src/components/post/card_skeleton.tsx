import { Box, Flex, HStack, Spacer, useColorModeValue, Skeleton } from "@chakra-ui/react";
import { IoEye, IoBookmark } from "react-icons/io5";
import { FC } from "react";

const PostCard: FC = () => {
    return (
        <Box
            as={"article"}
            bg={useColorModeValue("white", "gray.700")}
            p={4}
            boxShadow={"md"}
            borderRadius={8}
        >
            <Skeleton h={6} w="25%" />
            <Skeleton h={8} my={2} />
            <Skeleton h={7} w="33%" />
            <HStack mt={2} alignItems="flex-end">
                <Skeleton h={8} w="20%" />

                <Spacer />
                <Flex align="center">
                    <Skeleton h={4} w={8} />
                    <Box as={IoEye} ml={2} color="purple.500" />
                </Flex>
                <Flex ml={10} align="center">
                    <Skeleton h={4} w={8} />

                    <Box as={IoBookmark} ml={2} color="purple.500" />
                </Flex>
            </HStack>
        </Box>
    );
};

export default PostCard;
