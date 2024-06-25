import React from "react";
import ReactDOM from "react-dom/client";
import Home from "@/pages/home/home.jsx";
import Lobby from "@/pages/lobbby/lobby";
import Match from "./pages/match/match";
import LobbyProvider from "@/contexts/lobby/lobbyContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LobbyProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby/:code" element={<Lobby />} />
          <Route path="/match/:code" element={<Match />} />
        </Routes>
      </LobbyProvider>
    </BrowserRouter>
  </React.StrictMode>
);
