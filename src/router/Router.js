import { Routes, Route } from "react-router-dom";

import { Login } from "../components/pages/login/Login";
import { Home } from "../components/pages/home/Home";
import { MenuToday } from "../components/pages/home/MenuToday";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <HeaderLayout>
            <Home />
          </HeaderLayout>
        }
      />
      <Route
        path="/menus"
        element={
          <HeaderLayout>
            <MenuToday />
          </HeaderLayout>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
