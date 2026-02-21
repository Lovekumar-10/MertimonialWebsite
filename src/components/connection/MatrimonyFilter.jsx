// import React, { useState, useEffect, useMemo } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import {
//   MapPin, Heart, Search, Filter, SlidersHorizontal,
//   ShieldCheck, ExternalLink, X
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const ExplorePage = () => {
//   const { getAllProfiles, userData } = useAuth();
//   const [allProfiles, setAllProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [displayLimit, setDisplayLimit] = useState(8);
//   const navigate = useNavigate();

//   // 1. Full Filter State
//   const [filters, setFilters] = useState({
//     search: '',
//     gender: '',
//     maritalStatus: '',
//     education: '',
//     occupation: '',
//     gothra: '',
//     rasi: '',
//     ageRange: '',
//     featured: false,
//     online: false,
//   });

//   // --- Static Dropdown Data ---
//   const genderOptions = ["Male", "Female", "Transgender", "Non-binary", "Other"];
//   const maritalStatusOptions = ["Unmarried", "Married", "Divorced", "Widowed", "Separated", "Annulled", "Other"];
//   const educationOptions = ["Uneducated", "Secondary School", "High School", "Bachelor’s Degree", "Master’s Degree", "Postgraduate", "PhD", "LLB", "Other"];
//   const occupationOptions = ["Professor", "Teacher", "Lawyer", "Doctor", "Engineer", "Businessman", "Royal Family Member", "Software Engineer", "Chartered Accountant", "Investment Banker", "Architect", "Government Officer", "Other"];
//   const gotraOptions = ["Bharadwaj", "Kashyap", "Vashistha", "Gautam", "Agastya", "Atri", "Jamadagni", "Vishwamitra", "Parashar", "Shandilya", "Bhrigu", "Kaushik", "Other"];
//   const rasiOptions = ["Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)", "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)", "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"];
//   const ageRanges = [
//     { label: '21-25', min: 21, max: 25 },
//     { label: '26-30', min: 26, max: 30 },
//     { label: '31-35', min: 31, max: 35 },
//     { label: '36-40', min: 36, max: 40 },
//     { label: '41-50', min: 41, max: 50 },
//   ];

//   useEffect(() => {
//     const loadData = async () => {
//       const data = await getAllProfiles();
//       setAllProfiles(data);
//       setLoading(false);
//     };
//     loadData();
//   }, []);

//   // 2. Comprehensive Filtering Logic
//   const filteredData = useMemo(() => {
//     return allProfiles.filter(profile => {
//       const searchTerm = filters.search.toLowerCase();
//       const searchMatch = searchTerm === '' ||
//         profile.fullName?.toLowerCase().includes(searchTerm) ||
//         profile.location?.city?.toLowerCase().includes(searchTerm) ||
//         profile.occupation?.toLowerCase().includes(searchTerm);

//       const ageMatch = filters.ageRange === '' || (() => {
//         const range = ageRanges.find(r => r.label === filters.ageRange);
//         return profile.age >= range.min && profile.age <= range.max;
//       })();

//       return (
//         searchMatch &&
//         ageMatch &&
//         (filters.gender === '' || profile.gender === filters.gender) &&
//         (filters.maritalStatus === '' || profile.maritalStatus === filters.maritalStatus) &&
//         (filters.education === '' || profile.education === filters.education) &&
//         (filters.occupation === '' || profile.occupation === filters.occupation) &&
//         (filters.gothra === '' || profile.gothra === filters.gothra) &&
//         (filters.rasi === '' || profile.raasi === filters.rasi) &&
//         (!filters.featured || profile.subscription?.isActive) &&
//         (!filters.online || profile.isOnline)
//       );
//     });
//   }, [filters, allProfiles]);

//   // 3. Infinite Scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
//         setDisplayLimit(prev => prev + 4);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const toggleFilter = (key) => setFilters(prev => ({ ...prev, [key]: !prev[key] }));

//   const resetFilters = () => {
//     setFilters({
//       search: '', gender: '', maritalStatus: '', education: '',
//       occupation: '', gothra: '', rasi: '', ageRange: '',
//       featured: false, online: false,
//     });
//   };

//   if (loading) return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-main)]">
//       <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
//       <p className="font-black tracking-widest text-[var(--text-secondary)]">SEARCHING UNIVERSE...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[var(--bg-main)] pt-28 pb-20 px-4 md:px-10">
//       <div className="max-w-7xl mx-auto">

//         {/* --- FILTER SECTION --- */}
//         <section className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-8 mb-12">
//           {/* Row 1: Search, Gender, Marital Status */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 name="search"
//                 value={filters.search}
//                 onChange={handleFilterChange}
//                 placeholder="Name, Location, Occupation..."
//                 className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-3 text-sm font-medium outline-none focus:border-[var(--color-primary)] transition-all"
//               />
//             </div>
//             <select name="gender" value={filters.gender} onChange={handleFilterChange} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer focus:border-[var(--color-primary)]">
//               <option value="">Any Gender</option>
//               {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
//             </select>
//             <select name="maritalStatus" value={filters.maritalStatus} onChange={handleFilterChange} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer focus:border-[var(--color-primary)]">
//               <option value="">Marital Status</option>
//               {maritalStatusOptions.map(m => <option key={m} value={m}>{m}</option>)}
//             </select>
//           </div>

//           {/* Row 2: Education, Occupation, Gothra, Rasi */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//             <select name="education" value={filters.education} onChange={handleFilterChange} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer focus:border-[var(--color-primary)]">
//               <option value="">Education</option>
//               {educationOptions.map(e => <option key={e} value={e}>{e}</option>)}
//             </select>
//             <select name="occupation" value={filters.occupation} onChange={handleFilterChange} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer focus:border-[var(--color-primary)]">
//               <option value="">Occupation</option>
//               {occupationOptions.map(o => <option key={o} value={o}>{o}</option>)}
//             </select>
//             <select name="gothra" value={filters.gothra} onChange={handleFilterChange} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer focus:border-[var(--color-primary)]">
//               <option value="">Gotra</option>
//               {gotraOptions.map(g => <option key={g} value={g}>{g}</option>)}
//             </select>
//             <select name="rasi" value={filters.rasi} onChange={handleFilterChange} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer focus:border-[var(--color-primary)]">
//               <option value="">Raasi</option>
//               {rasiOptions.map(r => <option key={r} value={r}>{r}</option>)}
//             </select>
//           </div>

//           {/* Row 3: Age & Toggles */}
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50">
//             <div className="flex flex-wrap items-center gap-6">
//               <select name="ageRange" value={filters.ageRange} onChange={handleFilterChange} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none min-w-[150px] cursor-pointer">
//                 <option value="">Any Age</option>
//                 {ageRanges.map(a => <option key={a.label} value={a.label}>{a.label}</option>)}
//               </select>

//               <button onClick={() => toggleFilter('featured')} className="flex items-center gap-3 group cursor-pointer">
//                 <div className={`w-10 h-5 rounded-full relative transition-colors ${filters.featured ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}>
//                   <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${filters.featured ? 'left-6' : 'left-1'}`} />
//                 </div>
//                 <span className="text-sm font-bold text-[var(--text-secondary)]">Premium Only</span>
//               </button>

//               <button onClick={() => toggleFilter('online')} className="flex items-center gap-3 group cursor-pointer">
//                 <div className={`w-10 h-5 rounded-full relative transition-colors ${filters.online ? 'bg-green-500' : 'bg-gray-200'}`}>
//                   <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${filters.online ? 'left-6' : 'left-1'}`} />
//                 </div>
//                 <span className="text-sm font-bold text-[var(--text-secondary)]">Online Now</span>
//               </button>
//             </div>

//             <button
//               onClick={resetFilters}
//               className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
//             >
//               <X size={14} /> RESET ALL FILTERS
//             </button>
//           </div>
//         </section>

//         {/* --- GRID SECTION --- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
//           <AnimatePresence>
//             {filteredData.slice(0, displayLimit).map((member, index) => (
//               <motion.div
//                 key={member.id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: (index % 4) * 0.1 }}
//                 viewport={{ once: true }}
//                 layout
//                 onClick={() => navigate(`/profile/${member.id}`)}
//                 className="relative h-[420px] cursor-pointer overflow-hidden rounded-[2rem] group/card shadow-lg hover:shadow-2xl transition-all border border-gray-100 bg-[var(--bg-card)]"
//               >
//                 {/* Background Image */}
//                 <img
//                   src={member.profileImages?.[0] || "https://via.placeholder.com/500?text=No+Photo"}
//                   alt={member.fullName}
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

//                 {/* Badges */}
//                 <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
//                   <div className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest flex items-center gap-1 shadow-lg bg-[var(--color-primary)] text-white">
//                     <ShieldCheck size={12} /> {member.subscription?.plan?.toUpperCase() || "MEMBER"}
//                   </div>

//                   <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white">
//                     <Heart
//                       size={16}
//                       fill={userData?.likesSent?.includes(member.id) ? "white" : "none"}
//                       className={userData?.likesSent?.includes(member.id) ? "text-white" : ""}
//                     />
//                   </div>
//                 </div>

//                 {/* Card Details */}
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   <h3 className="text-xl font-bold group-hover/card:text-[var(--color-primary)] transition-colors">
//                     {member.fullName}, {member.age || '??'}
//                   </h3>
//                   <p className="text-xs opacity-80 uppercase tracking-widest font-bold text-[var(--color-accent)]">
//                     {member.occupation || "Professional"}
//                   </p>
//                   <p className="text-[10px] opacity-60 mt-1 italic">
//                     {member.location?.city || "Location Private"}
//                   </p>

//                   <div className="mt-4 flex items-center gap-2 text-xs font-black text-[var(--color-primary)] opacity-0 group-hover/card:opacity-100 translate-y-2 group-hover/card:translate-y-0 transition-all">
//                     VIEW PROFILE <ExternalLink size={14} />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Loading Footer */}
//         {displayLimit < filteredData.length && (
//           <div className="py-12 text-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 animate-pulse">
//             Scroll for more
//           </div>
//         )}

//         {/* Empty State */}
//         {filteredData.length === 0 && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 bg-white rounded-[3rem] border border-dashed border-gray-100">
//             <Search size={48} className="mx-auto text-gray-200 mb-4" />
//             <h3 className="text-xl font-black text-gray-400 uppercase tracking-tighter">No souls found matching your journey</h3>
//             <button onClick={resetFilters} className="mt-4 text-[var(--color-primary)] font-bold text-xs cursor-pointer hover:underline">RESET SEARCH</button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExplorePage;

import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  MapPin,
  Heart,
  Search,
  ShieldCheck,
  ExternalLink,
  X,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const FindYourSoulmate = () => {
  const { getAllProfiles, userData } = useAuth();
  const [allProfiles, setAllProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(8);
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Full Filter State
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    maritalStatus: "",
    education: "",
    occupation: "",
    gothra: "",
    rasi: "",
    ageRange: "",
    featured: false,
    online: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lookingFor = params.get("lookingFor") || "";
    const ageRange = params.get("ageRange") || "";

    if (lookingFor || ageRange) {
      setFilters((prev) => ({
        ...prev,
        gender: lookingFor === "A Bride" ? "Female" : "Male", // optional mapping
        ageRange,
      }));
    }
  }, [location.search]);

  // --- Static Dropdown Data ---
  const genderOptions = [
    "Male",
    "Female",
    "Transgender",
    "Non-binary",
    "Other",
  ];
  const maritalStatusOptions = [
    "Unmarried",
    "Married",
    "Divorced",
    "Widowed",
    "Separated",
    "Annulled",
    "Other",
  ];
  const educationOptions = [
    "Uneducated",
    "Secondary School",
    "High School",
    "Bachelor’s Degree",
    "Master’s Degree",
    "Postgraduate",
    "PhD",
    "LLB",
    "Other",
  ];
  const occupationOptions = [
    "Professor",
    "Teacher",
    "Lawyer",
    "Doctor",
    "Engineer",
    "Businessman",
    "Royal Family Member",
    "Software Engineer",
    "Chartered Accountant",
    "Investment Banker",
    "Architect",
    "Government Officer",
    "Other",
  ];
  const gotraOptions = [
    "Bharadwaj",
    "Kashyap",
    "Vashistha",
    "Gautam",
    "Agastya",
    "Atri",
    "Jamadagni",
    "Vishwamitra",
    "Parashar",
    "Shandilya",
    "Bhrigu",
    "Kaushik",
    "Other",
  ];
  const rasiOptions = [
    "Mesha (Aries)",
    "Vrishabha (Taurus)",
    "Mithuna (Gemini)",
    "Karka (Cancer)",
    "Simha (Leo)",
    "Kanya (Virgo)",
    "Tula (Libra)",
    "Vrishchika (Scorpio)",
    "Dhanu (Sagittarius)",
    "Makara (Capricorn)",
    "Kumbha (Aquarius)",
    "Meena (Pisces)",
  ];
  const ageRanges = [
    { label: "21-25", min: 21, max: 25 },
    { label: "26-30", min: 26, max: 30 },
    { label: "31-35", min: 31, max: 35 },
    { label: "36-40", min: 36, max: 40 },
    { label: "41-50", min: 41, max: 50 },
  ];

  // Logic to check if any filter is active
  const isFilterActive = Object.values(filters).some(
    (val) => val !== "" && val !== false,
  );

  useEffect(() => {
    const loadData = async () => {
      const data = await getAllProfiles();
      setAllProfiles(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // 2. Comprehensive Filtering Logic
  const filteredData = useMemo(() => {
    return allProfiles.filter((profile) => {
      const searchTerm = filters.search.toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        profile.fullName?.toLowerCase().includes(searchTerm) ||
        profile.location?.city?.toLowerCase().includes(searchTerm) ||
        profile.occupation?.toLowerCase().includes(searchTerm);

      const ageMatch =
        filters.ageRange === "" ||
        (() => {
          const range = ageRanges.find((r) => r.label === filters.ageRange);
          return profile.age >= range.min && profile.age <= range.max;
        })();

      return (
        searchMatch &&
        ageMatch &&
        (filters.gender === "" || profile.gender === filters.gender) &&
        (filters.maritalStatus === "" ||
          profile.maritalStatus === filters.maritalStatus) &&
        (filters.education === "" || profile.education === filters.education) &&
        (filters.occupation === "" ||
          profile.occupation === filters.occupation) &&
        (filters.gothra === "" || profile.gothra === filters.gothra) &&
        (filters.rasi === "" || profile.raasi === filters.rasi) &&
        (!filters.featured || profile.subscription?.isActive) &&
        // 🔥 Updated checks below to handle undefined/null from DB
        (!filters.featured || profile.subscription?.isActive === true) &&
        (!filters.online || profile.isOnline === true)
      );
    });
  }, [filters, allProfiles]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setDisplayLimit((prev) => prev + 4);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    const toggleFilter = (key) =>
      setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      gender: "",
      maritalStatus: "",
      education: "",
      occupation: "",
      gothra: "",
      rasi: "",
      ageRange: "",
      featured: false,
      online: false,
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-main)]">
        <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-black tracking-widest text-[var(--text-secondary)]">
          SEARCHING UNIVERSE...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] pt-28 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* --- FILTER SECTION --- */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-3 text-sm font-medium outline-none focus:border-[var(--color-primary)] transition-all"
              />
            </div>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="">Any Gender</option>
              {genderOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              name="maritalStatus"
              value={filters.maritalStatus}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="">Marital Status</option>
              {maritalStatusOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <select
              name="education"
              value={filters.education}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="">Education</option>
              {educationOptions.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <select
              name="occupation"
              value={filters.occupation}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="">Occupation</option>
              {occupationOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <select
              name="gothra"
              value={filters.gothra}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="">Gotra</option>
              {gotraOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              name="rasi"
              value={filters.rasi}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="">Raasi</option>
              {rasiOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50">
            <div className="flex flex-wrap items-center gap-6">
              <select
                name="ageRange"
                value={filters.ageRange}
                onChange={handleFilterChange}
                className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none min-w-[150px] cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <option value="">Any Age</option>
                {ageRanges.map((a) => (
                  <option key={a.label} value={a.label}>
                    {a.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  setFilters((p) => ({ ...p, featured: !p.featured }))
                }
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div
                  className={`w-10 h-5 rounded-full relative transition-colors ${filters.featured ? "bg-[var(--color-primary)]" : "bg-gray-200"}`}
                >
                  <div
                    className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${filters.featured ? "left-6" : "left-1"}`}
                  />
                </div>
                <span className="text-sm font-bold text-[var(--text-secondary)]">
                  Premium Only
                </span>
              </button>

              <button
                type="button" // Prevents accidental form submission
                onClick={() =>
                  setFilters((prev) => ({ ...prev, online: !prev.online }))
                }
                className="flex items-center gap-3 group cursor-pointer bg-transparent border-none outline-none"
              >
                <div
                  className={`w-10 h-5 rounded-full relative transition-all duration-300 ${filters.online ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <div
                    className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${filters.online ? "left-6" : "left-1"}`}
                  />
                </div>
                <span
                  className={`text-sm font-bold transition-colors ${filters.online ? "text-green-600" : "text-[var(--text-secondary)]"}`}
                >
                  Online Now
                </span>
              </button>
            </div>

            {/* RESET BUTTON - ACTIVE STATE */}
            <button
              onClick={resetFilters}
              disabled={!isFilterActive}
              className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                isFilterActive
                  ? "bg-red-500 text-white shadow-lg hover:bg-red-600 cursor-pointer scale-100"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed scale-95 opacity-50"
              }`}
            >
              <RotateCcw
                size={14}
                className={isFilterActive ? "animate-spin-slow" : ""}
              />
              Reset All Filters
            </button>
          </div>
        </section>

        {/* --- GRID SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence>
            {filteredData.slice(0, displayLimit).map((member, index) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/profile/${member.id}`)}
                className="relative h-[420px] cursor-pointer overflow-hidden rounded-[2.5rem] group/card shadow-lg hover:shadow-2xl transition-all border border-gray-100 bg-[var(--bg-card)]"
              >
                <img
                  src={
                    member.profileImages?.[0] ||
                   "https://imgs.search.brave.com/VneMoX7Cl7XDPD7DguYtmdLDfVBIwtaLV6fbnFx77Jc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzU0LzA5LzI3/LzM2MF9GXzEwNTQw/OTI3ODBfbGlPYllR/bzEwUG4yeE9vNENt/R1laTWVXaXcwUDdD/VDIuanBn"
                  }
                  alt={member.fullName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest flex items-center gap-1 bg-[var(--color-primary)] text-white shadow-lg">
                    <ShieldCheck size={12} />{" "}
                    {member.subscription?.plan?.toUpperCase() || "MEMBER"}
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white">
                    <Heart
                      size={16}
                      fill={
                        userData?.likesSent?.includes(member.id)
                          ? "white"
                          : "none"
                      }
                      className={
                        userData?.likesSent?.includes(member.id)
                          ? "text-white"
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold group-hover/card:text-[var(--color-primary)] transition-colors">
                    {member.fullName}, {member.age || "??"}
                  </h3>
                  <p className="text-xs opacity-80 uppercase tracking-widest font-bold text-[var(--color-accent)]">
                    {member.occupation || "Professional"}
                  </p>
                  <p className="text-[10px] opacity-60 mt-1 italic">
                    {member.location?.city || "Location Private"}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-black text-[var(--color-primary)] opacity-0 group-hover/card:opacity-100 translate-y-2 group-hover/card:translate-y-0 transition-all">
                    VIEW PROFILE <ExternalLink size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 bg-white rounded-[3rem] border border-dashed border-gray-100"
          >
            <Search size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-xl font-black text-gray-400 uppercase tracking-tighter">
              No members match your criteria
            </h3>
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="mt-4 text-[var(--color-primary)] font-bold text-xs cursor-pointer hover:underline"
              >
                RESET SEARCH
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FindYourSoulmate;
