import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { IoMenu, IoSunny, IoMoon } from "react-icons/io5";
import { useLocation, Link, Outlet, useNavigate } from "react-router-dom";

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
    const [currentPath, setCurrentPath] = useState(
        location.pathname.split("/")[location.pathname.split("/").length - 1]
    );
    const navBg = useColorModeValue("white", "hsl(0, 0%, 10%)");

    useEffect(() => {
        setCurrentPath(location.pathname.split("/")[location.pathname.split("/").length - 1]);
    }, [location]);

    return (
        <Box position="relative">
            <HStack bgColor={navBg} p={2} as={"header"}>
                <Box display={{ base: "block", lg: "none" }}>
                    <Menu preventOverflow matchWidth flip gutter={2} autoSelect={false}>
                        <MenuButton
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
                <Spacer display={{ base: "block", lg: "none" }} />
                <HStack display={{ base: "none", lg: "block" }} spacing={5}>
                    {pages.map((page) => (
                        <Link to={`/${page.pageUrl}`} key={page.pageUrl}>
                            <Button
                                fontWeight={currentPath === page.pageUrl ? "semibold" : "normal"}
                                fontSize="xl"
                                variant="ghost"
                            >
                                {page.pageTitle}
                            </Button>
                        </Link>
                    ))}
                </HStack>
                <Spacer display={{ base: "none", lg: "block" }} />
                <ButtonGroup>
                    <Button colorScheme="gray">Sign Up</Button>
                    <Button colorScheme="gray" display={{ base: "none", lg: "flex" }}>
                        Sign In
                    </Button>
                </ButtonGroup>
                <IconButton
                    display={{ base: "none", lg: "flex" }}
                    aria-label="color-mode-toggle"
                    icon={useColorModeValue(<IoMoon />, <IoSunny />)}
                    colorScheme="gray"
                    variant="ghost"
                    color={useColorModeValue("black", "white")}
                    fontSize="xl"
                    onClick={toggleColorMode}
                />
            </HStack>
            <Outlet />
        </Box>
    );
};

export default Navbar;
