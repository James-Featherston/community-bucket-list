import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
    </div>
  );
};

export default LoadingPage;
