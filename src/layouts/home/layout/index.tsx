import { Grid, GridItem } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import AdditionalSideBar from "./additional";
import PrimarySideBar from "./primary";

const ListingLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
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
                borderRadius={8}
            >
                <PrimarySideBar />
            </GridItem>
            <GridItem>{children}</GridItem>
            <GridItem
                position="sticky"
                alignSelf="flex-start"
                top={4}
                display={{ base: "none", xl: "block" }}
                bg="blue.500"
                borderRadius={8}
            >
                <AdditionalSideBar />
            </GridItem>
        </Grid>
    );
};
export default ListingLayout;
