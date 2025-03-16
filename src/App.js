import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CryptoDetail from "./CryptoDetail";
import InfoPage from "./InfoPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<CryptoDetail />} />
      <Route path="/info" element={<InfoPage />} />
    </Routes>
  );
};

export default App;
