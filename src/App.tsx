import { Route, Routes } from "react-router-dom";

import { Home, About, NotFound, Category, Categories, Post } from "./pages";
import { ListingLayout, Navbar } from "./components/layout";

export default () => (
    <>
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route element={<ListingLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="c/:name" element={<Category />} />
            </Route>
            <Route element={<Navbar isOutlet={true} />}>
                <Route path="about" element={<About />} />
            </Route>
        </Routes>
    </>
);
