import React, { useState } from "react";

const App = () => {
  const [zoekterm, setZoekterm] = useState("");
  const items = [""];
  const zoekFilter = (event) => {
    setZoekterm(event.target.value);
  };

  const gefilterdeItems = items.filter((item) =>
    item.toLowerCase().includes(zoekterm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "cursive" }}>
      🔍
      <input
        type="text"
        placeholder="Zoek een item..."
        value={zoekterm}
        onChange={zoekFilter}
        style={{
          padding: "6px",
          width: "400px",
          borderRadius: "7px",
          border: "2px",
          borderColor: "green",
          SearchIcon,
        }}
      />
      <ul>
        {gefilterdeItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
