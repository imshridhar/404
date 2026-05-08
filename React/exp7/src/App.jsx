import React, { useState } from "react";
import "./ProfileCard.css";
import shridhar from "./assets/shridhar.jpeg";

function ProfileCard({ name, bio, image, bgColor }) {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    backgroundColor: bgColor || "#ffffff",
    transform: hovered ? "scale(1.03)" : "scale(1)",
    transition: "all 0.3s ease",
  };

  const imageStyle = {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    objectFit: "cover",
    marginBottom: "15px",
  };

  return (
    <div
      className="profile-card"
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={image} alt={name} style={imageStyle} />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-bio">{bio}</p>
    </div>
  );
}

export default function App() {
  const [color, setColor] = useState("#f5f7ff");

  return (
    <div className="app-container">
      <ProfileCard
        name="Shridhar Havinal"
        bio="Frontend developer passionate about React, UI design, and creating engaging user experiences."
        image={shridhar}
        bgColor={color}
      />

      <div className="buttons">
        <button onClick={() => setColor("#f5f7ff")}>Default</button>
        <button onClick={() => setColor("#ffe8e8")}>Pink</button>
        <button onClick={() => setColor("#e8fff1")}>Green</button>
        <button onClick={() => setColor("#e8f0ff")}>Blue</button>
      </div>
    </div>
  );
}