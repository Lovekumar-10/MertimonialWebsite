

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StartJourneyButton from "../common/StartJourneyButton";
import { HeartHandshake } from "lucide-react";

import SuccessStoriesSkeleton from "../Skeleton/SuccessStoriesSkeleton"; // adjust path if needed
import { db } from "../../firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const SuccessStories = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, limit(10));
        const querySnapshot = await getDocs(q);
        const fetchedUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfiles(fetchedUsers);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [user]);

  const displayStories = [...profiles, ...profiles];


  if (loading) return <SuccessStoriesSkeleton />;

  return (
    <section className="py-20 overflow-hidden bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-4"
        >
         <HeartHandshake className="text-[var(--color-primary)]" size={48} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[var(--fw-bold)] text-[var(--text-primary)] leading-[1.1] tracking-tighter"
          style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
        >
          Love Link{" "}
          <span className="text-[var(--color-primary)]">Success Stories</span>
        </motion.h2>

        <p className="text-[var(--fs-h5)] text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto italic">
          "Celebrating the best Jodis who found their perfect match through our
          community."
        </p>
      </div>
      {/* PAUSE ON HOVER CONTAINER */}
      <div className="flex w-full overflow-visible relative py-10">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          // This line stops the movement when any card in the list is hovered
          whileHover={{ animationPlayState: "paused" }}
        >
          {displayStories.map((profile, index) => (
            <motion.div
              key={`${profile.id}-${index}`}
              onClick={() => navigate(`/profile/${profile.id}`)}
              // THE COOL HOVER EFFECT
              whileHover={{
                // Responsive scale: smaller on mobile (sm:), larger on desktop
                scale: window.innerWidth < 768 ? 1.05 : 1.15,
                zIndex: 50,
                y: -10,
                // Red glowing shadow effect
                boxShadow: "0px 10px 30px rgba(252, 117, 117, 0.66)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              // Responsive Width & Height: smaller for phones (w-[220px]), original for desktop (md:w-[280px])
              className="relative w-[220px] h-[300px] md:w-[280px] md:h-[380px] flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-white/10 group"
              style={{
                backgroundColor: "var(--bg-card)",
              }}
            >
              {/* Profile Image */}
              <img
                src={
                  profile.profileImages?.[0] ||
                  "https://imgs.search.brave.com/VneMoX7Cl7XDPD7DguYtmdLDfVBIwtaLV6fbnFx77Jc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzU0LzA5LzI3/LzM2MF9GXzEwNTQw/OTI3ODBfbGlPYllR/bzEwUG4yeE9vNENt/R1laTWVXaXcwUDdD/VDIuanBn"
                }
                alt={profile.fullName}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Corner Tag - Scaled for Mobile */}
              <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-tl-xl z-20">
                <div className="absolute top-4 -left-10 md:top-6 md:-left-8 w-32 md:w-40 py-1 bg-[var(--color-primary)] text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest text-center -rotate-45 shadow-lg flex items-center justify-center gap-1">
                  <Star size={10} fill="white" /> BEST JODI
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

              {/* Content Box */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white whitespace-normal">
                <h3 className="text-lg md:text-xl font-black mb-1">
                  {profile.fullName}
                </h3>

                <div className="flex flex-col gap-1">
                  <p className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                    <Briefcase size={10} />{" "}
                    {profile.occupation || "Professional"}
                  </p>
                  <p className="flex items-center gap-1.5 text-[10px] md:text-[11px] opacity-70 italic">
                    <MapPin size={10} />{" "}
                    {profile.location?.city || "Location Private"}
                  </p>
                </div>

                {/* View Profile Button - Shows on group hover */}
                <div className="mt-3 md:mt-5 flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  View Profile <ExternalLink size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-12">
        <StartJourneyButton />
      </div>
    </section>
  );
};

export default SuccessStories;
