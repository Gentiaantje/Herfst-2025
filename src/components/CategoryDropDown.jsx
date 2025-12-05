import React, { useState } from "react";
import { useEffect } from "react";

function CategoryDropDown({ value }) {
  const [dropDownMenus, setDropDown] = useState("");

  const handleChange = (event) => {
    value(event.target.value);
    setDropDown(event.target.value);
  };

  const [alleCategories, setAlleCategories] = useState([]);
  console.log("alleCategories", alleCategories);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/Gentiaantje/Evenementen3000/categories") // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((data) => setAlleCategories(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div>
      <label htmlFor="category-select"></label>

      <select
        id="category-select"
        value={dropDownMenus}
        onChange={handleChange}
      >
        <option value="">Maak een keuze</option>
        {alleCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default CategoryDropDown;
