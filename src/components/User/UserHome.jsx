import React, { useEffect , useRef} from "react";
import Navbar from "../Item/Navbar";
import Footer from "../Item/Footer";
import BlogCard from "../card/BlogCard";
import FeedbackForm from "./FeedbackScreen";
import FeedbackList from "./FeedbackList";
import { useLocation,Link} from "react-router-dom";
import { use } from "react";

const UserHome = () => {
  const userName = localStorage.getItem("name") || "User";
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToFeedback) {
      const feedbackSection = document.getElementById("feedback-section");
      if (feedbackSection) {
        feedbackSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const nav = useRef(null);
  useEffect(() => {
      const handleScroll = () => {
        const windowScroll = window.scrollY;
        const width = window.innerWidth;

        if (width > 768) {
          if (windowScroll > 370) {
            nav.current.style.backgroundColor = "#1c1c1c";
          } else {
            nav.current.style.backgroundColor = "transparent";
          }
        }
        else if(width <= 768){
          if (windowScroll > 370) {
            nav.current.style.backgroundColor = "#1c1c1c";
          } else {
            nav.current.style.backgroundColor = "transparent";
          }
        }
      }

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
  }, []);

  return (
    <>
      <Navbar bgColor="#1c1c1c" ref={nav} />
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
              <Link to="/user/predict" style={{ color: 'inherit', textDecoration: 'none' }}>
                Try Now with Your Own Hand
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <BlogCard />
      </div>

      <div
        id="feedback-section"
        className="feedback-section py-5"
        style={{
          backgroundImage: "url('/assets/Feedback/BG_Feedback.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#fff",
        }}
      >
        <div className="container text-center">
          <FeedbackForm />
        </div>
      </div>

      <div
        className="feedback-section-list py-5"
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <div className="container text-center">
          <FeedbackList />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserHome;
