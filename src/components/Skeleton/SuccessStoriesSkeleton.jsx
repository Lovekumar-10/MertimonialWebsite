// src/components/SuccessStories/SuccessStoriesSkeleton.jsx
import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SuccessStoriesSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-10 py-20 px-4">
      {/* ---------- Header Skeleton ---------- */}
      <div className="flex flex-col items-center gap-3">
        <Skeleton variant="circular" width={48} height={48} />
        <Skeleton variant="text" width={220} height={32} />
        <Skeleton variant="text" width={280} height={20} />
      </div>

      {/* ---------- Horizontal Scroll Cards Skeleton ---------- */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide py-10 w-full">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex-shrink-0 w-[220px] md:w-[280px]">
            <Skeleton
              variant="rectangular"
              width="100%"
              height={300}
              animation="wave"
              className="rounded-2xl"
            />
         
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStoriesSkeleton;