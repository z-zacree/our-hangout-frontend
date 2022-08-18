import { Box, Flex, IconButton, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import { FC } from "react";
import { IconType } from "react-icons";
import { BiCode, BiCodeBlock } from "react-icons/bi";
import { GrRedo, GrUndo } from "react-icons/gr";
import {
    TbBold,
    TbH1,
    TbH2,
    TbH3,
    TbH4,
    TbH5,
    TbH6,
    TbItalic,
    TbList,
    TbListNumbers,
    TbMenu2,
    TbQuote,
    TbStrikethrough,
} from "react-icons/tb";

interface EditorProps {
    editor: Editor | null;
}

interface MenuBarItems {
    label: string;
    icon: IconType;
    action: () => void;
    isActive: () => boolean;
}

const EditorMenu: FC<EditorProps> = ({ editor }) => {
    if (!editor) {
        return null;
    }
    const itemGroup1 = [
        {
            label: "Bold Selected Text",
            icon: TbBold,
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive("bold"),
        },
        {
            label: "Italic Selected Text",
            icon: TbItalic,
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: () => editor.isActive("italic"),
        },
        {
            label: "Strikethrough Selected Text",
            icon: TbStrikethrough,
            action: () => editor.chain().focus().toggleStrike().run(),
            isActive: () => editor.isActive("strike"),
        },
        {
            label: "Code Selected Text",
            icon: BiCode,
            action: () => editor.chain().focus().toggleCode().run(),
            isActive: () => editor.isActive("code"),
        },
        {
            label: "Convert to Codeblock",
            icon: BiCodeBlock,
            action: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: () => editor.isActive("codeBlock"),
        },
        {
            label: "Convert to Quote",
            icon: TbQuote,
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: () => editor.isActive("blockQuote"),
        },
    ];

    const itemGroup2: MenuBarItems[] = [
        {
            label: "Convert Selected Text to H1",
            icon: TbH1,
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive("heading", { level: 1 }),
        },
        {
            label: "Convert Selected Text to H2",
            icon: TbH2,
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive("heading", { level: 2 }),
        },
        {
            label: "Convert Selected Text to H3",
            icon: TbH3,
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => editor.isActive("heading", { level: 3 }),
        },
        {
            label: "Convert Selected Text to H4",
            icon: TbH4,
            action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
            isActive: () => editor.isActive("heading", { level: 4 }),
        },
        {
            label: "Convert Selected Text to H5",
            icon: TbH5,
            action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
            isActive: () => editor.isActive("heading", { level: 5 }),
        },
        {
            label: "Convert Selected Text to H6",
            icon: TbH6,
            action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
            isActive: () => editor.isActive("heading", { level: 6 }),
        },
    ];

    const itemGroup3: MenuBarItems[] = [
        {
            label: "Convert to Bullet List",
            icon: TbList,
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive("bulletList"),
        },
        {
            label: "Convert to Ordered List",
            icon: TbListNumbers,
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive("orderedList"),
        },
    ];

    const itemGroup4: MenuBarItems[] = [
        {
            label: "Undo Action",
            icon: GrUndo,
            action: () => editor.chain().focus().undo().run(),
            isActive: () => editor.isActive("undo"),
        },
        {
            label: "Redo Action",
            icon: GrRedo,
            action: () => editor.chain().focus().redo().run(),
            isActive: () => editor.isActive("redo"),
        },
    ];

    return (
        <Flex
            w={"full"}
            py={2}
            justify={"center"}
            bg={useColorModeValue("gray.100", "gray.600")}
            pos={"sticky"}
        >
            <Box
                px={2}
                mr={2}
                borderRight={"2px"}
                borderColor={useColorModeValue("gray.100", "gray.600")}
            >
                {itemGroup1.map((item, index) => (
                    <IconButton
                        m={1}
                        size={"sm"}
                        variant={"outline"}
                        icon={<item.icon />}
                        onClick={item.action}
                        aria-label={item.label}
                        isActive={item.isActive() ?? undefined}
                        key={index}
                    />
                ))}
                <Text fontSize={"xs"} color={"gray.500"} textAlign={"center"}>
                    Font
                </Text>
            </Box>
            <Box
                display={["none", null, "block"]}
                px={2}
                borderRight={["none", null, "2px"]}
                borderColor={["none", null, useColorModeValue("gray.100", "gray.600")]}
            >
                {itemGroup2.map((item, index) => (
                    <IconButton
                        m={1}
                        size={"sm"}
                        variant={"outline"}
                        icon={<item.icon />}
                        onClick={item.action}
                        aria-label={item.label}
                        isActive={item.isActive() ?? undefined}
                        key={index}
                    />
                ))}
                <Text fontSize={"xs"} color={"gray.500"} textAlign={"center"}>
                    Font Size
                </Text>
            </Box>
            <Box
                px={2}
                borderRight={"2px"}
                borderColor={useColorModeValue("gray.100", "gray.600")}
                display={["none", null, "block"]}
            >
                {itemGroup3.map((item, index) => (
                    <IconButton
                        m={1}
                        size={"sm"}
                        variant={"outline"}
                        icon={<item.icon />}
                        onClick={item.action}
                        aria-label={item.label}
                        isActive={item.isActive() ?? undefined}
                        key={index}
                    />
                ))}
                <Text fontSize={"xs"} color={"gray.500"} textAlign={"center"}>
                    Paragraph
                </Text>
            </Box>
            <Box px={2} display={["none", null, "block"]}>
                {itemGroup4.map((item, index) => (
                    <IconButton
                        m={1}
                        size={"sm"}
                        variant={"outline"}
                        icon={<item.icon />}
                        onClick={item.action}
                        aria-label={item.label}
                        isActive={item.isActive() ?? undefined}
                        key={index}
                    />
                ))}
                <Text fontSize={"xs"} color={"gray.500"} textAlign={"center"}>
                    Actions
                </Text>
            </Box>
            <VStack px={2} display={["inline-flex", null, "none"]}>
                <IconButton
                    m={1}
                    size={"sm"}
                    variant={"outline"}
                    aria-label="Other Styling Handles"
                    icon={<TbMenu2 />}
                />
                <Text m={"0 !important"} fontSize={"xs"} color={"gray.500"} textAlign={"center"}>
                    Others
                </Text>
            </VStack>
        </Flex>
    );
};

export default EditorMenu;
