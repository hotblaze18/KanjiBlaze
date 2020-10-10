import React from "react";

const ProgressBar = (props) => {
  const { height, fillerBg, containerBg, completed, total } = props;
  console.log(completed, total);
  const percent = Math.ceil((completed / total) * 100);
  console.log(percent);

  const containerStyles = {
    postion: "relative",
    height: `${height}px`,
    width: "100%",
    backgroundColor: containerBg,
  };

  const fillerStyles = {
    height: "100%",
    width: `${percent}%`,
    backgroundColor: fillerBg,
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
