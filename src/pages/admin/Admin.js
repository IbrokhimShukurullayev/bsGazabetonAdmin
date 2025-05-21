import React, { useState } from "react";
import "./Admin.scss";

import { FaArrowLeft } from "react-icons/fa6";
import {
  MdOutlineCreateNewFolder,
  MdOutlineCreate,
  MdOutlineLogout,
} from "react-icons/md";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { memo } from "react";
import { toast } from "react-toastify";
import logo from "../../assets/images/logo.svg";

const Admin = () => {
  const navigate = useNavigate();
  const [menuToggle, setMenuToggle] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.warning("You have logged out");
  };
  return (
    <div className="admin">
      <div className="admin__sidebar">
        <div className="admin__sidebar__top">
          <h2 className="admin__title">
            <img src={logo} alt="logo" />
          </h2>
          <div className="admin__sidebar__list">
            {/* <NavLink to={"create-product"}>
              <MdOutlineCreateNewFolder />
              Create Product
            </NavLink> */}
            <NavLink to={"manage-product"}>
              <MdOutlineCreate />
              Manage Product
            </NavLink>
            <NavLink to={"manage-category"}>
              <MdOutlineCreate />
              Manage Categoty
            </NavLink>
            <NavLink to={"buyurtmalar"}>
              <MdOutlineCreateNewFolder />
              Buyurtmalar
            </NavLink>
          </div>
        </div>
        <div className="admin__sidebar__bottom">
          <button onClick={handleLogout} className="go__home">
            <MdOutlineLogout />
            Log out
          </button>
        </div>
      </div>

      <div className="admin__header">
        <div className="admin__container">
          <div className="admin__header__content">
            <h2 className="admin__header__title">Admin</h2>
            <button
              onClick={() => setMenuToggle((p) => !p)}
              className={`admin__header__menu__btn ${
                menuToggle ? "admin__header__close__btn" : ""
              }`}
            >
              <span className="toggle__top"></span>
              <span className="toggle__center"></span>
              <span className="toggle__bottom"></span>
              <p>salom</p>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`admin__header__katalog ${
          menuToggle ? "show__admin__katalog" : ""
        }`}
      >
        <div className="admin__header__list">
          <NavLink onClick={() => setMenuToggle(false)} to={"create-product"}>
            <MdOutlineCreateNewFolder />
            Create Product
          </NavLink>
          <NavLink onClick={() => setMenuToggle(false)} to={"manage-product"}>
            <MdOutlineCreate />
            Manage Product
          </NavLink>
          <NavLink onClick={() => setMenuToggle(false)} to={"create-category"}>
            <MdOutlineCreateNewFolder />
            Create Categoty
          </NavLink>
          <NavLink onClick={() => setMenuToggle(false)} to={"manage-category"}>
            <MdOutlineCreate />
            Manage Categoty
          </NavLink>
          <NavLink to={"buyurtmalar"}>
            <MdOutlineCreateNewFolder />
            Buyurtmalar
          </NavLink>
          <div className="admin__header__katalog__bottom">
            <button onClick={handleLogout} className="logout">
              <MdOutlineLogout />
              Log out
            </button>
          </div>
        </div>
      </div>
      <div className="admin__content">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(Admin);
