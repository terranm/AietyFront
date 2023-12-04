import React from "react";

const WhiteButton = (props) => {
  const { width, onClick } = props;
  return (
    <button
      onClick={onClick}
      style={{
        maxWidth: `${width}px`,
        width: "100%",
        height: "48px",
        background: "#fff",
        border: "1px solid #6C5CE7",
        borderRadius: "36px",
        fontSize: "16px",
        color: "#6C5CE7",
        fontWeight: "700",
        display: "block",
      }}
    >
      {props.children}
    </button>
  );
};

export default WhiteButton;
