import React from "react";
import Footer from "../Footer";
import Header from "../Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container flex flex-col justify-center items-center">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
