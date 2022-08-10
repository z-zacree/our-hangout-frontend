export interface Account {
    id: number;
    username: string;
    description: string;
    email: string;
    avatar: string | null;
}

export interface AccountResponse {
    token: string;
    account: Account;
}
