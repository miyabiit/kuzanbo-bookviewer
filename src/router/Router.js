import { Routes, Route } from "react-router-dom";

import { Login } from "../components/pages/login/Login";
import { Home } from "../components/pages/home/Home";
import { MenuToday } from "../components/pages/home/MenuToday";
import { GuestToday } from "../components/pages/home/GuestToday";
import { Reservation } from "../components/pages/home/Reservation";
import { Page404 } from "../components/pages/Page404";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menus" element={<MenuToday />} />
      <Route path="/guests" element={<GuestToday />} />
      <Route path="/guest" element={<Reservation />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
