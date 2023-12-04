import React from "react";

const GreyFillButton = (props) => {
  const { width, onClick, radius, font } = props;
  return (
    <button
      onClick={onClick}
      style={{
        maxWidth: `${width}px`,
        width: "100%",
        height: "48px",
        background: "#666",
        border: "1px solid #666",
        borderRadius: `${radius ? radius : 36}px`,
        fontSize: "16px",
        color: "#fff",
        fontWeight: `${font ? font : 700}`,
        display: "block",
      }}
    >
      {props.children}
    </button>
  );
};

export default GreyFillButton;
