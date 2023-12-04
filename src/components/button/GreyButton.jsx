import React from "react";

const GreyButton = (props) => {
  const { width, onClick, radius, font } = props;
  return (
    <button
      onClick={onClick}
      style={{
        maxWidth: `${width}px`,
        width: "100%",
        height: "48px",
        background: "transparent",
        border: "1px solid #666",
        borderRadius: `${radius ? radius : 36}px`,
        fontSize: "16px",
        color: "#666",
        fontWeight: `${font ? font : 700}`,
        display: "block",
      }}
    >
      {props.children}
    </button>
  );
};

export default GreyButton;
