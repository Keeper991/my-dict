import { withRouter } from "react-router";
import styled from "styled-components";

import COLORS from "../static/colors";

const ButtonCircle = ({ onClick, children }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 50%;
  bottom: 8%;
  right: 8%;
  width: 4em;
  height: 4em;
  border: none;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:active {
    background-color: ${COLORS.navy};
  }
`;

export default withRouter(ButtonCircle);
