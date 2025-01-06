import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="text-white  mt-auto" style={{ backgroundColor: "#1c1c1c" }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0"> 
              <img
              src="/assets/Home/Logo.png"
              alt="Logo"
              style={{ width: "auto", height: "30px" }}
            /></p>

            <p className="mb-0">© Copyright 2024</p>

            <p className="mb-0">
              <i className="bi bi-github" style={{ fontSize: "30px", marginRight: "8px" }}></i>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
