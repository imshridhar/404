import { useState } from "react";

function Figure({ url, caption, remove }) {
  const [error, setError] = useState(false);

  return (
    <div style={{
      border: "1px solid gray",
      padding: 10,
      textAlign: "center"
    }}>

      {error ? (
        <p>Invalid Image</p>
      ) : (
        <img
          src={url}
          alt={caption}
          onError={() => setError(true)}
          style={{ width: "100%", height: 150 }}
        />
      )}

      <p>{caption}</p>

      <button onClick={remove}>
        Remove
      </button>

    </div>
  );
}

export default function App() {

  const [figures, setFigures] = useState([
    {
      url: "https://picsum.photos/300/200?1",
      caption: "Image 1"
    },
    {
      url: "https://picsum.photos/300/200?2",
      caption: "Image 2"
    }
  ]);

  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  const add = () => {
    if (!url || !caption) return;

    setFigures([
      ...figures,
      { url, caption }
    ]);

    setUrl("");
    setCaption("");
  };

  const remove = (i) => {
    setFigures(
      figures.filter((_, index) => index !== i)
    );
  };

  return (
    <div style={{ padding: 20 }}>

      <input
        placeholder="Image URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button onClick={add}>
        Add
      </button>

      <br /><br />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: 10
      }}>

        {figures.map((f, i) => (
          <Figure
            key={i}
            url={f.url}
            caption={f.caption}
            remove={() => remove(i)}
          />
        ))}

      </div>

    </div>
  );
}