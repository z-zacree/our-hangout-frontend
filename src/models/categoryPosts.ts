import { Category } from "./category";
import { Post } from "./post";

export interface CategoryPosts {
    category: Category;
    posts: Post[];
}
