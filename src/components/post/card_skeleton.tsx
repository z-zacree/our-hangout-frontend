import { Box, Flex, HStack, Spacer, useColorMode, Skeleton } from "@chakra-ui/react";
import { IoEye, IoBookmark } from "react-icons/io5";
import { FC } from "react";

const PostCard: FC = () => {
    const { colorMode } = useColorMode();

    let cardBg = colorMode === "light" ? "white" : "hsl(0, 0%, 10%)";

    return (
        <Box
            as="article"
            bg={cardBg}
            p={[4, 5, 4, 6]}
            maxH="180px"
            borderWidth={1}
            borderRadius={8}
        >
            <Skeleton h={5} w="25%" />
            <Skeleton h={8} my={2} />
            <Skeleton h={7} w="33%" />
            <HStack mt={2} alignItems="flex-end">
                <Skeleton h={8} w="20%" />

                <Spacer />
                <Flex align="center">
                    <Skeleton h={4} w={8} />
                    <Box as={IoEye} ml={2} color="green.500" />
                </Flex>
                <Flex ml={10} align="center">
                    <Skeleton h={4} w={8} />

                    <Box as={IoBookmark} ml={2} color="green.500" />
                </Flex>
            </HStack>
        </Box>
    );
};

export default PostCard;
