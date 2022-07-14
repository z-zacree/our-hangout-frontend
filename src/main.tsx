import { StrictMode } from "react";
import { ChakraProvider, extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const theme: ThemeConfig = extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
    colors: {
        iit_blue: "hsl(207, 100%, 54%)",
        itsig_blue: "hsl(221, 55%, 63%)",
    },
    fonts: {
        heading: '"nunito", sans-serif',
        body: '"nunito", sans-serif',
    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                fontFamily: "body",
                color: mode("gray.800", "whiteAlpha.900")(props),
                bg: mode("rgba(0, 0, 0, 0.05)", "black")(props),
                lineHeight: "base",
            },
        }),
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </StrictMode>
);
