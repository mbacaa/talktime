import React, { useState, useEffect } from "react";
import Avatar from "../../components/Avatar";
import { axiosConfig } from "../../utils/axiosConfig";
import { useCookies } from "react-cookie";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { GiChoppedSkull } from "react-icons/gi";

const AdminPanel = () => {
  const [cookies] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const USER_DATA = cookies.USER_DATA;
  const [users, setUsers] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const response = await axiosConfig.get("/users", {
        headers: {
          Authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      const withoutMe = response.data.filter(
        (user) => user._id !== USER_DATA._id,
      );
      setUsers(withoutMe);
      setFilteredResults(withoutMe);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (_id) => {
    try {
      await axiosConfig.delete(`/users/${_id}`, {
        headers: {
          Authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      getUsers();
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

  const handleDelete = (_id) => {
    deleteUser(_id);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center relative overflow-hidden text-gray-100">
      <div className="w-1/2 h-1/2 mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/50 to-violet-600/50 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-400"></div>
          <div className="relative px-12 pt-6 pb-2 bg-white/20 ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center justify-center">
            <div className="w-full h-full p-6 flex flex-col gap-2">
              <div>
                <div className="flex justify-between">
                  <div className="font-bold text-3xl justify-start">
                    Admin Panel
                  </div>
                  <div className="flex items-start justify-end ml-4">
                    <button
                      onClick={() => {
                        navigate(-1);
                      }}
                      className="text-2xl"
                    >
                      <VscArrowLeft className="text-gray-100 hover:text-gray-300" />
                    </button>
                  </div>
                </div>

                <div className="text-sm justify-start">
                  Press the button to delete user.
                </div>
              </div>

              <input
                placeholder="Search..."
                className="text-sm w-full border-1 my-4 py-2 px-2 rounded-md focus:outline-none bg-gray-200 border-gray-400 focus:border-gray-700 text-gray-900 "
                onChange={(e) => searchItems(e.target.value)}
              />

              <div className="flex flex-col gap-3 my-5">
                <div className="w-full h-adminHeight flex flex-col ">
                  <div className="scrollbar-thin scrollbar-thumb-white/20 overflow-y-auto flex flex-col gap-3">
                    {searchInput.length > 1 && filteredResults.length === 0 ? (
                      <div className="text-xl font-bold col-span-5">
                        No results found!
                      </div>
                    ) : (
                      filteredResults.map((user) => (
                        <div className="flex items-center justify-between pr-8">
                          <div
                            key={user._id}
                            className="flex justify-start items-center gap-4"
                          >
                            <div>
                              <Avatar
                                username={user.username}
                                picture={user.picture}
                              />
                            </div>
                            <div>{user.username}</div>
                            <div>{user.email}</div>
                          </div>
                          <button
                            onClick={() => {
                              handleDelete(user._id);
                            }}
                          >
                            <GiChoppedSkull className="text-3xl text-gray-900 hover:text-red-500" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
