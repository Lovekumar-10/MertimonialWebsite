// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Heart } from 'lucide-react';

// const Gallery = ({ images }) => {
//   const [activeImg, setActiveImg] = useState(images[0]);

//   return (
//     <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 h-fit lg:sticky lg:top-28">
//       {/* Thumbnails - Responsive: Bottom on mobile, Left on Desktop */}
//       <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
//         {images.map((img, i) => (
//           <motion.button 
//             key={i}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setActiveImg(img)}
//             className="relative min-w-[70px] w-20 h-20 cursor-pointer  rounded-[var(--radius-md)] overflow-hidden border-2 transition-all"
//             style={{ 
//               borderColor: activeImg === img ? 'var(--color-accent)' : 'var(--border)',
//               opacity: activeImg === img ? 1 : 0.6
//             }}
//           >
//             <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
//           </motion.button>
//         ))}
//       </div>

//       {/* Main Big Image */}
//       <div 
//         className="flex-1 relative aspect-[4/5] overflow-hidden shadow-[var(--shadow-card)]"
//         style={{ borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-card)' }}
//       >
//         <AnimatePresence mode="wait">
//           <motion.img 
//             key={activeImg}
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             src={activeImg} 
//             className="w-full h-full object-cover"
//           />
//         </AnimatePresence>
        
//         {/* Like Button */}
//         <motion.button 
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           className="absolute top-4 right-4 p-3  rounded-full backdrop-blur-md border border-white/30 text-white cursor-pointer hover:bg-[var(--color-accent)] transition-colors"
//           style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
//         >
//           <Heart size={20} fill={activeImg === images[0] ? "currentColor" : "none"} />
//         </motion.button>
//       </div>
//     </div>
//   );
// };

// export default Gallery;
















// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Heart } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const Gallery = ({ profileUser }) => {
//   const { user, userData, toggleLike } = useAuth();

//   const images = profileUser?.profileImages || [];
//   const [activeImg, setActiveImg] = useState(null);

//   useEffect(() => {
//     if (images.length > 0) {
//       setActiveImg(images[0]);
//     }
//   }, [images]);

//   if (!profileUser) return null;

//   const isOwnProfile = user?.uid === profileUser?.uid;
//   const alreadyLiked = userData?.likesSent?.includes(profileUser?.uid);
//   const totalLikes = profileUser?.likesReceived?.length || 0;

//   return (
//     <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 h-fit lg:sticky lg:top-28">
      
//       {/* Thumbnails */}
//       <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
//         {images.map((img, i) => (
//           <motion.button
//             key={i}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => setActiveImg(img)}
//             className="min-w-[70px] w-20 h-20 rounded-[var(--radius-md)] overflow-hidden border-2"
//             style={{
//               borderColor:
//                 activeImg === img
//                   ? "var(--color-accent)"
//                   : "var(--border)",
//             }}
//           >
//             <img
//               src={img}
//               alt="thumbnail"
//               className="w-full h-full object-cover"
//             />
//           </motion.button>
//         ))}
//       </div>

//       {/* Main Image */}
//       <div
//         className="flex-1 relative aspect-[4/5] overflow-hidden shadow-[var(--shadow-card)]"
//         style={{
//           borderRadius: "var(--radius-lg)",
//           backgroundColor: "var(--bg-card)",
//         }}
//       >
//         {activeImg && (
//           <AnimatePresence mode="wait">
//             <motion.img
//               key={activeImg}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               src={activeImg}
//               className="w-full h-full object-cover"
//             />
//           </AnimatePresence>
//         )}

//         {/* Like Button */}
//         {!isOwnProfile && (
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => toggleLike(profileUser.uid)}
//             title={`${totalLikes} Likes`}
//             className="absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border border-white/30 cursor-pointer transition-all"
//             style={{
//               backgroundColor: alreadyLiked
//                 ? "var(--color-accent)"
//                 : "rgba(255,255,255,0.2)",
//               color: "white",
//             }}
//           >
//             <Heart size={20} fill={alreadyLiked ? "currentColor" : "none"} />
//           </motion.button>
//         )}
//       </div>

//       {/* Likes Count */}
//       {!isOwnProfile && (
//         <div className="mt-3 text-center w-full">
//           <p className="font-semibold text-[var(--text-primary)]">
//             ❤️ {totalLikes} Likes
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;








import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const Gallery = ({ images, profileUid }) => {
  const { userData, toggleLike } = useAuth();
  const [activeImg, setActiveImg] = useState(images[0]);

  // Determine if this profile is liked by the current user
  const isLiked = userData?.likesSent?.includes(profileUid);

  return (
    <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 h-fit lg:sticky lg:top-28">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
        {images.map((img, i) => (
          <motion.button 
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveImg(img)}
            className="relative min-w-[70px] w-20 h-20 cursor-pointer  rounded-[var(--radius-md)] overflow-hidden border-2 transition-all"
            style={{ 
              borderColor: activeImg === img ? 'var(--color-accent)' : 'var(--border)',
              opacity: activeImg === img ? 1 : 0.6
            }}
          >
            <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>

      {/* Main Image */}
      <div 
        className="flex-1 relative aspect-[4/5] overflow-hidden shadow-[var(--shadow-card)]"
        style={{ borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-card)' }}
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={activeImg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={activeImg} 
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Like Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleLike(profileUid)}
          className="absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border border-white/30 text-white cursor-pointer hover:bg-[var(--color-accent)] transition-colors"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
        </motion.button>
      </div>
    </div>
  );
};

export default Gallery;