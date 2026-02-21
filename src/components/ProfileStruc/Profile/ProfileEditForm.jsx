// // src/components/private/profile/ProfileEditForm.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   Heart, ArrowRight, Trash2, Plus, User, MapPin, Camera, Info,
//   GraduationCap, Briefcase, Languages, Sparkles, Coffee, Moon, Calendar
// } from "lucide-react";
// import { useAuth } from "../../../context/AuthContext";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "../../../firebase";

// const ProfileEditForm = () => {
//   const { user, userData, updateProfileData, updateProfileImages } = useAuth();
//   const [formData, setFormData] = useState({});
//   const [saveStatus, setSaveStatus] = useState("idle");
//   const [uploading, setUploading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userData) setFormData(userData);
//   }, [userData]);

//   if (!user || !userData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
//         <p className="animate-pulse font-bold text-[var(--text-primary)] text-lg">
//           Loading your profile...
//         </p>
//       </div>
//     );
//   }

//   // Handle standard text changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // FIXED: Handle Nested Location Object
//   const handleLocationChange = (e) => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       location: { ...prev.location, city: value }
//     }));
//   };

//   // Handle image file selection
//   const handleImageUpload = async (e) => {
//     if (!e.target.files || e.target.files.length === 0) return;
//     setUploading(true);

//     const file = e.target.files[0];
//     const storageRef = ref(storage, `users/${user.uid}/profileImages/${Date.now()}-${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       null,
//       (error) => {
//         console.error("Upload error:", error);
//         setUploading(false);
//       },
//       async () => {
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//         const newImages = [...(formData.profileImages || []), downloadURL];
//         setFormData((prev) => ({ ...prev, profileImages: newImages }));
//         await updateProfileImages(newImages);
//         setUploading(false);
//       }
//     );
//   };

//   const removeImage = async (index) => {
//     const newImages = [...(formData.profileImages || [])];
//     newImages.splice(index, 1);
//     setFormData((prev) => ({ ...prev, profileImages: newImages }));
//     await updateProfileImages(newImages);
//   };

//   const handleSave = async () => {
//     setSaveStatus("launching");
//     try {
//       await updateProfileData({ ...formData });
//       setSaveStatus("redirecting");
//       setTimeout(() => navigate("/profile"), 800);
//     } catch (err) {
//       console.error("Save error:", err);
//       setSaveStatus("idle");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[var(--bg-main)] selection:bg-[var(--color-primary-2)]">
//       <div className="max-w-6xl mx-auto pt-24 pb-20 px-4 md:px-8">

//         {/* HEADER */}
//         <div className="mb-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
//           <div className="p-5 bg-white rounded-full shadow-lg border-2 border-[var(--color-primary)]">
//             <Heart className="text-[var(--color-accent)] animate-pulse" size={32} fill="currentColor" />
//           </div>
//           <div>
//             <h1 className="font-black uppercase tracking-tighter text-[var(--text-primary)] text-4xl md:text-5xl">
//               Edit <span className="text-[var(--color-primary)]">Profile</span>
//             </h1>
//             <p className="text-[var(--text-secondary)] mt-2">Complete your details to find your perfect match.</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* LEFT COLUMN */}
//           <div className="lg:col-span-8 space-y-8">

//             {/* 1. Identity & Location */}
//             <SectionWrapper title="Identity" icon={<User size={20} />}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <InputField label="Full Name" name="fullName" value={formData.fullName || ""} onChange={handleChange} />
//                 <InputField label="Age" name="age" value={formData.age || ""} onChange={handleChange} />
//                 <InputField label="Height" name="height" value={formData.height || ""} onChange={handleChange} />
//                 <InputField
//                     label="Current City"
//                     name="city"
//                     value={formData.location?.city || ""}
//                     onChange={handleLocationChange}
//                     icon={<MapPin size={14} />}
//                 />
//               </div>
//             </SectionWrapper>

//             {/* 2. Photos */}
//             <SectionWrapper title="Profile Photos" icon={<Camera size={20} />}>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                 {formData.profileImages?.map((img, i) => (
//                   <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-[var(--bg-soft)] group">
//                     <img src={img} alt="profile" className="w-full h-full object-cover" />
//                     <button
//                       onClick={() => removeImage(i)}
//                       className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </div>
//                 ))}
//                 <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-[var(--color-primary)] rounded-xl cursor-pointer hover:bg-[var(--bg-soft)] transition-all">
//                   {uploading ? (
//                     <span className="text-xs font-bold animate-pulse text-[var(--color-primary)]">UPLOADING...</span>
//                   ) : (
//                     <>
//                       <Plus size={24} className="text-[var(--color-primary)] mb-1" />
//                       <span className="text-[10px] font-black uppercase text-[var(--text-light)]">Add Photo</span>
//                     </>
//                   )}
//                   <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
//                 </label>
//               </div>
//             </SectionWrapper>

//             {/* 3. Personal Details & Lifestyle */}
//             <SectionWrapper title="Lifestyle & Details" icon={<Coffee size={20} />}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <InputField label="Marital Status" name="maritalStatus" value={formData.maritalStatus || ""} onChange={handleChange} placeholder="e.g. Never Married" />
//                 <InputField label="Diet" name="diet" value={formData.diet || ""} onChange={handleChange} placeholder="e.g. Vegetarian" />
//                 <InputField label="Smoking / Drinking" name="smokeDrink" value={formData.smokeDrink || ""} onChange={handleChange} />
//                 <InputField label="Physical Status" name="physicalStatus" value={formData.physicalStatus || ""} onChange={handleChange} placeholder="e.g. Normal" />
//               </div>
//             </SectionWrapper>

//             {/* 4. About */}
//             <SectionWrapper title="About You" icon={<Info size={20} />}>
//               <textarea
//                 name="about"
//                 value={formData.about || ""}
//                 onChange={handleChange}
//                 rows={5}
//                 className="w-full p-4 border rounded-xl bg-[var(--bg-main)] font-medium text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] transition-all"
//                 placeholder="Describe your personality, hobbies and what you are looking for in a partner..."
//               />
//             </SectionWrapper>
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="lg:col-span-4 space-y-8">

//             {/* 5. Horoscope & Astro */}
//             <SectionWrapper title="Horoscope" icon={<Moon size={18} />}>
//               <div className="space-y-5">
//                 <InputField label="Date of Birth" name="dob" type="date" value={formData.dob || ""} onChange={handleChange} icon={<Calendar size={14} />} />
//                 <InputField label="Gothra" name="gothra" value={formData.gothra || ""} onChange={handleChange} />
//                 <InputField label="Raasi" name="raasi" value={formData.raasi || ""} onChange={handleChange} />
//                 <InputField label="Manglik Status" name="manglik" value={formData.manglik || ""} onChange={handleChange} placeholder="Yes / No / Partial" />
//               </div>
//             </SectionWrapper>

//             {/* 6. Professional & Background */}
//             <SectionWrapper title="Professional" icon={<GraduationCap size={18} />}>
//               <div className="space-y-5">
//                 <InputField label="Religion" name="religion" value={formData.religion || ""} onChange={handleChange} />
//                 <InputField label="Languages" name="languages" value={formData.languages || ""} onChange={handleChange} icon={<Languages size={14} />} />
//                 <InputField label="Education" name="education" value={formData.education || ""} onChange={handleChange} />
//                 <InputField label="Occupation" name="occupation" value={formData.occupation || ""} onChange={handleChange} icon={<Briefcase size={14} />} />
//                 <InputField label="Income" name="income" value={formData.income || ""} onChange={handleChange} />
//               </div>
//             </SectionWrapper>

//             {/* SAVE ACTION */}
//             <div className="sticky bottom-6 lg:relative lg:bottom-0">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleSave}
//                 disabled={saveStatus !== "idle" || uploading}
//                 className="flex items-center cursor-pointer justify-between w-full px-6 py-5 rounded-2xl bg-[var(--text-primary)] text-white shadow-2xl disabled:opacity-70"
//               >
//                 <div className="flex-1 text-left">
//                   <AnimatePresence mode="wait">
//                     {saveStatus === "redirecting" ? (
//                       <motion.span key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold uppercase text-xs tracking-widest flex items-center gap-2">
//                         Profile Updated! <Sparkles size={16} />
//                       </motion.span>
//                     ) : (
//                       <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-black uppercase tracking-widest text-xs">
//                         Save Changes
//                       </motion.span>
//                     )}
//                   </AnimatePresence>
//                 </div>
//                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
//                   {saveStatus === "redirecting" ? (
//                     <Heart size={20} className="text-[var(--color-accent)]" fill="currentColor" />
//                   ) : (
//                     <ArrowRight size={20} className="text-[var(--color-primary)]" />
//                   )}
//                 </div>
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ------------------ Reusable Components ------------------

// const SectionWrapper = ({ title, icon, children }) => (
//   <div className="p-6 md:p-8 bg-white border border-[var(--bg-soft)] rounded-3xl shadow-sm hover:shadow-md transition-all">
//     <div className="flex items-center gap-3 mb-6 border-b border-[var(--bg-main)] pb-4">
//       <div className="p-2 bg-[var(--bg-soft)] rounded-lg text-[var(--color-primary)]">{icon}</div>
//       <h3 className="font-bold uppercase tracking-wider text-[var(--text-primary)] text-sm">{title}</h3>
//     </div>
//     {children}
//   </div>
// );

// const InputField = ({ label, name, value, onChange, icon, type = "text", placeholder }) => (
//   <div className="flex flex-col gap-1.5">
//     <label className="font-bold text-[10px] text-[var(--text-light)] uppercase tracking-widest flex items-center gap-2 ml-1">
//       {icon} {label}
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="p-3.5 border border-[var(--bg-soft)] rounded-xl bg-[var(--bg-main)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-2)] transition-all text-sm font-medium"
//     />
//   </div>
// );

// export default ProfileEditForm;

// src/components/private/profile/ProfileEditForm.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ArrowRight,
  Trash2,
  Plus,
  User,
  MapPin,
  Camera,
  Info,
  GraduationCap,
  Briefcase,
  Languages,
  Sparkles,
  Coffee,
  Moon,
  Calendar,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";

const ProfileEditForm = () => {
  const { user, userData, updateProfileData, updateProfileImages } = useAuth();
  const [formData, setFormData] = useState({});

  const [saveStatus, setSaveStatus] = useState("idle"); // idle, launching, redirecting
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

  if (!user || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <p className="animate-pulse font-bold text-[var(--text-primary)] text-lg">
          Loading your profile...
        </p>
      </div>
    );
  }

  // Handle standard text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // FIXED: Handle Nested Location Object
  const handleLocationChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, city: value },
    }));
  };

  // Handle image file selection
  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);

    const file = e.target.files[0];
    const storageRef = ref(
      storage,
      `users/${user.uid}/profileImages/${Date.now()}-${file.name}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const newImages = [...(formData.profileImages || []), downloadURL];
        setFormData((prev) => ({ ...prev, profileImages: newImages }));
        await updateProfileImages(newImages);
        setUploading(false);
      },
    );
  };

  const removeImage = async (index) => {
    const newImages = [...(formData.profileImages || [])];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, profileImages: newImages }));
    await updateProfileImages(newImages);
  };

  // const handleSave = async () => {
  //   setSaveStatus("launching");
  //   try {
  //     await updateProfileData({ ...formData });
  //     setSaveStatus("redirecting");
  //     setTimeout(() => navigate("/profile"), 800);
  //   } catch (err) {
  //     console.error("Save error:", err);
  //     setSaveStatus("idle");
  //   }
  // };

  // --- UPDATED SAVE LOGIC TO MATCH ANIMATION FLOW ---
  const handleSave = async () => {
    setSaveStatus("launching");
    try {
      await updateProfileData({ ...formData });

      // Artificial delay to let "Launching" animation show
      setTimeout(() => {
        setSaveStatus("redirecting");
        // Final delay before navigating
        setTimeout(() => navigate("/profile"), 800);
      }, 500);
    } catch (err) {
      console.error("Save error:", err);
      setSaveStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] selection:bg-[var(--color-primary-2)]">
      <div className="max-w-6xl mx-auto pt-24 pb-20 px-4 md:px-8">
        {/* HEADER */}
        <div className="mb-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="p-5 bg-white rounded-full shadow-lg border-2 border-[var(--color-primary)]">
            <Heart
              className="text-[var(--color-accent)] animate-pulse"
              size={32}
              fill="currentColor"
            />
          </div>
          <div>
            <h1 className="font-black uppercase tracking-tighter text-[var(--text-primary)] text-4xl md:text-5xl">
              Edit <span className="text-[var(--color-primary)]">Profile</span>
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              Complete your details to find your perfect match.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Identity & Location */}
            <SectionWrapper title="Identity" icon={<User size={20} />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Age"
                  name="age"
                  value={formData.age || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Height"
                  name="height"
                  value={formData.height || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Current City"
                  name="city"
                  value={formData.location?.city || ""}
                  onChange={handleLocationChange}
                  icon={<MapPin size={14} />}
                />
              </div>
            </SectionWrapper>

            {/* 2. Photos */}
            <SectionWrapper title="Profile Photos" icon={<Camera size={20} />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.profileImages?.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden border-2 border-[var(--bg-soft)] group"
                  >
                    <img
                      src={img}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-[var(--color-primary)] rounded-xl cursor-pointer hover:bg-[var(--bg-soft)] transition-all">
                  {uploading ? (
                    <span className="text-xs font-bold animate-pulse text-[var(--color-primary)]">
                      UPLOADING...
                    </span>
                  ) : (
                    <>
                      <Plus
                        size={24}
                        className="text-[var(--color-primary)] mb-1"
                      />
                      <span className="text-[10px] font-black uppercase text-[var(--text-light)]">
                        Add Photo
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
            </SectionWrapper>

            {/* 3. Personal Details & Lifestyle */}
            <SectionWrapper
              title="Lifestyle & Details"
              icon={<Coffee size={20} />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Marital Status"
                  name="maritalStatus"
                  value={formData.maritalStatus || ""}
                  onChange={handleChange}
                  placeholder="e.g. Never Married"
                />
                <InputField
                  label="Diet"
                  name="diet"
                  value={formData.diet || ""}
                  onChange={handleChange}
                  placeholder="e.g. Vegetarian"
                />
                <InputField
                  label="Smoking / Drinking"
                  name="smokeDrink"
                  value={formData.smokeDrink || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Physical Status"
                  name="physicalStatus"
                  value={formData.physicalStatus || ""}
                  onChange={handleChange}
                  placeholder="e.g. Normal"
                />
              </div>
            </SectionWrapper>

            {/* 4. About */}
            <SectionWrapper title="About You" icon={<Info size={20} />}>
              <textarea
                name="about"
                value={formData.about || ""}
                onChange={handleChange}
                rows={5}
                className="w-full p-4 border rounded-xl bg-[var(--bg-main)] font-medium text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] transition-all"
                placeholder="Describe your personality, hobbies and what you are looking for in a partner..."
              />
            </SectionWrapper>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-8">
            {/* 5. Horoscope & Astro */}
            <SectionWrapper title="Horoscope" icon={<Moon size={18} />}>
              <div className="space-y-5">
                <InputField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob || ""}
                  onChange={handleChange}
                  icon={<Calendar size={14} />}
                />
                <InputField
                  label="Gothra"
                  name="gothra"
                  value={formData.gothra || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Raasi"
                  name="raasi"
                  value={formData.raasi || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Manglik Status"
                  name="manglik"
                  value={formData.manglik || ""}
                  onChange={handleChange}
                  placeholder="Yes / No / Partial"
                />
              </div>
            </SectionWrapper>

            {/* 6. Professional & Background */}
            <SectionWrapper
              title="Professional"
              icon={<GraduationCap size={18} />}
            >
              <div className="space-y-5">
                <InputField
                  label="Religion"
                  name="religion"
                  value={formData.religion || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Languages"
                  name="languages"
                  value={formData.languages || ""}
                  onChange={handleChange}
                  icon={<Languages size={14} />}
                />
                <InputField
                  label="Education"
                  name="education"
                  value={formData.education || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation || ""}
                  onChange={handleChange}
                  icon={<Briefcase size={14} />}
                />
                <InputField
                  label="Income"
                  name="income"
                  value={formData.income || ""}
                  onChange={handleChange}
                />
              </div>
            </SectionWrapper>

            {/* --- TSAVED BUTTON --- */}
            <motion.button
              onClick={handleSave}
              initial="rest"
              whileHover={saveStatus === "idle" ? "hover" : ""}
              animate={saveStatus !== "idle" ? "clicked" : "rest"}
              disabled={saveStatus !== "idle" || uploading}
              className="relative overflow-hidden flex items-center justify-between px-6 py-4 rounded-full border-2 w-full"
              style={{
                borderColor: "var(--color-primary)",
                backgroundColor: "white",
                cursor: saveStatus === "idle" ? "pointer" : "default",
              }}
            >
              {/* BG Animation */}
              <motion.div
                variants={{
                  rest: { x: "-100%" }, // BG hidden left
                  hover: { x: 0 }, // BG slides in
                  clicked: { x: 0 }, // BG fully visible
                }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="absolute inset-0 z-0"
                style={{
                  backgroundColor:
                    saveStatus === "redirecting"
                      ? "var(--color-accent)" // After save, accent background
                      : "var(--color-primary)", // Normal hover
                }}
              />

              {/* Text */}
              <div className="relative z-10 flex-1 text-left">
                <AnimatePresence mode="wait">
                  {saveStatus === "redirecting" ? (
                    <motion.span
                      key="saved-text"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-widest"
                    >
                      Updated! <Sparkles size={14} className="animate-pulse" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="save-text"
                      variants={{
                        rest: { color: "var(--color-primary)" },
                        hover: { color: "#ffffff" },
                        clicked: { color: "var(--color-accent)" },
                      }}
                      className="font-black text-xs uppercase tracking-[0.2em]"
                    >
                      {saveStatus === "launching"
                        ? "Saving..."
                        : "Save Changes"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md overflow-hidden ml-4">
                <AnimatePresence mode="wait">
                  {saveStatus === "redirecting" ? (
                    <motion.div
                      key="heart-icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[var(--color-accent)]"
                    >
                      <Heart size={20} fill="currentColor" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="arrow-icon"
                      animate={
                        saveStatus === "launching"
                          ? { x: 40, opacity: 0 }
                          : { x: 0, opacity: 1 }
                      }
                      transition={{ duration: 0.3 }}
                      style={{ color: "var(--color-primary)" }}
                    >
                      <ArrowRight size={20} strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------ Reusable Components ------------------

const SectionWrapper = ({ title, icon, children }) => (
  <div className="p-6 md:p-8 bg-white border border-[var(--bg-soft)] rounded-3xl shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center gap-3 mb-6 border-b border-[var(--bg-main)] pb-4">
      <div className="p-2 bg-[var(--bg-soft)] rounded-lg text-[var(--color-primary)]">
        {icon}
      </div>
      <h3 className="font-bold uppercase tracking-wider text-[var(--text-primary)] text-sm">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const InputField = ({
  label,
  name,
  value,
  onChange,
  icon,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-bold text-[10px] text-[var(--text-light)] uppercase tracking-widest flex items-center gap-2 ml-1">
      {icon} {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-3.5 border border-[var(--bg-soft)] rounded-xl bg-[var(--bg-main)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-2)] transition-all text-sm font-medium"
    />
  </div>
);

export default ProfileEditForm;
