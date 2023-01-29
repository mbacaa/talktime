import React from "react";
import { USER_DATA } from "../../stores/userData";
import Avatar from "../Avatar";

const ActiveFriends = () => {
  const { username, picture } = USER_DATA.get();

  return (
    <div>
      <div>
        <Avatar username={username} picture={picture} />
      </div>
    </div>
  );
};

export default ActiveFriends;
