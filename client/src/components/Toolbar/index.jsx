import React from "react";
import { VscOrganization, VscSignOut } from "react-icons/vsc";
import { GiNightSky } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Toolbar = () => {
  const [, , removeCookie] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("JWT_TOKEN");
    removeCookie("USER_DATA");
    navigate("/");
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex flex-col justify-start gap-4 ">
        <button className="text-2xl">
          <GiNightSky className=" text-gray-300 hover:text-gray-400" />
        </button>
      </div>
      <div className="h-full flex flex-col gap-4 items-center justify-center">
        <button
          onClick={() => {
            navigate(`/friends`);
          }}
          className="text-2xl "
        >
          <VscOrganization className="text-gray-300 hover:text-gray-400 " />
        </button>
      </div>
      <div>
        <button onClick={logout} className="text-2xl">
          <VscSignOut className="text-gray-300 hover:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
