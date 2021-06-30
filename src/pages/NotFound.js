import styled from "styled-components";
import COLORS from "../static/colors";

const NotFound = () => {
  return (
    <Container>
      <Title>NotFound</Title>
      <Line />
      <Desc>Please press the home button below.</Desc>
    </Container>
  );
};

const Container = styled.section``;

const Title = styled.h1``;

const Line = styled.hr`
  border: 0.5px solid ${COLORS.gray};
`;

const Desc = styled.p``;

export default NotFound;
