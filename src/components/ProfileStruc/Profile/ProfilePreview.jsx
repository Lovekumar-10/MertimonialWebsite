// import React, { useContext } from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   MessageCircle,
//   Share2,
//   Ruler,
//   Languages,
//   Users,
//   Briefcase,
//   Pencil,
// } from "lucide-react";
// import { RiVerifiedBadgeFill } from "react-icons/ri";
// import { useNavigate, useParams, Link } from "react-router-dom";

// // Import your modular components
// import Gallery from "./Gallery";
// import StatBox from "./StatBox";
// import DetailRow from "./DetailRow";
// import ProfileAboutSection from "./ProfileAboutSection";

// // Import your UserContext
// import { DummyUserContext } from "../../../context/DummyUserContext";

// const ProfilePreview = () => {
//   const { id } = useParams();
//   const { users } = useContext(DummyUserContext);
//   const navigate = useNavigate();

//   const user = users.find((u) => u.id === Number(id));

//   if (!user) return <p className="text-center py-20">Loading Profile...</p>;

//   const {
//     name,
//     age,
//     location,
//     images = [],
//     height,
//     languages,
//     religion,
//     education,
//     occupation,
//     income,
//     company,
//     about,
//   } = user;

//   return (
//     <div className="min-h-screen bg-[var(--bg-main)] font-[var(--ff-primary)]">
//       {/* Floating Edit Button - Placed for easy access without breaking the layout */}
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => navigate("/profile/edit")}
//         className="fixed bottom-8 right-8 z-50 p-4  cursor-pointer rounded-full bg-[var(--color-primary)] text-white shadow-xl hover:bg-[var(--color-accent)] transition-colors flex items-center justify-center"
//       >
//         <Pencil size={24} />
//       </motion.button>

//       <main className="max-w-7xl mx-auto pt-28 pb-20 px-4 md:px-10">
//         {/* TOP SECTION: Gallery + Quick Info */}
//         <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
//           {/* Left: Gallery Component */}
//           <Gallery
//             images={
//               images.length ? images : ["https://via.placeholder.com/400"]
//             }
//           />

//           {/* Right: Personal Bio & Stats */}
//           <div className="lg:w-1/2 space-y-8">
//             <header className="space-y-3">
//               <div
//                 className="relative group overflow-hidden px-3 py-1 rounded-full flex items-center gap-2 w-fit border border-[var(--success)]/20 shadow-sm"
//                 style={{ backgroundColor: "rgba(34, 197, 94, 0.05)" }}
//               >
//                 {/* Shimmer Effect Layer */}
//                 <motion.div
//                   initial={{ x: "-100%" }}
//                   animate={{ x: "100%" }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2.5,
//                     ease: "linear",
//                     repeatDelay: 1,
//                   }}
//                   className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 -skew-x-12"
//                 />

//                 <div className="relative z-10 flex items-center gap-2">
//                   <motion.div
//                     animate={{
//                       scale: [1, 1.2, 1],
//                     }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                     className="text-[var(--success)] flex items-center justify-center"
//                   >
//                     <RiVerifiedBadgeFill size={18} />
//                   </motion.div>

//                   <span
//                     className="font-[var(--ff-primary)] font-black uppercase tracking-[0.15em] text-[var(--success)]"
//                     style={{ fontSize: "var(--fs-caption)" }}
//                   >
//                     Verified Profile
//                   </span>
//                 </div>
//               </div>
//               <h1
//                 className="font-black text-[var(--text-primary)] leading-tight"
//                 style={{ fontSize: "var(--fs-h1)" }}
//               >
//                 {name}, <span className="opacity-40">{age}</span>
//               </h1>
//               <p className="flex items-center gap-2 text-[var(--text-secondary)] font-medium">
//                 <MapPin size={18} className="text-[var(--color-primary)]" />{" "}
//                 {location}
//               </p>
//             </header>

//             {/* Action Buttons */}
//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-4 py-6 border-y border-[var(--border)]">
//               {/* Send Interest */}
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="flex-1 min-w-[200px] py-4 rounded-full font-black text-white shadow-[var(--shadow-card)] flex items-center justify-center gap-3 uppercase tracking-tighter bg-[var(--color-primary)]"
//               >
//                 <MessageCircle size={20} /> Send Interest
//               </motion.button>

//               {/* Chat Button */}
//               <Link
//                 to={"/chat"} // Navigate to /chat/:id
//                 className="flex-1 min-w-[200px] py-4 rounded-full font-black text-white shadow-[var(--shadow-card)] flex items-center justify-center gap-3 uppercase tracking-tighter bg-[var(--color-accent)] hover:bg-[var(--color-accent-base)] transition-colors"
//               >
//                 <MessageCircle size={20} /> Chat
//               </Link>

//               {/* Share Button */}
//               <button className="p-4 rounded-full border-2 border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--color-accent)] transition-all">
//                 <Share2 size={20} />
//               </button>
//             </div>

//             {/* Quick Stats Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               <StatBox
//                 icon={<Ruler size={18} />}
//                 label="Height"
//                 value={height}
//               />
//               <StatBox
//                 icon={<Languages size={18} />}
//                 label="Languages"
//                 value={languages}
//               />
//               <StatBox
//                 icon={<Users size={18} />}
//                 label="Religion"
//                 value={religion}
//               />
//             </div>

//             {/* Professional Background Card */}
//             <div
//               className="p-8 space-y-6"
//               style={{
//                 backgroundColor: "var(--bg-soft)",
//                 borderRadius: "var(--radius-lg)",
//               }}
//             >
//               <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-primary)]">
//                 <Briefcase size={20} className="text-[var(--color-primary)]" />{" "}
//                 Career & Education
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <DetailRow label="Education" value={education} />
//                 <DetailRow label="Occupation" value={occupation} />
//                 <DetailRow label="Annual Income" value={income} />
//                 <DetailRow label="Company" value={company} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* BOTTOM SECTION: Detailed About & Tables */}
//         <ProfileAboutSection name={name} content={about} />
//       </main>
//     </div>
//   );
// };

// export default ProfilePreview;

import React, { useEffect, useState } from "react";

import {
  MapPin,
  MessageCircle,
  Share2,
  Ruler,
  Languages,
  Users,
  Briefcase,
  Pencil,
  Heart,
} from "lucide-react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useNavigate, useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { motion, AnimatePresence } from "framer-motion";

// Import modular components
import Gallery from "./Gallery";
import StatBox from "./StatBox";
import DetailRow from "./DetailRow";
import ProfileAboutSection from "./ProfileAboutSection";

// ✅ Import your real AuthContext
import { useAuth } from "../../../context/AuthContext";

const ProfilePreview = () => {
  const { id } = useParams(); // Grabs the ID from the URL if it exists
  const navigate = useNavigate();

  const { userData, user: currentUser, loading: authLoading, sendInterest } = useAuth();
// Ensure 'sendInterest' is inside those curly braces!

  // New States for Interaction
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const [displayData, setDisplayData] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(false);

  // Determine if this is the logged-in user's own profile
  const isOwnProfile = !id || id === currentUser?.uid;

  useEffect(() => {
    const getTargetUser = async () => {
      // If there's no ID or the ID matches the current user, use auth data
      if (isOwnProfile) {
        setDisplayData(userData);
        setFetchingUser(false);
      } else {
        // Otherwise, fetch the other user's data from Firestore
        setFetchingUser(true);
        try {
          const docRef = doc(db, "users", id);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setDisplayData(snap.data());
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setFetchingUser(false);
        }
      }
    };

    if (!authLoading) {
      getTargetUser();
    }
    if (userData?.likesSent?.includes(id)) {
      setIsLiked(true);
    }
  }, [id, userData, currentUser, authLoading, isOwnProfile]);

  const handleLikeAction = async () => {
    if (isLiked || isOwnProfile) return;
    console.log("Sending interest to UID:", id);
    // 1. Trigger the Instagram-style pop animation
    setShowHeartAnim(true);

    // 2. Call the backend function
    const result = await sendInterest(id);

    if (result.success) {
      setIsLiked(true);
      // Hide the big heart after 1 second
      setTimeout(() => setShowHeartAnim(false), 1000);
    } else {
      setShowHeartAnim(false);
      alert("Something went wrong. Please try again.");
    }
  };

  // Handle Loading States
  if (authLoading || fetchingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <p className="text-xl font-medium animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!displayData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-main)] text-center px-4">
        <p className="mb-4 text-[var(--text-secondary)]">
          Profile not found or has been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-full font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const {
    fullName,
    profileImages = [],
    location,
    about,
    bio,
    languages,
    height = "Not Set",
    religion = "Not Set",
    education = "Not Set",
    occupation = "Not Set",
    income = "Not Set",
    company = "Not Set",
  } = displayData;

  const locationString = location?.city
    ? `${location.city}, ${location.state || location.country}`
    : "Location not set";

  return (
    <div className="min-h-screen bg-[var(--bg-main)] font-[var(--ff-primary)]">
      {/* 🛡️ SECURITY CHECK: Floating Edit Button only visible on OWN profile */}
      {isOwnProfile && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/profile/edit")}
          className="fixed bottom-8 right-8 z-50 p-4 cursor-pointer rounded-full bg-[var(--color-primary)] text-white shadow-xl hover:bg-[var(--color-accent)] transition-colors flex items-center justify-center"
        >
          <Pencil size={24} />
        </motion.button>
      )}

      <main className="max-w-7xl mx-auto pt-28 pb-20 px-4 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
          <Gallery
            images={
              profileImages.length > 0
                ? profileImages
                : ["https://via.placeholder.com/400?text=No+Photo"]
            }
          />

          <AnimatePresence>
            {showHeartAnim && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
              >
                <Heart
                  size={120}
                  fill="#ff4d6d"
                  stroke="white"
                  strokeWidth={1}
                  className="drop-shadow-2xl"
                />
              </motion.div>
            )}
          </AnimatePresence>


          <div className="lg:w-1/2 space-y-8">
            <header className="space-y-3">
              <div
                className="relative group overflow-hidden px-3 py-1 rounded-full flex items-center gap-2 w-fit border border-[var(--success)]/20 shadow-sm"
                style={{ backgroundColor: "rgba(34, 197, 94, 0.05)" }}
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 -skew-x-12"
                />
                <div className="relative z-10 flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-[var(--success)] flex items-center justify-center"
                  >
                    <RiVerifiedBadgeFill size={18} />
                  </motion.div>
                  <span className="font-black uppercase tracking-[0.15em] text-[var(--success)] text-[10px]">
                    Verified Profile
                  </span>
                </div>
              </div>

              <h1 className="font-black text-[var(--text-primary)] leading-tight text-4xl">
                {fullName}
              </h1>
              <p className="flex items-center gap-2 text-[var(--text-secondary)] font-medium">
                <MapPin size={18} className="text-[var(--color-primary)]" />
                {locationString}
              </p>
              {bio && (
                <p className="text-[var(--text-secondary)] italic">"{bio}"</p>
              )}
            </header>

            {/* Smart Action Buttons */}
            <div className="flex flex-wrap gap-4 py-6 border-y border-[var(--border)]">
              {!isOwnProfile ? (
                <>
                  <motion.button
                    whileHover={!isLiked ? { scale: 1.02 } : {}}
                    whileTap={!isLiked ? { scale: 0.98 } : {}}
                    onClick={handleLikeAction}
                    disabled={isLiked}
                    className={`flex-1 min-w-[200px] py-4 rounded-full font-black shadow-lg flex items-center justify-center gap-3 uppercase tracking-tighter transition-all duration-300 ${
                      isLiked 
                        ? "bg-gray-200 text-gray-500 cursor-default" 
                        : "bg-[var(--color-primary)] text-white hover:bg-pink-600"
                    }`}
                  >
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                    {isLiked ? "Interest Sent" : "Send Interest"}
                  </motion.button>

                  <Link
                    to={`/chat/${id}`}
                    className="flex-1 min-w-[200px] py-4 rounded-full font-black text-white shadow-lg flex items-center justify-center gap-3 uppercase tracking-tighter bg-[var(--color-accent)] hover:bg-[var(--color-accent-base)] transition-colors"
                  >
                    <MessageCircle size={20} /> Message
                  </Link>
                </>
              ) : (
                <button className="flex-1 py-4 rounded-full border-2 border-[var(--border)] text-[var(--text-primary)] font-black uppercase tracking-widest flex items-center justify-center gap-3">
                  <Share2 size={20} /> Share My Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatBox
                icon={<Ruler size={18} />}
                label="Height"
                value={height}
              />
              <StatBox
                icon={<Languages size={18} />}
                label="Languages"
                value={
                  Array.isArray(languages) ? languages.join(", ") : "Not set"
                }
              />
              <StatBox
                icon={<Users size={18} />}
                label="Religion"
                value={religion}
              />
            </div>

            <div
              className="p-8 space-y-6"
              style={{
                backgroundColor: "var(--bg-soft)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-primary)]">
                <Briefcase size={20} className="text-[var(--color-primary)]" />
                Career & Education
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailRow label="Education" value={education} />
                <DetailRow label="Occupation" value={occupation} />
                <DetailRow label="Annual Income" value={income} />
                <DetailRow label="Company" value={company} />
              </div>
            </div>
          </div>
        </div>

        <ProfileAboutSection
          name={fullName}
          content={about || "No details provided yet."}
        />
      </main>
    </div>
  );
};

export default ProfilePreview;
