import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const [isTampered, setIsTampered] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        setIsTampered(true);
        return;
      }
      const { data } = await response.json();
      setData(data);
      setError(null);
      setIsTampered(false);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  const updateData = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      await getData();
    } catch (err) {
      setError("Failed to update data");
    }
  };

  const verifyData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        const errorData = await response.json();
        setVerificationMessage("Data has been tampered with!");
        setIsTampered(true);
        return;
      }
      setVerificationMessage("Data is intact.");
      setIsTampered(false);
    } catch (err) {
      setVerificationMessage("Failed to verify data.");
    }
  };

  const rollbackData = async () => {
    try {
      const response = await fetch(`${API_URL}/rollback`, {
        method: "POST",
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }
      const { data } = await response.json();
      setData(data);
      setVerificationMessage("Data has been rolled back.");
      setIsTampered(false);
    } catch (err) {
      setError("Failed to rollback data");
    }
  };



  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
        {isTampered && (
          <>
            <button style={{ fontSize: "20px" }} onClick={rollbackData}>
              Rollback Data
            </button>
          
          </>
        )}
      </div>

      {/* {error && <div style={{ color: "red" }}>{error}</div>} */}

      {verificationMessage && <div style={ verificationMessage === "Data has been tampered with!" ? { color: "red" } : { color: "green" }}>{verificationMessage}</div>}
    </div>
  );
}

export default App;
