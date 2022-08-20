import { Grid, GridItem } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { PrimarySidebar } from "../../../components";

const CategoriesLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Grid
            maxW="7xl"
            h="100%"
            templateColumns={{
                base: "2fr",
                lg: "240px 2fr",
            }}
            gap={4}
            p={4}
            mx="auto"
        >
            <GridItem
                position="sticky"
                alignSelf="flex-start"
                top={4}
                display={{ base: "none", lg: "block" }}
            >
                <PrimarySidebar />
            </GridItem>
            <GridItem>{children}</GridItem>
        </Grid>
    );
};

export default CategoriesLayout;
