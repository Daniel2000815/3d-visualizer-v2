import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "reactflow";
import App from "./App";

import "reactflow/dist/style.css";

export default function Graph() {
  return (
      <ReactFlowProvider>
        <div style={{ width: "100vw", height: "100vh" }}>
          <App />
        </div>
      </ReactFlowProvider>
  );
}
