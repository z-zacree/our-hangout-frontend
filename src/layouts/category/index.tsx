import { PostCard, SkeletonCard } from "@/components";
import { useGetCategoryPosts } from "@/hooks/post";
import { Post, Sort } from "@/models";
import { Stack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryLayout from "./layout";

const Category: FC = () => {
    window.scroll(0, 0);
    const [sort, setSort] = useState(Sort.Latest);
    const { name } = useParams();

    const { categoryPosts } = useGetCategoryPosts(name!);

    const sortPosts = (a: Post, b: Post) => {
        switch (sort) {
            case Sort.Latest:
                return a.id - b.id;
            case Sort.Views:
                return b.views - a.views;
            case Sort.Saves:
                return b.bookmarks - a.bookmarks;
        }
    };

    return (
        <CategoryLayout sort={sort} setSort={setSort}>
            <Stack gap={1}>
                {categoryPosts?.posts
                    ?.sort(sortPosts)
                    .map((post) => <PostCard post={post} key={post.id} />) ??
                    [...Array(10).keys()].map((number) => <SkeletonCard key={number} />)}
            </Stack>
        </CategoryLayout>
    );
};

export default Category;
