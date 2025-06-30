import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Maneger from "./components/Maneger";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Navbar />
    <Maneger />
    </>
  );
}

export default App;
