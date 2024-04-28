import { Link } from "react-router-dom";
import { FaTelegram, FaInstagram, FaFacebook } from "react-icons/fa";
import sass from "../c.module.scss";
import logo from "../../pages/img/logo2-removebg-preview (1).png";
function Footer() {
  return (
    <div className={sass.footer}>
      <div className={sass.container}>
        <div className={sass.footerContainer}>
          <div className={sass.logo}>
            <img src={logo} alt="" />
          </div>
          <div className={sass.center}>
            <ul>
              <Link to={"/"}>
                <li>Home</li>
              </Link>
              <Link to={"/user"}>
                <li>Users</li>
              </Link>
              <Link to={"/register"}>
                <li>Register</li>
              </Link>
              <Link to={"/login"}>
                <li>Log in</li>
              </Link>
            </ul>
          </div>
          <div className={sass.right}>
            <h3>Tel: 3284280320</h3>
            <h2>Address: Tashkent, Mirabad 2,4</h2>
            <h3>Email: bilimheal@gmail.com</h3>
            <h2>Telegram: bilimheal_0202</h2>
          </div>
        </div>
        <div className="footer-icons">
          <ul className={sass.socialMedia}>
            <li>
              <a href="#">
                <FaTelegram />
              </a>
            </li>
            <li>
              <a href="#">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="#">
                <FaFacebook />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
