// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { VscArrowLeft } from "react-icons/vsc";
// import SearchFriends from "../../components/SearchFriends";
// import FriendsList from "../../components/FriendsList";

// const ManageFriends = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="h-screen bg-slate-900 flex flex-col justify-center text-gray-100">
//       <div className="w-5/6 h-5/6 m-auto">
//         <div className="relative group p-6 h-full bg-white/30 ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col">
//           <div className="h-full justify-between items-center">
//             <div className="flex flex-row h-full w-full">
//               <div className="grid grid-cols-2 gap-6 w-full h-full justify-center items-center">
//                 <div className="h-full flex gap-3 justify-center items-center bg-white/30 rounded text-gray-700 hover:text-gray-900 ring-1 ring-gray-900/5">
//                   <FriendsList />
//                 </div>
//                 <div className="h-full flex gap-3 justify-center items-center bg-white/30 rounded text-gray-700 hover:text-gray-900 ring-1 ring-gray-900/5">
//                   <SearchFriends />
//                 </div>
//               </div>
//               <div className="flex items-start justify-end ml-4">
//                 <button
//                   onClick={() => {
//                     navigate(-1);
//                   }}
//                   className="text-2xl"
//                 >
//                   <VscArrowLeft className="text-gray-700 hover:text-gray-900" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageFriends;

import React from "react";
import { useNavigate } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";
import SearchFriends from "../../components/SearchFriends";
import FriendsList from "../../components/FriendsList";

const ManageFriends = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-slate-900 flex flex-col justify-center relative text-gray-800">
      <div className="max-w-7xl mx-auto h-5/6 w-5/6 flex justify-center items-center">
        <div className="h-full w-full relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-violet-600/50 rounded-lg blur opacity-75"></div>
          <div className="h-full w-full relative bg-white/20 ring-1 p-12 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center justify-center">
            <div className="h-full w-full justify-between items-center">
              <div className="flex flex-row h-full w-full">
                <div className="grid grid-cols-2 gap-6 w-full h-full justify-center items-center">
                  <div className="h-full flex gap-3 justify-center items-center bg-white/20 rounded-lg   ring-1 ring-gray-900/5">
                    <FriendsList />
                  </div>
                  <div className="h-full flex gap-3 justify-center items-center bg-white/20 rounded-lg   ring-1 ring-gray-900/5">
                    <SearchFriends />
                  </div>
                </div>
                <div className="flex items-start justify-end ml-4">
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="text-2xl"
                  >
                    <VscArrowLeft className="text-gray-100 hover:text-gray-300 mb-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFriends;
