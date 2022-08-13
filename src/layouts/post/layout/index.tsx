import { Grid, GridItem } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import Actions from "./actions";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
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
            >
                <Actions />
            </GridItem>
            <GridItem w="100%">{children}</GridItem>
        </Grid>
    );
};
export default Layout;
