import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import NotFound from "./NotFound";
import { addWordDB, editWordDB } from "../redux/modules/dict";
import Spinner from "../components/Spinner";
import Button from "../components/ButtonSquare";
import COLORS from "../static/colors";

const CardForm = (props) => {
  const pageName = props.match.path === "/create" ? "Add" : "Edit";
  const id = parseInt(props.match.params.id);
  const words = useSelector((state) => state.dict.words);
  const isLoaded = useSelector((state) => state.dict.isLoaded);
  const dispatch = useDispatch();
  const wordRef = useRef();
  const descRef = useRef();
  const exampleRef = useRef();
  const docId = useRef("");
  const createdAt = useRef({});
  const updatedAt = useRef({});

  useEffect(() => {
    if (pageName === "Edit") {
      const findedWord = words.find((w) => w.id === parseInt(id));
      if (!findedWord) {
        return <NotFound />;
      }
      wordRef.current.value = findedWord.word;
      descRef.current.value = findedWord.desc;
      exampleRef.current.value = findedWord.example;
      docId.current = findedWord.docId;
      createdAt.current = findedWord.createdAt;
      updatedAt.current = findedWord.updatedAt;
    }
  }, [id, pageName, words]);

  const handleBtn = () => {
    const data = {
      word: wordRef.current.value,
      desc: descRef.current.value,
      example: exampleRef.current.value,
    };
    if (pageName === "Edit") {
      dispatch(
        editWordDB({
          id: id,
          docId: docId.current,
          createdAt: createdAt.current,
          updatedAt: updatedAt.current,
          ...data,
        })
      );
      props.history.push(`/detail/${id}`);
    } else {
      dispatch(addWordDB(data));
      props.history.push("/");
    }
  };

  return (
    <>
      {!isLoaded ? (
        <Spinner />
      ) : (
        <Container>
          <Wrap>
            <Label htmlFor="word-input">Word</Label>
            <Input id="word-input" ref={wordRef} />
          </Wrap>
          <Wrap>
            <Label htmlFor="desc-input">Desc</Label>
            <InputArea id="desc-input" ref={descRef} />
          </Wrap>
          <Wrap>
            <Label htmlFor="example-input">Example</Label>
            <Input id="example-input" ref={exampleRef} />
          </Wrap>
          <Button onClick={handleBtn} style={{ marginTop: "1.5em" }}>
            {pageName}
          </Button>
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

const Input = styled.input`
  border: none;
  border-radius: 5px;
  padding: 0.5em;
  &:focus {
    outline: none;
  }
`;

const InputArea = styled.textarea`
  resize: none;
  height: 5em;
  border: none;
  border-radius: 5px;
  padding: 0.5em;
  &:focus {
    outline: none;
  }
`;

export default CardForm;
