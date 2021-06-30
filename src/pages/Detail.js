import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "./NotFound";
import { removeWordDB } from "../redux/modules/dict";
import Spinner from "../components/Spinner";
import Button from "../components/ButtonSquare";
import COLORS from "../static/colors";

const Detail = (props) => {
  const id = props.match.params.id;
  const words = useSelector((state) => state.dict.words);
  const isLoaded = useSelector((state) => state.dict.isLoaded);
  const word = words.find((w) => w.id === parseInt(id));
  const dispatch = useDispatch();

  const handleDelBtn = () => {
    dispatch(removeWordDB(word.docId));
    props.history.push("/");
  };

  if (!word && isLoaded) {
    return <NotFound />;
  }

  return (
    <>
      {!isLoaded ? (
        <Spinner />
      ) : (
        <Container>
          <Wrap>
            <Label htmlFor="word-content">Word</Label>
            <Content id="word-content">{word.word}</Content>
          </Wrap>
          <Wrap>
            <Label htmlFor="desc-content">Description</Label>
            <Content id="desc-content">{word.desc}</Content>
          </Wrap>
          <Wrap>
            <Label htmlFor="example-content">Example</Label>
            <Content id="example-content">{word.example}</Content>
          </Wrap>
          <BtnWrap>
            <Button
              backgroundColor={COLORS.blue}
              onClick={() => props.history.push(`/edit/${id}`)}
              size="half"
            >
              Edit
            </Button>
            <Button onClick={handleDelBtn} size="half">
              Delete
            </Button>
          </BtnWrap>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 1em;
  }
  #word-content {
    font-weight: 700;
  }
`;

const Wrap = styled.div`
  background-color: ${COLORS.peach};
  padding: 1em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 100;
  margin-bottom: 0.5em;
`;

const Content = styled.div``;

const BtnWrap = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Detail;
