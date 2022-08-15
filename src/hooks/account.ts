import useSWR from "swr";
import axios from "axios";
import { AccountResponse } from "@/models";

const getAuthFetcher = (url: string) =>
    axios
        .get(`http://localhost:8000/api/${url}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(({ data }) => data)
        .catch(({ response }) => response);

export function useAuthState() {
    const { data, error } = useSWR(`account`, getAuthFetcher);

    return {
        data: data ? (data as AccountResponse) : null,
        isLoading: !error && !data,
        isError: error ? error : null,
    };
}
