import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components";
import {
    About,
    Categories,
    Category,
    Home,
    Login,
    NotFound,
    Post,
    AccountPage,
    Register,
} from "./layouts";
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
            <Route path={RouteNames.login} element={<Login />} />
            <Route path={RouteNames.register} element={<Register />} />
            <Route path={RouteNames.profile} element={<AccountPage />} />
        </Routes>
    </>
);
