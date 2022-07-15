export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    type: keyof typeof PostType;
    views: number;
    bookmarked_by: number;
    categories: string[];
    created_at: Date;
    updated_at: Date;
}

enum PostType {
    Blog = "BLOG",
    Advice = "ADVICE",
    Complaint = "COMPLAINT",
    Request = "REQUEST",
}
