
// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth, db } from "../firebase";
// import {
//   doc,
//   setDoc,
//   updateDoc,
//   onSnapshot,
//   serverTimestamp,
//   arrayUnion,
//   arrayRemove,
// } from "firebase/firestore";
// import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hasPaid, setHasPaid] = useState(false);

//   // ------------------ REGISTER ------------------
//   const register = async (name, email, password) => {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password,
//     );
//     const newUser = userCredential.user;

//     const initialData = {
//       uid: newUser.uid,
//       fullName: name,
//       email: newUser.email,
//       profileImages: [],
//       location: { country: "", state: "", city: "" },
//       languages: [],
//       about: "",
//       bio: "",
//       // New Fields added for your project
//       maritalStatus: "",
//       diet: "",
//       smokeDrink: "",
//       physicalStatus: "",
//       dob: "",
//       gothra: "",
//       raasi: "",
//       manglik: "",
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//       likesSent: [],
//       likesReceived: [],
//       blockedUsers: [],
//       profileCompleted: false,
//       subscription: {
//         plan: "Soulmate",
//         startDate: serverTimestamp(),
//         endDate: null,
//         isActive: false,
//         amount: 0,
//       },
//     };

//     await setDoc(doc(db, "users", newUser.uid), initialData);
//     return userCredential;
//   };

//   const login = (email, password) =>
//     signInWithEmailAndPassword(auth, email, password);

//   const logout = async () => {
//     await signOut(auth);
//     setUserData(null);
//   };

//   // Inside your AuthProvider function...
//   const getAllProfiles = async () => {
//     try {
//       const usersRef = collection(db, "users");
//       // Initial fetch of users
//       const q = query(usersRef, orderBy("createdAt", "desc"));
//       const snapshot = await getDocs(q);
//       const profiles = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((p) => p.uid !== user?.uid); // Exclude self
//       return profiles;
//     } catch (error) {
//       console.error("Error fetching profiles:", error);
//       return [];
//     }
//   };

//   // Add this to your AuthProvider in AuthContext.jsx
//   const acceptInterest = async (targetUserId) => {
//     if (!user || !targetUserId) return { success: false };

//     const currentUserRef = doc(db, "users", user.uid);
//     const targetUserRef = doc(db, "users", targetUserId);

//     try {
//       // 1. Add each other to 'matches' array
//       await updateDoc(currentUserRef, {
//         matches: arrayUnion(targetUserId),
//       });

//       await updateDoc(targetUserRef, {
//         matches: arrayUnion(user.uid),
//       });

//       return { success: true };
//     } catch (error) {
//       console.error("Error accepting interest:", error);
//       return { success: false };
//     }
//   };

//   // Remember to add acceptInterest to the 'value' object at the bottom!

//   // ------------------ IMPROVED UPDATE DATA ------------------
//   // This one function now handles text AND images safely
//   const updateProfileData = async (data) => {
//     if (!user) return;
//     const docRef = doc(db, "users", user.uid);
//     // Use spread to update everything passed in
//     await updateDoc(docRef, {
//       ...data,
//       updatedAt: serverTimestamp(),
//     });
//   };

//   // ------------------ LIKE / UNLIKE ------------------
//   // 1. DEFINE THE FUNCTION
//   const toggleLike = async (profileUid) => {
//     if (!user || user.uid === profileUid) return;
//     const docRefCurrent = doc(db, "users", user.uid);
//     const docRefProfile = doc(db, "users", profileUid);

//     const alreadyLiked = userData?.likesSent?.includes(profileUid);

//     try {
//       if (alreadyLiked) {
//         // UNLIKE logic
//         await updateDoc(docRefCurrent, { likesSent: arrayRemove(profileUid) });
//         await updateDoc(docRefProfile, {
//           likesReceived: arrayRemove(user.uid),
//         });
//       } else {
//         // LIKE logic
//         await updateDoc(docRefCurrent, { likesSent: arrayUnion(profileUid) });
//         await updateDoc(docRefProfile, { likesReceived: arrayUnion(user.uid) });
//       }
//     } catch (e) {
//       console.error("Toggle Like Error:", e);
//     }
//   };

//   // ------------------ SEND INTEREST (LIKE) ------------------
//   // Function to handle sending interest/likes
//   const sendInterest = async (targetUserId) => {
//     console.log("🚀 [DEBUG] sendInterest Triggered");
//     console.log("👤 Current User Logged In:", user?.uid);
//     console.log("🎯 Target User (Profile being viewed):", targetUserId);
//     if (!user || !userData) {
//       console.error("User not authenticated");
//       return { success: false, error: "Auth required" };
//     }

//     // References to the sender (current user) and the receiver (target user)
//     const currentUserRef = doc(db, "users", user.uid);
//     const targetUserRef = doc(db, "users", targetUserId);

//     try {
//       // 1. Add targetUserId to current user's 'likesSent' array
//       await updateDoc(currentUserRef, {
//         likesSent: arrayUnion(targetUserId),
//       });

//       // 2. Add current user's UID to target user's 'likesReceived' array
//       // This acts as the "Notification" for the other person
//       await updateDoc(targetUserRef, {
//         likesReceived: arrayUnion(user.uid),
//       });

//       return { success: true };
//     } catch (error) {
//       console.error("Error in sendInterest logic:", error);
//       return { success: false, error: error.message };
//     }
//   };
//   // ------------------ REAL-TIME LISTENER ------------------
//   useEffect(() => {
//     let unsubscribeDoc = () => {};

//     const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);

//       if (currentUser) {
//         // 🔥 REAL-TIME FIX: This listens for changes.
//         // When a picture finishes uploading, this triggers and updates the UI automatically.
//         unsubscribeDoc = onSnapshot(
//           doc(db, "users", currentUser.uid),
//           (snapshot) => {
//             if (snapshot.exists()) {
//               const data = snapshot.data();
//               setUserData(data);
//               setHasPaid(data.subscription?.isActive || false);
//             }
//             setLoading(false);
//           },
//         );
//       } else {
//         setUserData(null);
//         setLoading(false);
//       }
//     });

//     return () => {
//       unsubscribeAuth();
//       unsubscribeDoc();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         userData,
//         loading,
//         register,
//         login,
//         sendInterest,
//         logout,
//         updateProfileData,
//         acceptInterest,
//         toggleLike,
//         getAllProfiles,
//         hasPaid,
//         setHasPaid,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
































import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);

  // ------------------ REGISTER ------------------
  const register = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const newUser = userCredential.user;

    const initialData = {
      uid: newUser.uid,
      fullName: name,
      email: newUser.email,
      profileImages: [],
      location: { country: "", state: "", city: "" },
      languages: [],
      about: "",
      bio: "",
      // New Fields added for your project
      maritalStatus: "",
      diet: "",
      smokeDrink: "",
      physicalStatus: "",
      dob: "",
      gothra: "",
      raasi: "",
      manglik: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likesSent: [],
      likesReceived: [],
      blockedUsers: [],
      profileCompleted: false,
      subscription: {
        plan: "Soulmate",
        startDate: serverTimestamp(),
        endDate: null,
        isActive: false,
        amount: 0,
      },
    };

    await setDoc(doc(db, "users", newUser.uid), initialData);
    return userCredential;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  // Inside your AuthProvider function...
  const getAllProfiles = async () => {
    try {
      const usersRef = collection(db, "users");
      // Initial fetch of users
      const q = query(usersRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const profiles = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((p) => p.uid !== user?.uid); // Exclude self
      return profiles;
    } catch (error) {
      console.error("Error fetching profiles:", error);
      return [];
    }
  };

  // Add this to your AuthProvider in AuthContext.jsx
  const acceptInterest = async (targetUserId) => {
    if (!user || !targetUserId) return { success: false };

    const currentUserRef = doc(db, "users", user.uid);
    const targetUserRef = doc(db, "users", targetUserId);

    try {
      // 1. Add each other to 'matches' array
      await updateDoc(currentUserRef, {
        matches: arrayUnion(targetUserId),
      });

      await updateDoc(targetUserRef, {
        matches: arrayUnion(user.uid),
      });

      return { success: true };
    } catch (error) {
      console.error("Error accepting interest:", error);
      return { success: false };
    }
  };

  // Remember to add acceptInterest to the 'value' object at the bottom!

  // ------------------ IMPROVED UPDATE DATA ------------------
  // This one function now handles text AND images safely
  const updateProfileData = async (data) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    // Use spread to update everything passed in
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  };

  // ------------------ LIKE / UNLIKE ------------------
  // 1. DEFINE THE FUNCTION
  const toggleLike = async (profileUid) => {
    if (!user || user.uid === profileUid) return;
    const docRefCurrent = doc(db, "users", user.uid);
    const docRefProfile = doc(db, "users", profileUid);

    const alreadyLiked = userData?.likesSent?.includes(profileUid);

    try {
      if (alreadyLiked) {
        // UNLIKE logic
        await updateDoc(docRefCurrent, { likesSent: arrayRemove(profileUid) });
        await updateDoc(docRefProfile, {
          likesReceived: arrayRemove(user.uid),
        });
      } else {
        // LIKE logic
        await updateDoc(docRefCurrent, { likesSent: arrayUnion(profileUid) });
        await updateDoc(docRefProfile, { likesReceived: arrayUnion(user.uid) });
      }
    } catch (e) {
      console.error("Toggle Like Error:", e);
    }
  };

  // ------------------ SEND INTEREST (LIKE) ------------------
  // Function to handle sending interest/likes
  const sendInterest = async (targetUserId) => {
    console.log("🚀 [DEBUG] sendInterest Triggered");
    console.log("👤 Current User Logged In:", user?.uid);
    console.log("🎯 Target User (Profile being viewed):", targetUserId);
    if (!user || !userData) {
      console.error("User not authenticated");
      return { success: false, error: "Auth required" };
    }

    // References to the sender (current user) and the receiver (target user)
    const currentUserRef = doc(db, "users", user.uid);
    const targetUserRef = doc(db, "users", targetUserId);

    try {
      // 1. Add targetUserId to current user's 'likesSent' array
      await updateDoc(currentUserRef, {
        likesSent: arrayUnion(targetUserId),
      });

      // 2. Add current user's UID to target user's 'likesReceived' array
      // This acts as the "Notification" for the other person
      await updateDoc(targetUserRef, {
        likesReceived: arrayUnion(user.uid),
      });

      return { success: true };
    } catch (error) {
      console.error("Error in sendInterest logic:", error);
      return { success: false, error: error.message };
    }
  };
  // ------------------ REAL-TIME LISTENER ------------------
  useEffect(() => {
    let unsubscribeDoc = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // 🔥 REAL-TIME FIX: This listens for changes.
        // When a picture finishes uploading, this triggers and updates the UI automatically.
        unsubscribeDoc = onSnapshot(
          doc(db, "users", currentUser.uid),
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              setUserData(data);
              setHasPaid(data.subscription?.isActive || false);
            }
            setLoading(false);
          },
        );
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDoc();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        register,
        login,
        sendInterest,
        logout,
        updateProfileData,
        acceptInterest,
        toggleLike,
        getAllProfiles,
        hasPaid,
        setHasPaid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
