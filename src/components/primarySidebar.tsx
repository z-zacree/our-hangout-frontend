import { Button, Icon, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { BiBookmarks, BiCategory, BiHomeAlt, BiInfoCircle } from "react-icons/bi";
import { AuthContext } from "@/utils/context/utils";
import { IconType } from "react-icons";
import { RouteNames } from "../utils/routes";
import { useNavigate } from "react-router-dom";

interface NavlinkProps {
    label: string;
    link: RouteNames;
    icon: IconType;
    isAuthenticated: boolean;
}

const links: NavlinkProps[] = [
    {
        label: "Home",
        link: RouteNames.home,
        icon: BiHomeAlt,
        isAuthenticated: false,
    },
    {
        label: "About",
        link: RouteNames.about,
        icon: BiInfoCircle,
        isAuthenticated: false,
    },
    {
        label: "Categories",
        link: RouteNames.categories,
        icon: BiCategory,
        isAuthenticated: false,
    },
    {
        label: "Bookmarks",
        link: RouteNames.bookmarks,
        icon: BiBookmarks,
        isAuthenticated: true,
    },
];

export default () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    return (
        <Stack as="aside" pr={4} gap={2}>
            {links.map(({ label, icon, link, isAuthenticated }) => {
                if (isAuthenticated) {
                    return (
                        <Button
                            size={"lg"}
                            variant={"outline"}
                            leftIcon={<Icon as={icon} />}
                            justifyContent={"start"}
                            onClick={() => navigate(link)}
                            isDisabled={!auth.isAuthenticated}
                            key={label}
                        >
                            {label}
                        </Button>
                    );
                } else {
                    return (
                        <Button
                            size={"lg"}
                            variant={"outline"}
                            leftIcon={<Icon as={icon} />}
                            justifyContent={"start"}
                            onClick={() => navigate(link)}
                            key={label}
                        >
                            {label}
                        </Button>
                    );
                }
            })}
        </Stack>
    );
};
