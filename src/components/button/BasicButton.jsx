import React, { useState } from "react";
import styled from "styled-components";

const BasicButton = ({ width, onClick, disabled }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        maxWidth: `${width}px`,
        width: "100%",
        height: "54px",
        borderRadius: "16px",
        fontSize: "16px",
        color: "#FFFFFF",
        fontWeight: "700",
        display: "block",
        opacity: isHover ? 0.9 : 1,
        transition: ".3s",
      }}
    >
      {props.children}
    </StyledButton>
  );
};

export default BasicButton;

const StyledButton = styled.button`
  background: ${(props) => (props.disabled ? "#fff" : "#3546d1")};
`;
