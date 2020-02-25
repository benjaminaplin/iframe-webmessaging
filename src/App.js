import React, { useEffect } from "react";
import "./App.css";
import handleReponse from "./handleResponse";
export const LOCAL_HOST = "http://localhost:3500";

const App = () => {
  useEffect(() => {
    window.addEventListener("message", handleReponse, false);
    return () => {
      window.removeEventListener("message", handleReponse, false);
    };
  }, []);

  return (
    <div className="App" style={{ margin: "5rem 0" }}>
      <iframe
        id="inlineFrameExample"
        title="Inline Frame Example"
        width="700"
        height="1000"
        src={LOCAL_HOST}
      />
    </div>
  );
};

export default App;
