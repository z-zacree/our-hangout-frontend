import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    GridItem,
    HStack,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Sort } from "../../../models/enum";
import PostCard from "../../post/display/card";
import Navbar from "../navbar";
import Additional from "./additional";
import Primary from "./primary";

const ListingLayout = () => {
    return (
        <Navbar isOutlet={false}>
            <Grid
                maxW="7xl"
                h="100%"
                templateColumns={{
                    base: "2fr",
                    md: "240px 2fr",
                    xl: "240px 2fr 1fr",
                }}
                gap={4}
                p={4}
                mx="auto"
            >
                <GridItem
                    position="sticky"
                    alignSelf="flex-start"
                    top={4}
                    display={{ base: "none", md: "block" }}
                    bg="blue.500"
                    borderRadius={12}
                >
                    <Primary />
                </GridItem>
                <GridItem w="100%">
                    <Outlet />
                </GridItem>
                <GridItem
                    position="sticky"
                    alignSelf="flex-start"
                    top={4}
                    display={{ base: "none", xl: "block" }}
                    bg="blue.500"
                    borderRadius={12}
                >
                    <Additional />
                </GridItem>
            </Grid>
        </Navbar>
    );
};
export default ListingLayout;
