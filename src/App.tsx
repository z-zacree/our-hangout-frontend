import { Route, Routes } from "react-router-dom";

import { Home, About, NotFound, Category, Categories, Post } from "./layouts";
import { Navbar } from "./components";
import { RouteNames } from "./utils/routes";

export default () => (
    <>
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route element={<Navbar />}>
                <Route path={RouteNames.about} element={<About />} />
                <Route path={RouteNames.categories} element={<Categories />} />
                <Route path={RouteNames.category} element={<Category />} />
                <Route path={RouteNames.home} element={<Home />} />
                <Route path={RouteNames.post} element={<Post />} />
            </Route>
        </Routes>
    </>
);
