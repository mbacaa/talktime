import React, { useState, useEffect } from "react";
import Avatar from "../../components/Avatar";
import { axiosConfig } from "../../utils/axiosConfig";
import { useCookies } from "react-cookie";

const SearchFriends = () => {
  const [cookies] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const USER_DATA = cookies.USER_DATA;
  const [users, setUsers] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getUsers = async () => {
    try {
      const response = await axiosConfig.get("/users", {
        headers: {
          Authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      const withoutMeAndFriends = response.data.filter(
        (user) =>
          user._id !== USER_DATA._id && !USER_DATA.friends.includes(user._id),
      );
      setUsers(withoutMeAndFriends);
      setFilteredResults(withoutMeAndFriends);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    const filteredData = users.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  return (
    <div className="w-full h-full p-6 flex flex-col gap-2">
      <div>
        <div className="font-bold text-3xl justify-start">
          Seek out new friends!
        </div>
        <div className="text-sm justify-start">
          Press on the photo to go to user's profile
        </div>
      </div>

      <input
        placeholder="Search..."
        className="text-sm w-full border-1 my-4 py-2 px-2 rounded-md focus:outline-none bg-gray-200 border-gray-400 focus:border-gray-700 text-gray-900 "
        onChange={(e) => searchItems(e.target.value)}
      />

      <div className="grid grid-cols-5 gap-3 my-5">
        {searchInput.length > 1 && filteredResults.length === 0 ? (
          <div className="text-xl font-bold col-span-5">No results found!</div>
        ) : (
          filteredResults.map((user) => (
            <div className="col-span-1" key={user._id}>
              <Avatar username={user.username} picture={user.picture} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchFriends;
