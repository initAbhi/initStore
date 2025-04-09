import React from "react";
import "./Loader.css";

const Loader = ({ color = "#000000", glow = "#6b6b6b" }) => {
    return (
      <div className="relative w-20 h-12">
        <span className="absolute top-0 text-sm text-[black] animate-loader-text tracking-[1px]">
          Loading
        </span>
        <span
          className="loader-ball"
          style={{
            backgroundColor: color,
          }}
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: glow,
              animation: "loader-ball-inner 3.5s ease both infinite",
            }}
          />
        </span>
      </div>
    );
  };
  

export default Loader;
// text-[#c8b6ff]