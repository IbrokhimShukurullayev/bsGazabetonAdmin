import React, { memo, useEffect } from "react";
import "./login.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetInputValuen } from "../../hooks/useGetInputValue";
import logo from "../../assets/images/logo.svg";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { formData, handlechange, setFormData } =
    useGetInputValuen(initialState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // username: john32
  // password: 87654321

  const handleLogin = (e) => {
    e.preventDefault();

    if (formData.username === "john32" && formData.password === "87654321") {
      toast.success("Welcome to Admin");
      localStorage.setItem("token", "token");
      navigate("/admin");
    } else {
      toast.error("Username or password in correct");
      setFormData(initialState);
      return;
    }
  };
  return (
    <>
      <section id="login">
        <div className="container login">
          <form onSubmit={handleLogin} className="login__box">
            <img src={logo} alt="logo" />
            <h2 className="login__title">Login hamda parolingizni kiriting</h2>
            <input
              value={formData.username}
              onChange={handlechange}
              name="username"
              type="text"
              placeholder="Login"
            />
            <input
              value={formData.password}
              onChange={handlechange}
              name="password"
              type="text"
              placeholder="Parol"
            />
            <button className="login__btn">Login</button>
            <p className="form__text">
              Login tugmachasini bosish orqali siz admin sahifasiga ota olasiz.
            </p>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default memo(Login);
