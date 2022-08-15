import {
    ChakraProvider,
    ComponentStyleConfig,
    extendTheme,
    type ThemeConfig,
} from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { css, Global } from "@emotion/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import UserContextProvider from "./utils/context/userContext";

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
            blockquote: {
                display: "block",
                m: "1em 40px 1em 30px",
                pl: "10px",
                borderLeft: "2px solid",
                borderColor: mode("gray.200", "gray.600")(props),
            },
            body: {
                fontFamily: "body",
                bg: mode("gray.100", "gray.800")(props),
                lineHeight: "base",
            },
            pre: {
                display: "block",
                fontFamily: "monospace",
                whiteSpace: "pre",
                margin: "1em 0",
                p: 4,
                borderRadius: 8,
                bg: mode("gray.200", "gray.600")(props),
            },
            h1: {
                fontSize: "4xl",
                fontWeight: "bold",
                my: "0.67em",
            },
            h2: {
                fontSize: "2xl",
                fontWeight: "bold",
                my: "0.83em",
            },
            h3: {
                fontSize: "xl",
                fontWeight: "bold",
                my: "1em",
            },
            h4: {
                fontSize: "md",
                fontWeight: "bold",
                my: "1.33em",
            },
            h5: {
                fontSize: "sm",
                fontWeight: "bold",
                my: "1.67em",
            },
            h6: {
                fontSize: "xs",
                fontWeight: "bold",
                my: "2.33em",
            },
            hr: {
                w: "full",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                borderStyle: "inset",
                borderWidth: "1px",
            },
            ol: {
                display: "block",
                listStyleType: "decimal",
                my: "1em",
                pl: "40px",
            },
            ul: {
                display: "block",
                listStyleType: "disc",
                my: "1em",
                pl: "40px",
            },
            ".ProseMirror": {
                borderRadius: 8,
                padding: 4,
            },
            ".ProseMirror p.is-editor-empty:first-of-type::before": {
                color: "#adb5bd",
                content: "attr(data-placeholder)",
                float: "left",
                height: "0",
                pointerEvents: "none",
            },
            "[contenteditable]": {
                outline: "0px solid transparent",
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
    <UserContextProvider>
        <ChakraProvider theme={theme}>
            <Global styles={globalTheme} />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </UserContextProvider>
);
