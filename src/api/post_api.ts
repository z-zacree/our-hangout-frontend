import useSWR from "swr";
import axios from "axios";
import { Post } from "../models/post";

export const getPosts = async (): Promise<Post[]> => {
    return await axios.get("http://localhost:8000/api/posts").then((res) => res.data as Post[]);
};

const getfetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useGetAllPosts() {
    const { data, error } = useSWR(`/api/posts`, getfetcher);

    return {
        restaurants: data,
        isLoading: !error && !data,
        isError: error,
    };
}
