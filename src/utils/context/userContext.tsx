import { Account } from "@/models";
import axios from "axios";
import { FC, PropsWithChildren, Reducer, useEffect, useReducer } from "react";
import { AuthAction, AuthContext, AuthState } from "./utils";

const token = localStorage.getItem("token");

const reducer: Reducer<AuthState, AuthAction> = (state, action) => {
    return action;
};

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [authState, dispatch] = useReducer(reducer, {
        isLoading: true,
        isAuthenticated: token != null,
        token: token,
        account: null,
    });

    useEffect(() => {
        const initReducerState = async (token: string) => {
            const res = await axios
                .get("http://localhost:8000/api/account", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((data) => data)
                .catch(({ response }) => response);

            if (res.status == 401) {
                dispatch({
                    isLoading: false,
                    isAuthenticated: false,
                    token: null,
                    account: null,
                });
            } else if (res.status == 200) {
                dispatch({
                    isLoading: false,
                    isAuthenticated: true,
                    token: token,
                    account: res.data as Account,
                });
            }
        };

        const tokenOnMount = localStorage.getItem("token");

        if (tokenOnMount != null) {
            initReducerState(tokenOnMount);
        } else {
            dispatch({ ...authState, isLoading: false });
        }
    }, []);

    useEffect(() => {
        if (authState.token) {
            localStorage.setItem("token", authState.token);
        } else {
            localStorage.removeItem("token");
        }
    }, [authState]);
    return (
        <AuthContext.Provider value={{ auth: authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContextProvider;
