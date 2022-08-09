import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box p={4}>
            <div>aaa</div>
            {children}
        </Box>
    );
};

export default Layout;
