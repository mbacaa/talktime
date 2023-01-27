import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/account/:id" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
