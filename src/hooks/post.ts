import useSWR from "swr";
import axios from "axios";
import { Post, CategoryPosts, Category } from "@/models";

const getfetcher = (url: string) =>
    axios.get(`http://localhost:8000/api/${url}`).then(({ data }) => data);

export function useGetAllPosts() {
    const { data, error } = useSWR(`posts`, getfetcher);

    return {
        posts: data as Post[],
        isLoading: !error && !data,
        isError: error,
    };
}

export function useGetCategoryPosts(category: string) {
    const { data, error } = useSWR(`c/${category}`, getfetcher);

    return {
        categoryPosts: data as CategoryPosts,
        isLoading: !error && !data,
        isError: error,
    };
}

export function useGetPost(id: number) {
    const { data, error } = useSWR(`posts/${id}`, getfetcher);

    return {
        post: data as Post,
        isLoading: !error && !data,
        isError: error,
    };
}

export function useGetCategories() {
    const { data, error } = useSWR(`categories`, getfetcher);

    return {
        categories: data as Category[],
        isLoading: !error && !data,
        isError: error,
    };
}

export function useGetBookmarks(token: string) {
    const authFetcher = (url: string) =>
        axios
            .get(`http://localhost:8000/api/${url}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(({ data }) => data);
    const { data, error } = useSWR(`bookmarks`, authFetcher);

    return {
        posts: data as Post[],
        isLoading: !error && !data,
        isError: error,
    };
}
