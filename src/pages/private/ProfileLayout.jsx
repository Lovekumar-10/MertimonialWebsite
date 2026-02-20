
// // src/pages/private/ProfileLayout.jsx
// import React from "react";
// import { Outlet } from "react-router-dom";

// const ProfileLayout = () => {
//   return (
//     <div className="min-h-screen bg-[var(--bg-main)] p-2 md:p-3">
//       <div className="max-w-7xl mx-auto">
       

//         {/* Outlet will render either ProfilePreview or ProfileEditForm */}
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default ProfileLayout;



import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProfileLayout = () => {
  const { userData, user } = useAuth();

  if (!user || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <p className="animate-pulse font-bold text-[var(--text-primary)]">
          Loading Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* This Outlet will render either ProfilePreview or ProfileEditForm */}
        <Outlet context={{ userData }} />
      </div>
    </div>
  );
};

export default ProfileLayout;