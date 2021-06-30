import styled from "styled-components";
import { withRouter } from "react-router";
import COLORS from "../static/colors";

const Card = ({ id, word, desc, example, history }) => {
  return (
    <Container onClick={() => history.push(`/detail/${id}`)}>
      <Word>{word}</Word>
      <Desc>{desc}</Desc>
      <Example>{example}</Example>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${COLORS.peach};
  padding: 1em;
  color: ${COLORS.white};
  border-radius: 10px;
  & > * {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Word = styled.div`
  color: #202e50;
  font-size: 2rem;
  font-weight: 700;
  white-space: nowrap;
`;

const Desc = styled.p`
  margin: 0;
  font-weight: 100;
  color: ${COLORS.black};
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Example = styled.div`
  color: ${COLORS.lightBlue};
  white-space: nowrap;
`;

export default withRouter(Card);
