
// // src/components/chat/ChatLayout.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import ChatList from "./ChatList";
// import ChatWindow from "./ChatWindow";
// import { dummyChats } from "../../data/dummyChats";

// const ChatLayout = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

//   // Detect mobile screen
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleSelectChat = (chat) => {
//     setSelectedChat(chat);
//     if (isMobile) setIsMobileChatOpen(true);
//   };

//   const handleBack = () => {
//     setIsMobileChatOpen(false);
//     setSelectedChat(null);
//   };

//   return (
//     <div className="flex h-screen w-full bg-[#F8F9FA] pt-14 overflow-hidden">
//       {/* Chat List */}
//       <AnimatePresence mode="wait">
//         {(!isMobile || !isMobileChatOpen) && (
//           <motion.div
//             initial={isMobile ? { x: -300, opacity: 0 } : false}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: -300, opacity: 0 }}
//             className="flex-shrink-0 w-full md:w-[400px] border-r border-gray-200 flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
//           >
//             <ChatList
//               selectedChat={selectedChat}
//               setSelectedChat={handleSelectChat}
//               chats={dummyChats}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Chat Window */}
//       <AnimatePresence mode="wait">
//         {selectedChat && (!isMobile || isMobileChatOpen) && (
//           <motion.div
//             initial={isMobile ? { x: 300, opacity: 0 } : false}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: 300, opacity: 0 }}
//             className="flex-1 flex flex-col h-full bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
//           >
//             {/* Removed mobile back button/header */}

//             {/* Chat Messages */}
//             <ChatWindow
//               chat={selectedChat}
//               onBack={handleBack}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Desktop Empty State */}
//       {!isMobile && !selectedChat && (
//         <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400 flex-col gap-4">
//           <div className="p-6 bg-white rounded-full shadow-sm">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="48"
//               height="48"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
//             </svg>
//           </div>
//           <p className="text-lg font-medium">
//             Select a chat to start messaging
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatLayout;



// src/components/chat/ChatLayout.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const ChatLayout = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    if (isMobile) setIsMobileChatOpen(true);
  };

  const handleBack = () => {
    setIsMobileChatOpen(false);
    setSelectedChat(null);
  };

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] pt-14 overflow-hidden">
      {/* Chat List */}
      <AnimatePresence mode="wait">
        {(!isMobile || !isMobileChatOpen) && (
          <motion.div
            initial={isMobile ? { x: -300, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="flex-shrink-0 w-full md:w-[400px] border-r border-gray-200 flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            <ChatList
              selectedChat={selectedChat}
              setSelectedChat={handleSelectChat}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {selectedChat && (!isMobile || isMobileChatOpen) && (
          <motion.div
            initial={isMobile ? { x: 300, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="flex-1 flex flex-col h-full bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            <ChatWindow
              chat={selectedChat}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Empty State */}
      {!isMobile && !selectedChat && (
        <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400 flex-col gap-4">
          <div className="p-6 bg-white rounded-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
            </svg>
          </div>
          <p className="text-lg font-medium">
            Select a chat to start messaging
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatLayout;