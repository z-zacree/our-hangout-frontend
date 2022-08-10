import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Container,
    HStack,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import { IoMenu, IoSunny, IoMoon, IoVideocam } from "react-icons/io5";
import { useLocation, Link, Outlet } from "react-router-dom";
import { RouteNames } from "@/utils/routes";
import { AuthContext } from "@/utils/context/utils";
import axios from "axios";

interface NavbarItems {
    pageTitle: string;
    pageUrl: string;
}

const pages: NavbarItems[] = [
    {
        pageTitle: "Home",
        pageUrl: "",
    },
    {
        pageTitle: "About",
        pageUrl: "about",
    },
];

const Navbar: FC = () => {
    const location = useLocation();
    const { colorMode, toggleColorMode } = useColorMode();
    const { auth, dispatch } = useContext(AuthContext);
    const [currentPath, setCurrentPath] = useState(
        location.pathname.split("/")[location.pathname.split("/").length - 1]
    );
    const navBg = useColorModeValue("white", "gray.900");

    useEffect(() => {
        setCurrentPath(location.pathname.split("/")[location.pathname.split("/").length - 1]);
    }, [location]);

    const handleLogout = () => {
        axios.post(
            "http://localhost:8000/api/logout",
            {},
            { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        dispatch({
            ...auth,
            isAuthenticated: false,
            token: null,
            account: null,
        });
    };

    return (
        <Box position="relative">
            <Box bgColor={navBg}>
                <Container maxW="7xl" p={4} as={"header"} display="flex" alignItems="center">
                    <Box display={{ base: "block", md: "none" }}>
                        <Menu preventOverflow matchWidth flip gutter={2} autoSelect={false}>
                            <MenuButton
                                mr={4}
                                as={IconButton}
                                icon={<IoMenu />}
                                filter={colorMode === "light" ? "none" : "invert(100%)"}
                                aria-label="menu-icon"
                                colorScheme="undefined"
                                color="hsla(0, 0%, 0%, 0.9)"
                                fontSize="3xl"
                            />
                            <MenuList>
                                {pages.map((page) => (
                                    <Link to={`/${page.pageUrl}`} key={page.pageUrl}>
                                        <MenuItem>{page.pageTitle}</MenuItem>
                                    </Link>
                                ))}
                            </MenuList>
                        </Menu>
                    </Box>
                    <Link to="/">
                        <Image
                            src="/logo.svg"
                            w="5em"
                            filter={colorMode === "light" ? "none" : "invert(100%)"}
                            mr="6 !important"
                            cursor="pointer"
                        />
                    </Link>
                    <Spacer display={{ base: "block", md: "none" }} />
                    <HStack display={{ base: "none", md: "block" }} spacing={5}>
                        {pages.map((page) => (
                            <Link to={`/${page.pageUrl}`} key={page.pageUrl}>
                                <Button
                                    fontWeight={
                                        currentPath === page.pageUrl ? "semibold" : "normal"
                                    }
                                    fontSize="xl"
                                    variant="ghost"
                                >
                                    {page.pageTitle}
                                </Button>
                            </Link>
                        ))}
                    </HStack>
                    <Spacer display={{ base: "none", md: "block" }} />
                    {auth.isAuthenticated ? (
                        <>
                            <Button
                                variant={"solid"}
                                colorScheme={"teal"}
                                size={"sm"}
                                leftIcon={<IoVideocam />}
                                onClick={console.log}
                                display={{ base: "none", md: "inline-flex" }}
                            >
                                Stream
                            </Button>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                    minW={0}
                                >
                                    <Avatar
                                        size={"sm"}
                                        src={
                                            "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                        }
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Link 1</MenuItem>
                                    <MenuItem>Link 2</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                    ) : (
                        <ButtonGroup>
                            <Link to={RouteNames.register}>
                                <Button colorScheme="gray">Sign Up</Button>
                            </Link>
                            <Link to={RouteNames.login}>
                                <Button colorScheme="gray" display={{ base: "none", md: "flex" }}>
                                    Sign In
                                </Button>
                            </Link>
                        </ButtonGroup>
                    )}
                    <IconButton
                        ml={2}
                        fontSize="xl"
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="color-mode-toggle"
                        icon={useColorModeValue(<IoMoon />, <IoSunny />)}
                        color={useColorModeValue("black", "white")}
                        onClick={toggleColorMode}
                        display={{ base: "none", md: "flex" }}
                    />
                </Container>
            </Box>
            <Outlet />
        </Box>
    );
};

export default Navbar;
