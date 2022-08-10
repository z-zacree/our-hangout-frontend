import axios from "axios";
import { Dispatch, FC, PropsWithChildren, Reducer, useEffect, useReducer } from "react";
import { Account } from "../../models";
import { AuthAction, AuthContext, AuthState } from "./utils";

const token = localStorage.getItem("token");

const reducer: Reducer<AuthState, AuthAction> = (state, action) => {
    return action;
};

const initReducerState = async (dispatch: Dispatch<AuthState>, token: string) => {
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

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [authState, dispatch] = useReducer(reducer, {
        isLoading: true,
        isAuthenticated: token != null,
        token: token,
        account: null,
    });

    useEffect(() => {
        const tokenOnMount = localStorage.getItem("token");

        if (tokenOnMount != null) {
            initReducerState(dispatch, tokenOnMount);
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

    console.log(authState);
    return (
        <AuthContext.Provider value={{ auth: authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContextProvider;
