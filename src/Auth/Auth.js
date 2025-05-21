import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const isLogin = localStorage.getItem("token");
  return isLogin ? <Outlet /> : <Navigate replace to="/login" />;
};

export default Auth;
