import useSWR from "swr";
import axios from "axios";
import { Post } from "../models/post";

const getfetcher = (url: string) =>
    axios.get(`http://localhost:8000/api/${url}`).then((res) => res.data as Post[]);

export function useGetAllPosts() {
    const { data, error } = useSWR(`posts`, getfetcher);

    return {
        posts: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export function useGetPostsByCategory(category: string) {
    const { data, error } = useSWR(`category/${category}`, getfetcher);

    return {
        posts: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export function useGetPost(id: number) {
    const { data, error } = useSWR(`posts/${id}`, getfetcher);

    return {
        post: data,
        isLoading: !error && !data,
        isError: error,
    };
}
