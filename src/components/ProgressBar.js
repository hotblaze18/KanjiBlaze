import React from "react";

const ProgressBar = (props) => {
  const { height, fillerBg, containerBg, completed, total, radius, text, tooltip } = props;
  console.log(completed, total);
  let percent = Math.ceil(((completed / total) * 100));
  if(percent < 4) {
    percent = 4;
  }
  
  let content

  if(text) {
    content = text.content.replace("#completed", completed);
    content = content.replace("#total", total)
  }

  const containerStyles = {
    position: "relative",
    height: `${height}px`,
    width: "100%",
    borderRadius: radius,
    backgroundColor: containerBg,
  };

  const fillerStyles = {
    height: "100%",
    width: `${percent}%`,
    backgroundColor: fillerBg,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const textStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: text ? text.color : "",
  }

  return (
    <div className="progress" style={containerStyles}>
      <div className="bar" style={fillerStyles}>
      { text ? <p style={textStyles}>{content}</p> : "" }
      {tooltip ? <span><b>{completed}</b> / {total}</span> : ""}
      </div>
    </div>
  );
};

export default ProgressBar;
