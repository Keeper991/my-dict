import styled from "styled-components";
import { withRouter } from "react-router";
import { ArrowBackIosRounded } from "@material-ui/icons";
import COLORS from "../static/colors";

const Header = (props) => {
  const pageName = props.location.pathname.split("/")[1];
  const TitleDict = {
    create: "Add Word",
    edit: "Edit Word",
    detail: "Detail",
  };

  return (
    <Container>
      {pageName === "create" || pageName === "detail" || pageName === "edit" ? (
        <BackBtn onClick={() => props.history.goBack()}>
          <ArrowBackIosRounded style={{ color: `${COLORS.navy}` }} />
        </BackBtn>
      ) : null}
      <Title>{TitleDict[pageName] || "My Dictionary"}</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-family: "Abril Fatface", cursive;
  color: ${COLORS.navy};
`;

const BackBtn = styled.button`
  margin-top: 2.5em;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export default withRouter(Header);
