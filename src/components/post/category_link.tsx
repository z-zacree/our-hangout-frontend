import { Button, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Category } from "../../models";
import { Link as ReactRouterLink } from "react-router-dom";

interface ButtonProps {
    category: Category;
}

const CategoryButton: FC<ButtonProps> = ({ category }) => {
    return (
        <Button
            mr={2}
            size={"sm"}
            variant={"outline"}
            as={ReactRouterLink}
            to={`/c/${category.name.toLowerCase()}`}
            borderColor={`${category.color}75`}
            _hover={{
                bg: `${category.color}1a`,
                borderColor: category.color,
            }}
        >
            <Text fontWeight={"normal"}>{category.name}</Text>
        </Button>
    );
};

export default CategoryButton;
