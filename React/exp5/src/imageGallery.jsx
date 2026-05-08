import React, { useState } from "react";

function BasicFigure({ url, caption, onRemove }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 10,
        borderRadius: 8,
        width: "100%",
        boxSizing: "border-box",
        textAlign: "center"
      }}
    >
      {!imgError ? (
        <img
          src={url}
          alt={caption}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: 6,
            display: "block"
          }}
        />
      ) : (
        <div style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center", background: "#eee" }}>
          Invalid Image URL
        </div>
      )}

      <p style={{ margin: "8px 0" }}>{caption}</p>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}


export default function FigureList() {
  const [figures, setFigures] = useState([
    { url: "https://picsum.photos/300/200?1", caption: "Image 1" },
    { url: "https://picsum.photos/300/200?2", caption: "Image 2" }
  ]);

  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  const addFigure = () => {
    if (!url || !caption) return;

    setFigures([...figures, { url, caption }]);
    setUrl("");
    setCaption("");
  };

  const removeFigure = (index) => {
    setFigures(figures.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <div style={{ marginBottom: 15 }}>
        <input
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={addFigure}>Add</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
          gap: 15
        }}
      >
        {figures.map((fig, i) => (
          <BasicFigure
            key={i}
            url={fig.url}
            caption={fig.caption}
            onRemove={() => removeFigure(i)}
          />
        ))}
      </div>
    </div>
  );
}