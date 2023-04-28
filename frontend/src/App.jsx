import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/styles/index.scss";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

function App() {
  const [codeInsee, setCodeInsee] = useState("");

  return (
    <Router>
      <div>
        <Navbar />
        <div className="SearchBar">
          <Searchbar setCodeInsee={setCodeInsee} />
          {codeInsee.length === 1 && codeInsee[0].length === 5 && (
            <div>Code INSEE : {codeInsee[0]}</div>
          )}
        </div>
        <div className="homeContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
