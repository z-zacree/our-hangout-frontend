export enum Sort {
    Latest,
    Views,
    Saves,
}

export enum PostType {
    Blog = "Blog",
    Advice = "Advice",
    Complaint = "Complaint",
    Request = "Request",
}

export enum AuthErrorResponse {
    Default = "Sign up attempt was unsuccessful",
    EmailExists = "The email is already in use",
    UsernameExists = "The username is already in use",
}

declare const AuthErrorCodes: {
    readonly INVALID_PASSWORD: "auth/wrong-password";
    readonly EMAIL_EXISTS: "auth/email-already-in-use";
    readonly USERNAME_EXISTS: "auth/username-already-in-use";
};

export type AuthErrorCode = typeof AuthErrorCodes[keyof typeof AuthErrorCodes];
