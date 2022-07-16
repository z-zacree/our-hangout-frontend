import { StrictMode } from "react";
import {
    ChakraProvider,
    ComponentStyleConfig,
    extendTheme,
    type ThemeConfig,
} from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Global, css } from "@emotion/react";

import App from "./App";

const Text: ComponentStyleConfig = {
    baseStyle: (props) => ({
        color: mode("black", "white")(props),
    }),
};

const theme: ThemeConfig = extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
    fonts: {
        heading: '"nunito", sans-serif',
        body: '"nunito", sans-serif',
    },
    components: {
        Text,
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

const globalTheme = css(
    `::-webkit-scrollbar {
        display: none;
    
    * {
        box-sizing: border-box;
        scroll-behavior: smooth;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }`
);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <Global styles={globalTheme} />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </StrictMode>
);
