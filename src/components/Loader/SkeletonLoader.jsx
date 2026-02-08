import React from "react";

const SkeletonLine = ({ width = "100%", height = "12px" }) => (
  <div
    className="w-full rounded-md bg-slate-200/80 dark:bg-slate-700/60 animate-pulse"
    style={{ width, height }}
  />
);

const SkeletonLoader = ({
  rows = 5,
  gap = "10px",
  title = true,
  titleWidth = "60%",
  lineHeight = "12px",
  className = "",
}) => {
  const rowItems = Array.from({ length: rows });

  return (
    <div className={`w-full ${className}`} style={{ display: "grid", gap }}>
      {title && <SkeletonLine width={titleWidth} height="16px" />}
      {rowItems.map((_, idx) => (
        <SkeletonLine key={idx} height={lineHeight} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
