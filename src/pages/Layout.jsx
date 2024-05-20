import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div style={({ height: "100vh" }, { display: "flex" })}>
      <SideBar ></SideBar>
      <Outlet />
    </div>
  );
}

export default Layout;
