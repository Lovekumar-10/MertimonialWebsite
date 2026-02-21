import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const HeroSectionSkeleton = () => {
  return (
    <Box className="relative min-h-[90vh] flex flex-col lg:flex-row items-center gap-12 py-16 px-20">

      {/* LEFT CONTENT SKELETON */}
      <Box className="flex-1 flex flex-col gap-6">
        {/* Badge Skeleton */}
        <Skeleton
          variant="rectangular"
          width={200}
          height={24}
          sx={{  borderRadius: "9999px" }}
        />

        {/* Headline Skeleton */}
        <Skeleton variant="text" width="80%" height={48}  />

        {/* Paragraph Skeleton */}
        <Skeleton variant="text" width="90%" height={20} />
        <Skeleton variant="text" width="70%" height={20}  />

        {/* Search Bar Skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={60}
          sx={{  borderRadius: "16px" }}
        />

        {/* Badges Skeleton */}
        <Box className="flex gap-4 mt-4">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40}/>
          <Skeleton variant="text" width={120} height={16} />
        </Box>
      </Box>

      {/* RIGHT CONTENT SKELETON */}
      <Box className="flex-1 relative flex items-center justify-center">
        {/* Main Hero Image */}
        <Skeleton
          variant="rectangular"
          width={288}
          height={384}
          sx={{ borderRadius: "16px" }}
        />

        {/* Floating Card 1 */}
        <Skeleton
          variant="rectangular"
          width={150}
          height={60}
          sx={{  borderRadius: "12px", position: "absolute", top: 40, left: 0 }}
        />

        {/* Floating Card 2 */}
        <Skeleton
          variant="rectangular"
          width={160}
          height={70}
          sx={{  borderRadius: "12px", position: "absolute", bottom: 40, right: 0 }}
        />
      </Box>
    </Box>
  );
};

export default HeroSectionSkeleton;