import { Center, Container } from "@chakra-ui/react";
import { FC } from "react";
import { useGetCategories } from "../../hooks/post";

const Categories: FC = () => {
    const { categories } = useGetCategories();
    if (categories) console.log(categories);
    return <Container maxW={"7xl"}></Container>;
};

export default Categories;
