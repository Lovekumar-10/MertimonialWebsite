


// // src/components/chat/ChatList.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase";
// import {
//   Search,
//   Plus,
//   MoreVertical,
//   Pin,
//   CheckCheck,
//   SlidersHorizontal,
// } from "lucide-react";

// const ChatList = ({ selectedChat, setSelectedChat }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     const q = query(
//       collection(db, "chats"),
//       orderBy("lastMessageTime", "desc")
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const chatsData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setChats(chatsData);
//     });

//     return () => unsubscribe();
//   }, []);

//   const filteredChats = chats.filter((chat) =>
//     chat.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col h-full w-full max-w-md bg-[#F8F9FA] border-r border-gray-200">
//       {/* Header */}
//       <div className="p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
//         <div className="flex gap-2">
//           <button className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-shadow">
//             <Plus size={20} />
//           </button>
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
//             <MoreVertical size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="px-4 mb-4">
//         <div className="relative group">
//           <Search
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search For Contacts or Messages"
//             className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Recent Chats (Horizontal) */}
//       <div className="px-4 py-2">
//         <div className="flex justify-between items-center mb-3">
//           <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
//             Recent Chats
//           </h2>
//           <MoreVertical size={16} className="text-gray-400 cursor-pointer" />
//         </div>
//         <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
//           {chats.slice(0, 5).map((user) => (
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               key={`recent-${user.id}`}
//               className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer"
//               onClick={() => setSelectedChat(user)}
//             >
//               <div className="relative p-0.5 rounded-full border-2 border-indigo-500">
//                 <img
//                   src={user.avatar || "/default-avatar.png"}
//                   alt={user.name || "User"}
//                   className="w-14 h-14 rounded-full object-cover bg-gray-200"
//                 />
//                 {user.isOnline && (
//                   <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
//                 )}
//               </div>
//               <span className="text-xs font-medium text-gray-700">
//                 {user.name?.split(" ")[0] || "User"}
//               </span>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* All Chats Section */}
//       <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
//         <div className="flex justify-between items-center my-4">
//           <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
//             All Chats
//           </h2>
//           <SlidersHorizontal
//             size={16}
//             className="text-gray-400 cursor-pointer"
//           />
//         </div>

//         <div className="space-y-3 pb-6">
//           <AnimatePresence>
//             {filteredChats.map((user, index) => (
//               <motion.div
//                 key={user.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setSelectedChat(user)}
//                 className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
//                   selectedChat?.id === user.id
//                     ? "bg-white shadow-md ring-1 ring-black/5"
//                     : "bg-transparent hover:bg-white/60"
//                 }`}
//               >
//                 {/* Avatar */}
//                 <div className="relative flex-shrink-0">
//                   <img
//                     src={user.avatar || "/default-avatar.png"}
//                     alt={user.name || "User"}
//                     className="w-14 h-14 rounded-2xl object-cover"
//                   />
//                   {user.isOnline && (
//                     <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="ml-4 flex-1 min-w-0">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-[15px] font-bold text-gray-900 truncate">
//                       {user.name || "Unknown"}
//                     </h3>
//                     <span className="text-[11px] text-gray-400 font-medium">
//                       {user.lastMessageTime
//                         ? new Date(
//                             user.lastMessageTime.seconds * 1000
//                           ).toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })
//                         : ""}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center mt-1">
//                     <p
//                       className={`text-sm truncate ${
//                         user.unread > 0
//                           ? "text-indigo-600 font-semibold"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       {user.lastMessage || "No messages yet"}
//                     </p>
//                     <div className="flex items-center gap-2">
//                       {user.isPinned && (
//                         <Pin size={12} className="text-gray-400 rotate-45" />
//                       )}
//                       {user.unread > 0 ? (
//                         <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] flex justify-center shadow-sm">
//                           {user.unread}
//                         </span>
//                       ) : (
//                         <CheckCheck size={14} className="text-green-500" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatList;














// "eqGxXyu88LT4DQRxoJUqFffh8f32"














// src/components/chat/ChatList.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

import { useAuth } from "../../context/AuthContext";
import { where } from "firebase/firestore";


import { Search, Plus, MoreVertical, SlidersHorizontal } from "lucide-react";

const ChatList = ({ selectedChat, setSelectedChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chats, setChats] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
  if (!user) return;

  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", user.uid),
    orderBy("lastMessageTime", "desc")
  );


  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const chatsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("🔥 User Chats:", chatsData);
      setChats(chatsData);
    },
    (error) => {
      console.log("❌ Firestore error:", error);
    }
  );

  return () => unsubscribe();
}, [user]);

  const filteredChats = chats.filter((chat) =>
    chat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full max-w-md bg-[#F8F9FA] border-r border-gray-200">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
        <div className="flex gap-2">
          <button className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-shadow">
            <Plus size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search For Chats"
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
        <div className="space-y-3 pb-6">
          <AnimatePresence>
            {filteredChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                  selectedChat?.id === chat.id
                    ? "bg-white shadow-md ring-1 ring-black/5"
                    : "bg-transparent hover:bg-white/60"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.avatar || "/default-avatar.png"}
                    alt={chat.name || "User"}
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  {chat.isOnline && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[15px] font-bold text-gray-900 truncate">
                      {chat.name || "Unknown"}
                    </h3>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {chat.lastMessageTime
                        ? new Date(chat.lastMessageTime.seconds * 1000).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${chat.unread > 0 ? "text-indigo-600 font-semibold" : "text-gray-500"}`}>
                    {chat.lastMessage || "No messages yet"}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChatList;