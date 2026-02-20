// import React from "react";
// import { motion } from "framer-motion";
// import { Heart, ExternalLink, ShieldCheck } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const FeaturedProfiles = () => {
//   const navigate = useNavigate();
//   // const handleRedirect = (id) => {
//   //   window.location.href = `/profile/${id}`;
//   // };
//   //   const handleRedirect = (userId) => {
//   //   // Navigate to /profile and pass userId as a query or state
//   //   navigate(`/profile`, { state: { userId } });
//   // };

//   // Generating 20 users with the detailed format you requested
//   const users = Array.from({ length: 20 }, (_, i) => ({
//     id: i + 1,
//     name: i % 2 === 0 ? "Arjun & Sneha" : "Rahul & Anjali", // Using couple-style naming if preferred
//     role: i % 2 === 0 ? "Data Scientist & Artist" : "Engineer & Architect",
//     tag: i % 4 === 0 ? "GOLD" : "VIP",
//     img: `https://i.pravatar.cc/500?u=${i + 100}`,
//     isOnline: true,
//   }));

//   return (
//     <section
//       className="py-20  pt-10 overflow-hidden"
//       style={{ backgroundColor: "var(--bg-main)" }}
//     >
//       <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="font-[var(--fw-bold)] text-[var(--text-primary)] leading-[1.1] tracking-tighter"
//           style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
//         >
//           Featured <span className="text-[var(--color-primary)]">Members</span>
//         </motion.h2>

//         <motion.div
//           initial={{ width: 0 }}
//           whileInView={{ width: "80px" }}
//           className="h-1.5 mx-auto mt-4 rounded-full"
//           style={{ backgroundColor: "var(--color-primary)" }}
//         />

//         <p className="text-[var(--fs-h5)] text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto font-[var(--fw-medium)]">
//           Connect with high-achieving professionals and creative souls.
//         </p>
//       </div>

//       {/* DYNAMIC GRID - 20 Users */}
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {users.map((user, index) => (
//             <motion.div
//               key={user.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: (index % 4) * 0.1 }}
//               viewport={{ once: true }}
//               onClick={() => navigate(`/profile/${user.id}`)}
//               // onClick={() => handleRedirect(user.id)}
//               className="relative h-[380px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[var(--radius-lg)] group/card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all border border-[var(--border)]"
//               style={{ backgroundColor: "var(--bg-card)" }}
//             >
//               {/* Background Image with Zoom Effect */}
//               <motion.img
//                 src={user.img}
//                 alt={user.name}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
//               />

//               {/* Overlay Gradient (Matches Success Stories) */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

//               {/* Top Floating Badge (Status & Tag) */}
//               <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
//                 {/* Gold/VIP Badge - Styled like your requested detail */}
//                 <div
//                   className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest flex items-center gap-1 shadow-lg"
//                   style={{
//                     backgroundColor:
//                       user.tag === "GOLD" ? "#EAB308" : "var(--color-primary)",
//                     color: "#fff",
//                   }}
//                 >
//                   <ShieldCheck size={12} /> {user.tag}
//                 </div>

//                 {/* Heart/Live Indicator */}
//                 <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white">
//                   <Heart
//                     size={16}
//                     fill={user.isOnline ? "white" : "none"}
//                     className={user.isOnline ? "animate-pulse" : ""}
//                   />
//                 </div>
//               </div>

//               {/* Bottom Text Content (Card Details) */}
//               <div className="absolute bottom-0 left-0 right-0 p-6 text-white whitespace-normal">
//                 <h3 className="text-[var(--fs-h5)] font-[var(--fw-bold)] leading-tight group-hover/card:text-[var(--color-primary)] transition-colors">
//                   {user.name}
//                 </h3>
//                 <p className="text-[var(--fs-caption)] opacity-80 mt-1 font-[var(--fw-medium)] uppercase tracking-wider">
//                   {user.role}
//                 </p>

//                 {/* Hover Reveal Action */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   whileHover={{ opacity: 1, y: 0 }}
//                   className="mt-4 flex items-center gap-2 text-[var(--fs-small)] font-[var(--fw-bold)]"
//                   style={{ color: "var(--color-primary)" }}
//                 >
//                   Connect Now <ExternalLink size={14} />
//                 </motion.div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Capsule CTA */}
//       <div className="mt-20 text-center">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => (window.location.href = "/register")}
//           className="px-12 py-5 rounded-full font-black text-lg shadow-2xl cursor-pointer uppercase tracking-tighter"
//           style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
//         >
//           View All Members
//         </motion.button>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProfiles;







import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ExternalLink, ShieldCheck, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
// ✅ Import real logic
import { db } from "../../firebase";
import { collection, query, limit, getDocs, where, startAfter } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const FeaturedProfiles = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null); // For Pagination (Load More)
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // ------------------ FETCH INITIAL DATA ------------------
  const fetchMembers = async (isLoadMore = false) => {
    if (isLoadMore) setIsFetchingMore(true);
    else setLoading(true);

    try {
      const usersRef = collection(db, "users");
      let q;

      if (isLoadMore && lastDoc) {
        // Fetch next 8 users
        q = query(usersRef, startAfter(lastDoc), limit(8));
      } else {
        // Initial fetch of 8 users
        q = query(usersRef, limit(8));
      }

      const snapshot = await getDocs(q);
      
      const newMembers = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        // Filter out the current logged-in user
        .filter(m => m.uid !== currentUser?.uid);

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      
      if (isLoadMore) {
        setMembers(prev => [...prev, ...newMembers]);
      } else {
        setMembers(newMembers);
      }
    } catch (error) {
      console.error("Error fetching featured members:", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [currentUser]);

  return (
    <section className="py-20 pt-10 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[var(--fw-bold)] text-[var(--text-primary)] leading-[1.1] tracking-tighter text-5xl md:text-6xl"
        >
          Featured <span className="text-[var(--color-primary)]">Members</span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          className="h-1.5 mx-auto mt-4 rounded-full bg-[var(--color-primary)]"
        />

        <p className="text-[var(--fs-h5)] text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto font-[var(--fw-medium)]">
          Connect with high-achieving professionals and creative souls from our real community.
        </p>
      </div>

      {/* DYNAMIC GRID */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[var(--color-primary)]" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index % 4) * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/profile/${member.id}`)}
                className="relative h-[400px] cursor-pointer overflow-hidden rounded-[var(--radius-lg)] group/card shadow-lg hover:shadow-2xl transition-all border border-[var(--border)] bg-[var(--bg-card)]"
              >
                {/* Background Image */}
                <img
                  src={member.profileImages?.[0] || "https://via.placeholder.com/500?text=No+Photo"}
                  alt={member.fullName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest flex items-center gap-1 shadow-lg bg-[var(--color-primary)] text-white">
                    <ShieldCheck size={12} /> {member.subscription?.plan?.toUpperCase() || "MEMBER"}
                  </div>

                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white">
                    <Heart size={16} fill={member.likesReceived?.length > 0 ? "white" : "none"} />
                  </div>
                </div>

                {/* Card Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold group-hover/card:text-[var(--color-primary)] transition-colors">
                    {member.fullName}
                  </h3>
                  <p className="text-xs opacity-80 uppercase tracking-widest font-bold text-[var(--color-accent)]">
                    {member.occupation || "Professional"}
                  </p>
                  <p className="text-[10px] opacity-60 mt-1 italic">
                    {member.location?.city || "Location Private"}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 text-xs font-black text-[var(--color-primary)]"
                  >
                    VIEW PROFILE <ExternalLink size={14} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* VIEW MORE / LOAD MORE CTA */}
      <div className="mt-20 text-center">
        {lastDoc && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchMembers(true)}
            disabled={isFetchingMore}
            className="px-12 py-5 rounded-full font-black text-lg shadow-2xl uppercase tracking-tighter bg-[var(--color-primary)] text-white disabled:opacity-50 flex items-center gap-3 mx-auto"
          >
            {isFetchingMore ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Loading...
              </>
            ) : (
              "Explore More Members"
            )}
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default FeaturedProfiles;