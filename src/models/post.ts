import { PostType } from "./enums";

export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    type: keyof typeof PostType;
    views: number;
    bookmarks: number;
    categories: string[];
    created_at: Date;
    updated_at: Date;
}
