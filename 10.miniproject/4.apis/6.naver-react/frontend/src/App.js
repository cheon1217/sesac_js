import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return; // 검색어가 비어있을 경우 처리

    try {
      const response = await axios.get("http://localhost:3000/search/blog", {
        params: { query },
      });
      setResults(response.data.items);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Naver Blog Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blogs"
        style={{ padding: "10px", width: "300px" }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px",
          marginLeft: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>
      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {results.map((item, index) => (
          <li key={index} style={{ marginBottom: "15px" }}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}
            >
              {item.title.replace(/<\/?[^>]+(>|$)/g, "")} {/* HTML 태그 제거 */}
            </a>
            <p style={{ color: "#555" }}>
              {item.description.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;