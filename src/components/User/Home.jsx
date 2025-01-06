import React, { useEffect } from "react";
import Navbar from "../Item/Navbar";
import Footer from "../Item/Footer";
import BlogCard from "../card/BlogCard";
import { Link } from 'react-router-dom';
import { use } from "react";

const Home = () => {
  const userName = localStorage.getItem("name") || "User";


  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage: "url('/assets/Home/BG_Image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          paddingTop: "80px",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "30px",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h1 style={{ fontWeight: "bold", fontSize: "56px" }}>
            Hands Talk, Heart Listens
          </h1>
          <p
            style={{
              marginTop: "15px",
              lineHeight: "1.6",
              fontSize: "18px",
              margin: "0 auto",
            }}
          >
            Explore the world of sign language and communicate with your hands
            <br />
            to make a difference. Join us in promoting inclusivity and
            understanding through meaningful gestures. Together, we can bridge
            <br />
            the gap and foster a more connected and empathetic world.
          </p>
          <div style={{ marginTop: "30px" }}>
            <button
              style={{
                padding: "15px 30px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#000",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
               <Link to="/login" style={{ color: 'inherit', textDecoration: 'none',  }}>
               Try Now with Your Own Hand
               </Link>
              
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <BlogCard />
      </div>
      <Footer />
    </>
  );
};

export default Home;
