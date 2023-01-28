import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { USER_DATA, JWT } from "./stores/userData";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import UpdateProfile from "./pages/UpdateProfile";
import ManageFriends from "./pages/ManageFriends";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const user = USER_DATA.get();
  const isAuth = true;
  const isAdmin = true;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/chat"
            element={isAuth ? <Chat /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:username"
            element={isAuth ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:username/update"
            element={isAuth ? <UpdateProfile /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/profile/:username/friends"
            element={isAuth ? <ManageFriends /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/admin"
            element={isAdmin ? <AdminPanel /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
