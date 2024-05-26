import React from "react";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
