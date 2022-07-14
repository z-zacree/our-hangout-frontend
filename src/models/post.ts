export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    type: keyof typeof PostType;
    views: number;
    bookmarked_by: number;
    categories: Category[];
    created_at: Date;
    updated_at: Date;
}

export interface Category {
    id: number;
    name: string;
}

enum PostType {
    Blog = "BLOG",
    Advice = "ADVICE",
    Complaint = "COMPLAINT",
    Request = "REQUEST",
}
