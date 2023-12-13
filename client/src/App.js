import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import SetAvatar from "./pages/SetAvatar";
import Logo from "./assets/logo.jpg";

export default function App() {
  return (
    <div className="imageBackground h-screen">
    <img className="left-10 w-[200px] absolute mix-blend-screen" src={Logo} />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
