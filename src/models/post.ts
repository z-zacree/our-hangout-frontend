import { Category } from "./category";
import { PostType } from "./enums";

export interface Post {
    id: number;
    title: string;
    content: string;
    author: Author;
    type: keyof typeof PostType;
    views: number;
    bookmarks: number;
    categories: Category[];
    created_at: Date;
    updated_at: Date;
}

export interface Author {
    id: number;
    username: string;
    avatar: string | null;
}
