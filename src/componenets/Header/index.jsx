import React from "react";
import sass from "../c.module.scss";
import logo from "../../pages/img/logo.jpg";
import { Link, NavLink } from "react-router-dom";
import { instance } from "../../utils/Instance";
import { useMutation, useQuery } from "@tanstack/react-query";

function Header() {
  return (
    <div className={sass.header}>
      <div className={sass.container}>
        <div className={sass.left}>
          <ul>
            <NavLink className={sass.active ? sass.active : sass.a} to={"/"}>
              <li>Home</li>
            </NavLink>
            <NavLink to={"/trivia"}>
              <li>Quiz</li>
            </NavLink>
          </ul>
        </div>
        <div className={sass.center}>
          <Link to={"/"}>
            {" "}
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={sass.left}>
          <ul>
            <NavLink to={"/register"}>
              <li>Register</li>
            </NavLink>
            <NavLink to={"/login"}>
              <li>Log in</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
