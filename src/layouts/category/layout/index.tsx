import { Sort } from "@/models";
import {
    Button,
    ButtonGroup,
    Grid,
    GridItem,
    HStack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, FC, PropsWithChildren, SetStateAction, useState } from "react";
import Header from "./header";
import { PrimarySidebar } from "@/components";

interface LayoutProps extends PropsWithChildren {
    sort: Sort;
    setSort: Dispatch<SetStateAction<Sort>>;
}

const CategoryLayout: FC<LayoutProps> = ({ sort, setSort, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <Grid
            maxW="7xl"
            h="100%"
            templateColumns={{
                base: "1fr",
                md: "240px 2fr",
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
            >
                <PrimarySidebar />
            </GridItem>
            <GridItem>
                <Header open={open} setOpen={setOpen} />
                <HStack
                    my={2}
                    h={open ? "40px" : 0}
                    transition="0.2s ease-in"
                    overflowWrap="break-word"
                    overflow="hidden"
                >
                    <ButtonGroup variant="ghost" colorScheme="purple">
                        <Button
                            color={useColorModeValue("black", "white")}
                            onClick={() => setSort(Sort.Latest)}
                        >
                            <Text
                                fontWeight={sort === Sort.Latest ? "bold" : "normal"}
                                textDecoration={sort === Sort.Latest ? "underline" : "normal"}
                            >
                                Latest
                            </Text>
                        </Button>
                        <Button
                            color={useColorModeValue("black", "white")}
                            onClick={() => setSort(Sort.Views)}
                        >
                            <Text
                                fontWeight={sort === Sort.Views ? "bold" : "normal"}
                                textDecoration={sort === Sort.Views ? "underline" : "normal"}
                            >
                                Most Viewed
                            </Text>
                        </Button>
                        <Button
                            color={useColorModeValue("black", "white")}
                            onClick={() => setSort(Sort.Saves)}
                        >
                            <Text
                                fontWeight={sort === Sort.Saves ? "bold" : "normal"}
                                textDecoration={sort === Sort.Saves ? "underline" : "normal"}
                            >
                                Most Saved
                            </Text>
                        </Button>
                    </ButtonGroup>
                </HStack>
                {children}
            </GridItem>
        </Grid>
    );
};

export default CategoryLayout;
