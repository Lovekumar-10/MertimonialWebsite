// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Search, Heart, Sparkles, ShieldCheck, Users } from 'lucide-react';

// import HeroSectionSkeleton from "../Skeleton/HeroSectionSkeleton"; // adjust path

// const HeroSection = () => {
//   const [loading, setLoading] = useState(true);

//   // Animation variants for text
//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" }
//     })
//   };

//   // Simulate loading (replace with real fetch if needed)
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000); // 1.5s loading
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) return <HeroSectionSkeleton />;

//   return (
//     <section className="relative flex items-center  bg-[var(--bg-main)] overflow-hidden mt-16 " style={{ backgroundColor: 'var(--bg-main)' }}>
//       {/* Decorative Background Element */}
//       <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--bg-soft)] rounded-l-[100px] z-0 opacity-50 hidden lg:block" />

//       <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center z-10">

//         {/* LEFT CONTENT: TEXT & SEARCH */}
//         <div className="space-y-8">
//           <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
//             <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[var(--color-primary)] text-[12px] font-[var(--fw-bold)] uppercase tracking-widest mb-4">
//               <Sparkles size={14} /> Trust & Tradition meet Technology
//             </span>
//             <h1 className="text-[var(--fs-h2)] lg:text-[var(--fs-h1)] font-[var(--fw-bold)] leading-[1.1] text-[var(--text-primary)]">
//               Find your <span className="text-[var(--color-primary)]">Soulmate</span> <br />
//               with Purpose.
//             </h1>
//             <p className="mt-4 text-[var(--fs-body)] text-[var(--text-secondary)] max-w-md leading-relaxed">
//               We bring together high-value individuals looking for lifelong commitment. 100% verified profiles and personalized matchmaking.
//             </p>
//           </motion.div>

//           {/* SMART SEARCH BAR - The "Killer" UI element */}
//           <motion.div
//             custom={1} initial="hidden" animate="visible" variants={fadeUp}
//             className="p-2 bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-hover)] border border-[var(--border)] flex flex-col md:flex-row items-center gap-2"
//           >
//             <div className="flex-1 grid grid-cols-2 divide-x divide-[var(--border)] w-full">
//               <div className="px-4 py-2">
//                 <label className="block text-[10px] uppercase font-bold text-[var(--text-light)]">I'm looking for</label>
//                 <select className="bg-transparent text-[var(--fs-small)] font-medium outline-none w-full cursor-pointer">
//                   <option>A Bride</option>
//                   <option>A Groom</option>
//                 </select>
//               </div>
//               <div className="px-4 py-2">
//                 <label className="block text-[10px] uppercase font-bold text-[var(--text-light)]">Age Range</label>
//                 <select className="bg-transparent text-[var(--fs-small)] font-medium outline-none w-full cursor-pointer">
//                   <option>21 - 28</option>
//                   <option>29 - 35</option>
//                   <option>36+</option>
//                 </select>
//               </div>
//             </div>
//             <button className="w-full md:w-auto px-8 py-4 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-[var(--fw-bold)] flex items-center justify-center gap-2 hover:brightness-110 transition-all">
//               <Search size={18} /> Let's Connect
//             </button>
//           </motion.div>

//           {/* TRUST BADGES */}
//           <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-6 pt-4">
//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-green-100 text-[var(--success)] rounded-full"><ShieldCheck size={18}/></div>
//               <span className="text-[12px] font-medium text-[var(--text-secondary)]">Verified Profiles</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-blue-100 text-[var(--color-primary)] rounded-full"><Users size={18}/></div>
//               <span className="text-[12px] font-medium text-[var(--text-secondary)]">500k+ Active Users</span>
//             </div>
//           </motion.div>
//         </div>

//         {/* RIGHT CONTENT: FLOATING PROFILE CARDS */}
//         <div className="relative h-[500px] flex items-center justify-center">
//           {/* Main Hero Image */}
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="relative w-72 h-96 rounded-[var(--radius-lg)] overflow-hidden z-10 border-4 border-white shadow-2xl"
//           >
//             <img
//               src="https://plus.unsplash.com/premium_photo-1675797613561-a4ea6dd7b914?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt="Happy Couple"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
//               <p className="font-bold">Rahul & Sneha</p>
//               <p className="text-[10px] opacity-80">Matched 2 months ago</p>
//             </div>
//           </motion.div>

//           {/* Floating Card 1 */}
//           <motion.div
//             animate={{ y: [0, -20, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute top-10 left-0 md:-left-10 z-20 bg-white p-3 rounded-[var(--radius-md)] shadow-xl flex items-center gap-3"
//           >
//             <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500"><Heart size={20} fill="currentColor"/></div>
//             <div>
//               <p className="text-[12px] font-bold">New Match!</p>
//               <p className="text-[10px] text-[var(--text-light)]">Based on Interests</p>
//             </div>
//           </motion.div>

//           {/* Floating Card 2 */}
//           <motion.div
//             animate={{ y: [0, 20, 0] }}
//             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//             className="absolute bottom-10 right-0 md:-right-5 z-20 bg-white p-4 rounded-[var(--radius-md)] shadow-xl"
//           >
//             <div className="flex items-center gap-2 mb-2">
//               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               <span className="text-[10px] font-bold text-[var(--text-secondary)]">2,400 Online Now</span>
//             </div>
//             <div className="flex -space-x-2">
//               {[1,2,3,4].map(i => (
//                 <img key={i} className="w-8 h-8 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/150?u=${i+10}`} alt="avatar" />
//               ))}
//             </div>
//           </motion.div>

//           {/* Decorative Circles */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-200 rounded-full opacity-20 animate-spin-slow" />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-100 rounded-full opacity-10 animate-spin-slow-reverse" />
//         </div>

//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect } from "react";
// 1️⃣ Import this at the top
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Heart, Sparkles, ShieldCheck, Users } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HeroSectionSkeleton from "../Skeleton/HeroSectionSkeleton"; // adjust path

const HeroSection = () => {
  const ageRanges = [
    { label: "21-25", min: 21, max: 25 },
    { label: "26-30", min: 26, max: 30 },
    { label: "31-35", min: 31, max: 35 },
    { label: "36-40", min: 36, max: 40 },
    { label: "41-50", min: 41, max: 50 },
  ];

  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [lookingFor, setLookingFor] = useState("A Bride");
  const [ageRange, setAgeRange] = useState("21 - 28");
  const navigate = useNavigate();
  const { user } = useAuth(); // check if user is logged in
  // Animation variants for text

  // Read query params and prefill filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const gender = params.get("gender") || "";
    const ageRange = params.get("ageRange") || "";

    if (gender || ageRange) {
      setFilters((prev) => ({
        ...prev,
        gender,
        ageRange,
      }));
    }
  }, [location.search]);

  const handleSearch = () => {
    if (!user) {
      // If not logged in, redirect to login
      navigate("/login");
      return;
    }

    // If logged in, pass the search params via query string
    navigate(
      `/MatrimonyFilter?lookingFor=${encodeURIComponent(lookingFor)}&ageRange=${encodeURIComponent(ageRange)}`,
    );
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" },
    }),
  };

  // Simulate loading (replace with real fetch if needed)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1.5s loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <HeroSectionSkeleton />;

  return (
    <section
      className="relative flex items-center  bg-[var(--bg-main)] overflow-hidden mt-16 "
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--bg-soft)] rounded-l-[100px] z-0 opacity-50 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* LEFT CONTENT: TEXT & SEARCH */}
        <div className="space-y-8">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[var(--color-primary)] text-[12px] font-[var(--fw-bold)] uppercase tracking-widest mb-4">
              <Sparkles size={14} /> Trust & Tradition meet Technology
            </span>
            <h1 className="text-[var(--fs-h2)] lg:text-[var(--fs-h1)] font-[var(--fw-bold)] leading-[1.1] text-[var(--text-primary)]">
              Find your{" "}
              <span className="text-[var(--color-primary)]">Soulmate</span>{" "}
              <br />
              with Purpose.
            </h1>
            <p className="mt-4 text-[var(--fs-body)] text-[var(--text-secondary)] max-w-md leading-relaxed">
              We bring together high-value individuals looking for lifelong
              commitment. 100% verified profiles and personalized matchmaking.
            </p>
          </motion.div>

          {/* SMART SEARCH BAR - The "Killer" UI element */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="p-2 bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-hover)] border border-[var(--border)] flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-1 grid grid-cols-2 divide-x divide-[var(--border)] w-full">
              <div className="px-4 py-2">
                <label className="block text-[10px] uppercase font-bold text-[var(--text-light)]">
                  I'm looking for
                </label>
                <select
                  className="bg-transparent text-[var(--fs-small)] font-medium outline-none w-full cursor-pointer"
                  value={lookingFor} // bind state
                  onChange={(e) => setLookingFor(e.target.value)} // update state
                >
                  <option value="A Bride">A Bride</option>
                  <option value="A Groom">A Groom</option>
                </select>
              </div>
              <div className="px-4 py-2">
                <label className="block text-[10px] uppercase font-bold text-[var(--text-light)]">
                  Age Range
                </label>
                <select
                  className="bg-transparent text-[var(--fs-small)] font-medium outline-none w-full cursor-pointer"
                  value={ageRange} // bind state
                  onChange={(e) => setAgeRange(e.target.value)} // update state
                >
                  <option value="">Select Age Range</option>
                  {ageRanges.map((a) => (
                    <option key={a.label} value={a.label}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-8 py-4 bg-[var(--color-primary)] cursor-pointer text-white rounded-[var(--radius-md)] font-[var(--fw-bold)] flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              <Search size={18} /> Let's Connect
            </button>
          </motion.div>

          {/* TRUST BADGES */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-6 pt-4"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 text-[var(--success)] rounded-full">
                <ShieldCheck size={18} />
              </div>
              <span className="text-[12px] font-medium text-[var(--text-secondary)]">
                Verified Profiles
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-[var(--color-primary)] rounded-full">
                <Users size={18} />
              </div>
              <span className="text-[12px] font-medium text-[var(--text-secondary)]">
                500k+ Active Users
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT CONTENT: FLOATING PROFILE CARDS */}
        <div className="relative h-[500px] flex items-center justify-center">
          {/* Main Hero Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-72 h-96 rounded-[var(--radius-lg)] overflow-hidden z-10 border-4 border-white shadow-2xl"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1675797613561-a4ea6dd7b914?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Happy Couple"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <p className="font-bold">Rahul & Sneha</p>
              <p className="text-[10px] opacity-80">Matched 2 months ago</p>
            </div>
          </motion.div>

          {/* Floating Card 1 */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-0 md:-left-10 z-20 bg-white p-3 rounded-[var(--radius-md)] shadow-xl flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
              <Heart size={20} fill="currentColor" />
            </div>
            <div>
              <p className="text-[12px] font-bold">New Match!</p>
              <p className="text-[10px] text-[var(--text-light)]">
                Based on Interests
              </p>
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-10 right-0 md:-right-5 z-20 bg-white p-4 rounded-[var(--radius-md)] shadow-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-[var(--text-secondary)]">
                2,400 Online Now
              </span>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  src={`https://i.pravatar.cc/150?u=${i + 10}`}
                  alt="avatar"
                />
              ))}
            </div>
          </motion.div>

          {/* Decorative Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-200 rounded-full opacity-20 animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-100 rounded-full opacity-10 animate-spin-slow-reverse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
