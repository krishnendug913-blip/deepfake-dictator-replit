import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    const formData = new FormData();
    formData.append("media", file);

    try {
      const res = await axios.post("/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.result);
    } catch (err) {
      setResult("Error analyzing file.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Deepfake Detector</h1>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Analyze</button>
      <p>{result}</p>
    </div>
  );
}

export default App;
