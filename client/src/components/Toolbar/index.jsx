import React from "react";
import { VscOrganization, VscSignOut } from "react-icons/vsc";
import { GiNightSky } from "react-icons/gi";
import { USER_DATA, updateUserData } from "../../stores/userData";
import { DARK_MODE, updateDarkMode } from "../../stores/darkMode";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Toolbar = () => {
  const currentUser = USER_DATA.get();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["JWT_TOKEN"]);
  const logout = () => {
    updateUserData(null, null);
    removeCookie("JWT_TOKEN");
    navigate("/");
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex flex-col justify-start gap-4 ">
        <button
          onClick={() => {
            updateDarkMode();
            console.log(DARK_MODE.get());
          }}
          className="text-2xl"
        >
          <GiNightSky className="text-gray-700 hover:text-gray-900" />
        </button>
      </div>
      <div className="h-full flex flex-col gap-4 items-center justify-center">
        <button
          onClick={() => {
            navigate(`/friends`);
          }}
          className="text-2xl "
        >
          <VscOrganization className="text-gray-700 hover:text-gray-900 " />
        </button>
      </div>
      <div>
        <button onClick={logout} className="text-2xl">
          <VscSignOut className="text-gray-700 hover:text-gray-900" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
