import styled, { keyframes } from "styled-components";
import { DataUsage } from "@material-ui/icons";
import COLORS from "../static/colors";

const Spinner = () => {
  return (
    <Container>
      <DataUsage />
      <DataUsage fontSize="large" />
    </Container>
  );
};

const rotate = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const rotateReverse = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
`;

const Container = styled.div`
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.white};
  opacity: 0.7;
  overflow: hidden;
  z-index: 9;
  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  & > *:first-child {
    animation: ${rotate} 1s ease-in-out infinite;
    color: ${COLORS.navy};
  }

  & > *:last-child {
    animation: ${rotateReverse} 1s ease-in-out infinite;
    color: ${COLORS.peach};
  }
`;

export default Spinner;
