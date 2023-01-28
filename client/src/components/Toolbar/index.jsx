import React from "react";
import { VscArrowLeft, VscOrganization, VscSignOut } from "react-icons/vsc";
import { updateUserData } from "../../stores/userData";
import { useNavigate } from "react-router-dom";
import { USER_DATA } from "../../stores/userData";

const Toolbar = () => {
  const currentUser = USER_DATA.get();
  const navigate = useNavigate();
  const logout = () => {
    updateUserData(null, null);
    navigate("/");
  };
  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex flex-col justify-start gap-4 ">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="text-2xl"
        >
          <VscArrowLeft className="text-gray-700 hover:text-gray-900" />
        </button>
      </div>
      <div className="h-full flex flex-col gap-4 items-center justify-center">
        <button
          onClick={() => {
            navigate(`/profile/${currentUser.username}/friends`);
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
