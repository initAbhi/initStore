import React from "react";

const SkeletonCard = () => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm animate-pulse">
      <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-3 bg-gray-200 rounded"></div>
        <div className="w-20 h-3 bg-gray-200 rounded"></div>
      </div>
      <div className="w-12 h-4 bg-gray-200 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
