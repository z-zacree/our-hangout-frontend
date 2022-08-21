import {
    AspectRatio,
    Box,
    Center,
    CircularProgress,
    Container,
    Image,
    SimpleGrid,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategories } from "@/hooks/post";
import CategoriesLayout from "./layout";

const Categories: FC = () => {
    const navigate = useNavigate();
    const { categories } = useGetCategories();

    const cardBG = useColorModeValue("white", "gray.700");
    const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
    return (
        <CategoriesLayout>
            <Container maxW={"7xl"}>
                {categories ? (
                    <SimpleGrid columns={categories ? [1, null, 2] : 1} spacing={6}>
                        {categories.map((category) => {
                            return (
                                <Box
                                    p={6}
                                    h={56}
                                    rounded={"md"}
                                    position={"relative"}
                                    boxShadow={"md"}
                                    borderBottom={"4px solid"}
                                    borderColor={category.color}
                                    bg={cardBG}
                                    transition={"0.2s ease"}
                                    _hover={{
                                        boxShadow: "lg",
                                        transform: "scale(1.02)",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate(`../c/${category.name.toLowerCase()}`)}
                                    key={category.id}
                                >
                                    <Text fontSize={"2xl"} fontWeight={"extrabold"}>
                                        {category.name}
                                    </Text>
                                    <Text noOfLines={2}>{category.description}</Text>
                                    <Text
                                        position={"absolute"}
                                        bottom={4}
                                        color={secondaryTextColor}
                                    >
                                        {category.count} Posts
                                    </Text>
                                </Box>
                            );
                        })}
                    </SimpleGrid>
                ) : (
                    <Center h={"calc(100vh - 80px)"}>
                        <CircularProgress isIndeterminate color={"gray.500"} />
                    </Center>
                )}
            </Container>
        </CategoriesLayout>
    );
};

export default Categories;
