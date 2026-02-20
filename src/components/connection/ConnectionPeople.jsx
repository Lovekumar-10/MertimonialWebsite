

// src/components/private/profile/ConnectionPage.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  User,
  MapPin,
  Search,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ConnectionPage = () => {
  // Pulling userData and loading from AuthContext
  // NEW UPDATED LINE
  const { userData, loading: authLoading, acceptInterest } = useAuth();
  const [receivedInterests, setReceivedInterests] = useState([]);
  const [filteredInterests, setFilteredInterests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [showMatchAnim, setShowMatchAnim] = useState(false);
  const [matchedName, setMatchedName] = useState("");

  const navigate = useNavigate();

  // This is your live badge count
  const interestCount = userData?.likesReceived?.length || 0;

  useEffect(() => {
    const fetchInterestedUsers = async () => {
      // 1. Safety Check: If there are no likes in the array, stop here
      if (!userData?.likesReceived || userData.likesReceived.length === 0) {
        setReceivedInterests([]);
        setFilteredInterests([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const usersRef = collection(db, "users");

        // 2. We use the 'uid' field to find the people who liked you
        // Note: 'in' query supports up to 30 IDs
        const q = query(usersRef, where("uid", "in", userData.likesReceived));
        const snapshot = await getDocs(q);

        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReceivedInterests(users);
        setFilteredInterests(users);
      } catch (error) {
        console.error("Error fetching connections:", error);
      } finally {
        setLoading(false);
      }
    };

    // 🔥 This is the fix: We re-run this whenever userData changes
    if (!authLoading) {
      fetchInterestedUsers();
    }
  }, [userData?.likesReceived, authLoading]); // Dependency on the specific array

  // Handle Search Filtering
  useEffect(() => {
    const filtered = receivedInterests.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.occupation?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredInterests(filtered);
  }, [searchQuery, receivedInterests]);

  const handleAccept = async (profile) => {
    const result = await acceptInterest(profile.id);

    if (result.success) {
      setMatchedName(profile.fullName);
      setShowMatchAnim(true);
      // Play a "ding" sound here if you have one!
      setTimeout(() => setShowMatchAnim(false), 3000); // Hide after 3 seconds
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="relative p-3 bg-white rounded-2xl shadow-lg border border-[var(--border)]">
                <Heart
                  className="text-[var(--color-primary)]"
                  fill="currentColor"
                  size={28}
                />
                <AnimatePresence>
                  {interestCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-[var(--bg-main)]"
                    >
                      {interestCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase leading-none">
                Received{" "}
                <span className="text-[var(--color-primary)]">Interests</span>
              </h1>
            </motion.div>
            <p className="text-sm text-[var(--text-secondary)] font-bold flex items-center gap-2 uppercase tracking-widest">
              <Sparkles size={16} className="text-[var(--color-accent)]" />
              {interestCount} souls are waiting for your response
            </p>
          </div>

          {/* SEARCH BAR */}
          {receivedInterests.length > 0 && (
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-[var(--border)] rounded-full outline-none focus:border-[var(--color-primary)] transition-all shadow-sm"
              />
            </div>
          )}
        </div>

        {/* CONTENT GRID */}
        {filteredInterests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInterests.map((profile, index) => {
              // 1. Check if both people liked each other
              const isMatch = userData?.matches?.includes(profile.id);

              // 2. Check if you sent interest but they haven't liked back yet
              const isSentByMe = userData?.likesSent?.includes(profile.id);

              // 3. Check if they liked you (Received)
              const isReceived = userData?.likesReceived?.includes(profile.id);

              return (
                <motion.div
                  key={profile.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[var(--border)]"
                >
                  {/* NOTIFICATION BADGE */}
                  {/* NOTIFICATION BADGE */}
                  <div className="absolute top-4 left-4 z-20">
                    <div
                      className={`text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-2 uppercase tracking-tighter ${
                        isMatch
                          ? "bg-green-500"
                          : isSentByMe && !isMatch
                            ? "bg-blue-500"
                            : "bg-[var(--color-primary)]"
                      }`}
                    >
                      {isMatch ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Sparkles size={12} />
                      )}
                      {isMatch
                        ? "Mutual Friend"
                        : isSentByMe
                          ? "Pending Request"
                          : "New Interest"}
                    </div>
                  </div>
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={
                        profile.profileImages?.[0] ||
                        "https://via.placeholder.com/400"
                      }
                      alt={profile.fullName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <h3 className="text-xl font-black">
                        {profile.fullName},{" "}
                        <span className="opacity-70">{profile.age}</span>
                      </h3>
                      <p className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 opacity-80">
                        <MapPin size={10} />{" "}
                        {profile.location?.city || "Nearby"}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/profile/${profile.id}`)}
                        className="..."
                      >
                        View Profile
                      </button>

                      {/* DYNAMIC BUTTON LOGIC */}
                      <button
                        onClick={() =>
                          isMatch
                            ? navigate(`/chat/${profile.id}`)
                            : handleAccept(profile)
                        }
                        className={`flex-1 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg transition-all ${
                          isMatch
                            ? "bg-black"
                            : "bg-[var(--color-primary)] hover:bg-pink-600"
                        }`}
                      >
                        {isMatch ? "Message Friend" : "Accept Interest"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <AnimatePresence>
              {showMatchAnim && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="text-center"
                  >
                    <Sparkles
                      className="text-yellow-400 mx-auto mb-4"
                      size={60}
                    />
                    <h2 className="text-white text-5xl font-black uppercase tracking-tighter">
                      It's a Match!
                    </h2>
                    <p className="text-pink-200 text-xl mt-2 font-medium">
                      You and {matchedName} are now connected.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                      <Heart
                        className="text-[var(--color-primary)] animate-bounce"
                        fill="currentColor"
                        size={40}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState navigate={navigate} searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ navigate, searchQuery }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-32 bg-white rounded-[2rem] border-2 border-dashed border-[var(--border)]"
  >
    <Heart
      size={64}
      className="mx-auto text-[var(--color-primary)] mb-6 opacity-20"
    />
    <h3 className="text-2xl font-black text-[var(--text-primary)]">
      {searchQuery ? "No matches found" : "No interests yet"}
    </h3>
    <p className="text-[var(--text-secondary)] mt-2 mb-8 max-w-xs mx-auto">
      {searchQuery
        ? "Try a different search term."
        : "Once people show interest in your profile, they will appear here instantly."}
    </p>
    <button
      onClick={() => navigate("/")}
      className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-full font-black uppercase text-[10px] tracking-widest shadow-xl hover:opacity-90"
    >
      Browse Profiles
    </button>
  </motion.div>
);

export default ConnectionPage;
