import { Box, Center, Text, useColorMode } from "@chakra-ui/react";

export default () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Center h="100vh">
            <Text fontSize="xl" fontWeight="bold">
                404
            </Text>
            <Box m={4} w={0.5} h="3rem" bg={colorMode == "light" ? "black" : "white"} />
            <Text>This page is still under construction</Text>
        </Center>
    );
};
