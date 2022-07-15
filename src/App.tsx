import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import Error from "./pages/404";
import Category from "./pages/categories/[...name]";
import Post from "./pages/post/[...id]";
import Layout from "./components/layout";

export default () => (
    <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="*" element={<Error />} />
                <Route path="about" element={<About />} />
                <Route path="post/:id" element={<Post />} />
                <Route path="c/:name" element={<Category />} />
            </Route>
        </Routes>
    </>
);
