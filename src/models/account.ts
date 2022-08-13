export interface Account {
    id: number;
    username: string;
    description: string;
    email: string;
    avatar: string | null;
    bookmarks: number[];
}

export interface AccountResponse {
    message: string;
    token: string;
    account: Account;
}
