import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Category = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname.split("/")[location.pathname.split("/").length - 1]);
    return <Box p={4}>{currentPath}</Box>;
};

export default Category;
