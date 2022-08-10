import { Box, Button, Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { IoChevronBack, IoSettings } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "@/models";
import { useGetCategoryPosts } from "@/hooks/post";

interface HeaderProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const { name } = useParams();

    const { categoryPosts } = useGetCategoryPosts(name!);

    const category = categoryPosts?.category;

    return (
        <Box
            bg={useColorModeValue("white", "hsl(0, 0%, 10%)")}
            borderRadius={8}
            p={4}
            borderBottom="8px"
            borderBottomColor={category?.color}
        >
            <Flex justifyContent="space-between">
                <Box>
                    <Button
                        leftIcon={<IoChevronBack />}
                        onClick={() => navigate(-1)}
                        display={{ base: "inline-flex", md: "none" }}
                    >
                        Not your cup of tea?
                    </Button>
                    <Text fontSize="4xl" fontWeight="bold">
                        {name?.toLocaleUpperCase()[0]}
                        {name?.slice(1)}
                    </Text>
                    <Text fontSize="l">{category?.description}</Text>
                </Box>
                <IconButton
                    icon={<IoSettings />}
                    aria-label="open sort settings"
                    onClick={() => setOpen(!open)}
                />
            </Flex>
        </Box>
    );
};

export default Header;
