import React from "react";

const LightGreyButton = (props) => {
  const { width, onClick, radius, font } = props;
  return (
    <button
      onClick={onClick}
      style={{
        maxWidth: `${width}px`,
        width: "100%",
        height: "48px",
        background: "#D9D9D9",
        border: "1px solid #D9D9D9",
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

export default LightGreyButton;
