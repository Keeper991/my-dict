import styled from "styled-components";
import COLORS from "../static/colors";

const ButtonSquare = ({
  onClick,
  backgroundColor,
  color,
  children,
  size,
  style,
}) => {
  return (
    <Button
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      size={size}
      style={style}
    >
      {children}
    </Button>
  );
};

const Button = styled.button`
  width: ${(props) => (props.size === "half" ? "45%" : "100%")};
  padding: 1em;
  border: none;
  background-color: ${(props) => props.backgroundColor || COLORS.navy};
  color: ${(props) => props.color || COLORS.white};
  cursor: pointer;
  border-radius: 10px;
  &:active,
  &:focus {
    outline: none;
  }
  ${(props) => props.style}
`;

export default ButtonSquare;
