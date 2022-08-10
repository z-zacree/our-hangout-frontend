export interface Account {
    id: number;
    name: string;
    description: string;
    email: string;
    avatar: string | null;
    created_at: Date;
}
