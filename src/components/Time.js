import { useState } from "react";
import styled from "styled-components";

const Time = () => {
  const [time, setTime] = useState("");

  setInterval(() => {
    setTime(Date().toString().split(" ")[4].slice(0, 5));
  }, 1000);

  return <Container>{time}</Container>;
};

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.5em;
  margin-top: 0.4em;
  font-size: 0.7rem;
  font-weight: 700;
`;

export default Time;
