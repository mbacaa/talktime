import React, { useState, useEffect } from "react";
import { USERS, updateUsers } from "../../stores/users";
import Avatar from "../../components/Avatar";

const SearchFriends = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    updateUsers();
    setFilteredResults(USERS.get());
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    const filteredData = USERS.get().filter((item) => {
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
        className="text-sm w-full border-2 my-4 py-1 rounded-md focus:outline-none focus:border-gray-900"
        onChange={(e) => searchItems(e.target.value)}
      />

      <div className="grid grid-cols-5 gap-3 my-5">
        {searchInput.length > 1 && filteredResults.length === 0 ? (
          <div className="text-sm justify-start">No results found!</div>
        ) : (
          filteredResults.map((user) => (
            <Avatar
              key={user._id}
              username={user.username}
              picture={user.picture}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchFriends;
