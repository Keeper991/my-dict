import styled from "styled-components";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import CreateButton from "../components/ButtonCircle";
import Spinner from "../components/Spinner";
import { Add } from "@material-ui/icons";

const CardList = (props) => {
  const count = useSelector((state) => state.dict.wordCount);
  const data = useSelector((state) => state.dict.words);
  const words = data.slice(0, count);
  const isLoaded = useSelector((state) => state.dict.isLoaded);
  const handleCreateBtn = () => props.history.push("/create");
  return (
    <>
      {!isLoaded ? (
        <Spinner />
      ) : (
        <>
          <Container>
            {words.map((w) => {
              return (
                <Card
                  key={w.id}
                  id={w.id}
                  word={w.word}
                  desc={w.desc}
                  example={w.example}
                  updatedAt={w.updatedAt}
                  createdAt={w.createdAt}
                />
              );
            })}
          </Container>
          <CreateButton onClick={handleCreateBtn}>
            <Add fontSize="large" />
          </CreateButton>
        </>
      )}
    </>
  );
};

const Container = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 1em;
  }
`;

export default CardList;
