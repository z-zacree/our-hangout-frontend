import { Category } from "./category";
import { PostType } from "./enums";

export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    type: keyof typeof PostType;
    views: number;
    bookmarks: number;
    categories: Category[];
    created_at: Date;
    updated_at: Date;
}
