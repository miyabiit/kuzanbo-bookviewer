import { Routes, Route } from "react-router-dom";

import { Login } from "../components/pages/login/Login";
import { Home } from "../components/pages/home/Home";
import { MenuDinner } from "../components/pages/home/MenuDinner";
import { MenuBreakfast } from "../components/pages/home/MenuBreakfast";
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
        path="/menudinner"
        element={
          <HeaderLayout>
            <MenuDinner />
          </HeaderLayout>
        }
      />
      <Route
        path="/menubreakfast"
        element={
          <HeaderLayout>
            <MenuBreakfast />
          </HeaderLayout>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
