



import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ExternalLink, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StartJourneyButton from '../common/StartJourneyButton';


// ✅ Import Firebase & Auth
import { db } from "../../firebase"
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";


const SuccessStories = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the current logged-in user
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------ FETCH REAL PROFILES ------------------
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const usersRef = collection(db, "users");
        
        // Query to get users, but NOT the current logged-in user
        // We limit to 10 for the "Explore" section
        let q = query(usersRef, limit(10));
        
        if (user) {
          q = query(usersRef, where("uid", "!=", user.uid), limit(10));
        }

        const querySnapshot = await getDocs(q);
        const fetchedUsers = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProfiles(fetchedUsers);
      } catch (error) {
        console.error("Error fetching real profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [user]);

  // Duplicate for infinite scroll loop
  const displayStories = profiles.length > 0 ? [...profiles, ...profiles] : [];

  if (loading) return (
    <div className="py-20 text-center text-[var(--text-secondary)] font-bold animate-pulse">
      Discovering Real Connections...
    </div>
  );

  return (
    <section className="py-20 overflow-hidden" style={{ backgroundColor: 'var(--color-primary-2)' }}>
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[var(--fs-h1)] font-[var(--fw-bold)] text-[var(--text-primary)] leading-[1.1] tracking-tighter"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)' }} 
        >
          Explore Real <span className="text-[var(--color-primary)]">Profiles</span>
        </motion.h2>
        
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          className="h-1.5 bg-[var(--color-accent)] mx-auto mt-4 rounded-full"
        />

        <p className="text-[var(--fs-h5)] text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto font-[var(--fw-medium)]">
          Connect with verified members. Your "Soulmate" is just a click away.
        </p>
      </div>

      {/* HORIZONTAL SCROLLING CONTAINER */}
      <div className="flex w-full overflow-hidden relative group">
        <motion.div 
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 35, 
            repeat: Infinity 
          }}
          whileHover={{ transition: { duration: 100 } }} // Slows down on hover
        >
          {displayStories.map((profile, index) => (
            <motion.div
              key={`${profile.id}-${index}`}
              onClick={() => navigate(`/profile/${profile.id}`)}
              className="relative w-[260px] h-[320px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[var(--radius-lg)] shadow-xl group/card"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              {/* Profile Image (Using the first image from array) */}
              <img
                src={profile.profileImages?.[0] || "https://via.placeholder.com/400?text=No+Image"}
                alt={profile.fullName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white">
                <Heart size={16} fill={profile.likesReceived?.length > 0 ? "white" : "none"} />
              </div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white whitespace-normal">
                <h3 className="text-xl font-black leading-tight">
                  {profile.fullName}, <span className="opacity-70">{profile.age || '??'}</span>
                </h3>
                <p className="text-[10px] opacity-80 mt-1 font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  {profile.occupation || "Member"}
                </p>
                <p className="text-[11px] opacity-60 mt-1 line-clamp-1 italic">
                  {profile.location?.city || "Location Private"}
                </p>
                
                <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-white bg-[var(--color-primary)] w-fit px-3 py-1 rounded-full opacity-0 group-hover/card:opacity-100 transition-all translate-y-2 group-hover/card:translate-y-0">
                  VIEW PROFILE <ExternalLink size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 text-center">
         <StartJourneyButton/>
      </div>
    </section>
  );
};

export default SuccessStories;