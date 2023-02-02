import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import UpdateProfile from "./pages/UpdateProfile";
import ManageFriends from "./pages/ManageFriends";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const [cookies] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const isAuth = cookies.JWT_TOKEN ? true : false;
  const isAdmin = isAuth && cookies.USER_DATA.isAdmin ? true : false;
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
            path="friends"
            element={isAuth ? <ManageFriends /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/admin"
            element={isAdmin ? <AdminPanel /> : <Navigate to="/chat" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
