import useSWR from "swr";
import axios from "axios";
import { Account } from "@/models";

const getAuthFetcher = (url: string) =>
    axios
        .get(`http://localhost:8000/api/${url}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(({ data }) => data);

export function useAuthState() {
    const { data, error } = useSWR(`account`, getAuthFetcher);

    return {
        account: data,
        isLoading: !error && !data,
        isError: error,
    };
}
