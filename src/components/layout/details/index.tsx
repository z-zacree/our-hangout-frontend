import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import ArticleActions from "./article_actions";

const DetailsLayout = () => {
    return (
        <Navbar isOutlet={false}>
            <Grid
                maxW="7xl"
                h="100%"
                templateColumns={{
                    base: "2fr",
                    md: "80px 2fr",
                }}
                gap={4}
                p={{ base: 0, md: 4 }}
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
                    <ArticleActions />
                </GridItem>
                <GridItem w="100%">
                    <Outlet />
                </GridItem>
            </Grid>
        </Navbar>
    );
};

export default DetailsLayout;
