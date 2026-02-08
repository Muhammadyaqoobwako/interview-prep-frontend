import React from "react";
import "./SpinnerLoader.css";

const SpinnerLoader = ({ size = "50px", color = "#3498db" }) => {
  return (
    <div className="spinner-container" style={{ width: size, height: size }}>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          stroke={color}
        />
      </svg>
    </div>
  );
};

export default SpinnerLoader;
