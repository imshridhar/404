import { useState } from "react";
import "./ProfileCard.css";
import shridhar from "./assets/shridhar.jpeg";

function ProfileCard({ name, bio, image, bgColor }) {
  return (
    <div className="card" style={{ background: bgColor }}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
}

export default function App() {
  const [color, setColor] = useState("white");

  return (
    <div className="app">
      
      <ProfileCard
        name="Shridhar Havinal"
        bio="Frontend developer passionate about React."
        image={shridhar}
        bgColor={color}
      />

      <button onClick={() => setColor("pink")}>Pink</button>
      <button onClick={() => setColor("lightgreen")}>Green</button>
      <button onClick={() => setColor("lightblue")}>Blue</button>

    </div>
  );
}