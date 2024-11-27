import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
    const convertMarkdown = async () => {
      try {
        const response = await axios.post("http://localhost:5000/convert", { markdown });
        setHtml(response.data.html);
      } catch (error) {
        console.error("Error converting Markdown:", error);
      }
    };
    if (markdown.trim()) {
      convertMarkdown();
    } else {
      setHtml("");
    }
  }, [markdown]);

  return (
    <div style={containerStyle}>
      <div style={paneStyle}>
        <h2 style={headingStyle}>Markdown Editor</h2>
        <textarea
          style={textareaStyle}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Type your Markdown here..."
        />
      </div>
      <div style={paneStyle}>
        <h2 style={headingStyle}>Live Preview</h2>
        <div
          style={previewStyle}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  padding: "20px",
  backgroundColor: "#f8f9fa",
};

const paneStyle = {
  flex: 1,
  minWidth: "300px",
  padding: "15px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

const headingStyle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "10px",
  textAlign: "center",
};

const textareaStyle = {
  width: "96%",
  height: "300px",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  resize: "none",
  outline: "none"
};

const previewStyle = {
  width: "96%",
  minHeight: "300px",
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "6px",
  backgroundColor: "#f9f9f9",
  overflowY: "auto",
};

export default App;
