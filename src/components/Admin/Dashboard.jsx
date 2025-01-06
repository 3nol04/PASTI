import React, { useEffect, useState } from "react";
import Navbar from "../Item/Navbar";
import { TypeAnimation } from "react-type-animation";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const name = localStorage.getItem("name");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    document.body.style.backgroundImage = "url(/assets/Dashboard/dBg.png)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    const interval = setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Jakarta",
      });
      setCurrentTime(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const starContainer = document.querySelector(".starfield-container");

    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.classList.add("starfield");
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      starContainer.appendChild(star);
    }
  }, []);

  const hours = new Date().getHours();

  const type = [
    "Pendeteksi Abjad Bahasa Isyarat Terkini",
    3000,
    `Selamat Datang, ${name}`,
    1000,
    `dan Selamat ${
      hours < 12
        ? "Pagi"
        : hours < 15
        ? "Siang"
        : hours < 18
        ? "Sore"
        : "Malam"
    }`,
    2000,
    `${
      hours < 12
        ? "Saya Harap Sudah Sarapan Sebelum Menggunakan Aplikasi Ini"
        : hours < 15
        ? "Saya harap sudah makan siang dan merasa segar sebelum menggunakan aplikasi ini"
        : hours < 17
        ? "Bersiap untuk kembali ke rumah"
        : "Jangan Lupa Bersihkan Dirimu dan Istirahat"
    }`,
    5000,
    "Tetap semangat!😊",
    4000,
  ];

  return (
    <>
      <Navbar bgColor="#140F0B" />
      <div className="starfield-container"></div>
      <div
        className="container d-flex align-items-center"
        style={{
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, textAlign: "left" }}>
          <div>
            <h1
              className="digital-clock"
              style={{
                fontSize: "36px",
                margin: "0",
                padding: "0",
                color: "white",
              }}
            >
              {currentTime}
            </h1>
          </div>
          <TypeAnimation
            sequence={type}
            wrapper="p"
            cursor={true}
            repeat={Infinity}
            style={{
              fontFamily: "monospace",
              fontSize: "30px",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              margin: "10px 0",
              color: "white",
            }}
          />
          <p
            className="lead"
            style={{
              margin: "0",
              color: "white",
            }}
          >
            We're glad to have you here.
          </p>
        </div>

        <div style={{ marginLeft: "20px" }}>
          <img
            src="/assets/Dashboard/Icon.png"
            style={{ height: "300px", objectFit: "contain" }}
            alt="Dashboard Icon"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
