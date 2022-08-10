import { Account } from "@/models";
import { createContext, Dispatch } from "react";

const token = localStorage.getItem("token");

export interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    token: string | null;
    account: Account | null;
}

export interface AuthAction {
    isLoading: boolean;
    isAuthenticated: boolean;
    token: string | null;
    account: Account | null;
}

export interface ContextState {
    auth: AuthState;
    dispatch: Dispatch<AuthState>;
}

export const AuthContext = createContext<ContextState>({
    auth: {
        isLoading: true,
        isAuthenticated: token != null,
        token: token,
        account: null,
    },
    dispatch: () => {},
});
