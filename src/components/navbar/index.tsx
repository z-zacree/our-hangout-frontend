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
    Text,
    Spacer,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import {
    IoMenu,
    IoSunny,
    IoMoon,
    IoNewspaper,
    IoPerson,
    IoSettings,
    IoExit,
} from "react-icons/io5";
import { useLocation, Link, Outlet, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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
                                mr={2}
                                variant={"solid"}
                                colorScheme={"purple"}
                                leftIcon={<IoNewspaper />}
                                display={{ base: "none", md: "inline-flex" }}
                            >
                                Create a Post
                            </Button>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                >
                                    <Avatar
                                        size={"md"}
                                        src={
                                            auth.account?.avatar ? auth.account?.avatar : undefined
                                        }
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem
                                        icon={<IoPerson />}
                                        onClick={() => navigate(RouteNames.profile)}
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        icon={<IoSettings />}
                                        onClick={() => navigate(RouteNames.settings)}
                                    >
                                        Settings
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem
                                        color="red.300"
                                        icon={<IoExit />}
                                        onClick={handleLogout}
                                    >
                                        Sign out
                                    </MenuItem>
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
