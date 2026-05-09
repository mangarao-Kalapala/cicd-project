import { useState } from "react";
import axios from "axios";

function App() {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const checkConnection = async () => {
    try {
      const res = await axios.get(`${API}/api/message`);
      setStatus("CONNECTED ✅");
      setMessage(res.data.message);
    } catch (error) {
      setStatus("NOT CONNECTED ❌");
      setMessage("Backend is unreachable");
    }
  };

  const checkHealth = async () => {
    try {
      const res = await axios.get(`${API}/health`);
      setStatus("HEALTH OK ✅");
      setMessage(res.data.status);
    } catch (error) {
      setStatus("HEALTH FAILED ❌");
      setMessage("Health check failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Jenkins Full Stack Project Pipeline</h1>
      <h1>- By MangaRao Kalapala</h1>

      <button onClick={checkConnection} style={btnStyle}>
        Check Backend Connection
      </button>

      <button onClick={checkHealth} style={btnStyle}>
        Check Health
      </button>

      <h2 style={{ marginTop: "20px" }}>{status}</h2>
      <p>{message}</p>
    </div>
  );
}

const btnStyle = {
  padding: "10px 20px",
  margin: "10px",
  fontSize: "16px",
  cursor: "pointer"
};

export default App;
