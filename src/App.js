import React from "react";
import "./App.css";
import Todo from "./components/Todo";
import Time from "./components/Time";

function App() {
  return (
    <>
      <div className="container ">
        <h1 className="neonText ">Welcome To Sahil's To-do App</h1>
        <Time />
        <Todo />
      </div>
    </>
  );
}

export default App;
