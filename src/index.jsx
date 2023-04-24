import React from "react";
import ReactDOM from "react-dom";
import Graph from "./Graph/main";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div className="App">
      <Graph />
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
