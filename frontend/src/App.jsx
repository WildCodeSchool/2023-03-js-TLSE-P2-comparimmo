import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/styles/index.scss";
// eslint-disable-next-line import/no-unresolved
import Footer from "./components/Footer/Footer";
// eslint-disable-next-line import/no-unresolved
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
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
