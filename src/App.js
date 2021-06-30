import "./App.css";
import { Switch, Route, withRouter } from "react-router";
import styled from "styled-components";
import CardList from "./pages/CardList";
import CardForm from "./pages/CardForm";
import NotFound from "./pages/NotFound";
import Detail from "./pages/Detail";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import { useEffect, useState } from "react";
import { loadWordDB, increaseWordCount } from "./redux/modules/dict";
import { useDispatch, useSelector } from "react-redux";
import Time from "./components/Time";
import COLORS from "./static/colors";
import {
  BatteryFullRounded,
  Wifi,
  SignalCellularAlt,
} from "@material-ui/icons";

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadWordDB());
  }, [dispatch]);

  const [isSpinning, setIsSpinning] = useState(true);
  setTimeout(() => {
    setIsSpinning(false);
  }, 2000);

  const wordCount = useSelector((state) => state.dict.wordCount);
  const totalWordCount = useSelector((state) => state.dict.nextId) - 1;
  const handleScroll = (e) => {
    if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
      if (wordCount !== totalWordCount) {
        setIsSpinning(true);
        setTimeout(() => {
          dispatch(increaseWordCount());
        }, 1000);
        setTimeout(() => {
          setIsSpinning(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="App">
      <Container>
        <TopWrap>
          <Time />
          <Notch />
          <Icons>
            <SignalCellularAlt style={iconStyle} />
            <Wifi style={iconStyle} />
            <BatteryFullRounded
              style={{ transform: `rotate(90deg) ${iconStyle.transform}` }}
            />
          </Icons>
        </TopWrap>
        <Header />
        <Content onScroll={handleScroll}>
          {isSpinning ? <Spinner /> : null}
          <Switch>
            <Route path="/" component={CardList} exact />
            <Route path="/create" component={CardForm} />
            <Route path="/edit/:id" component={CardForm} />
            <Route path="/detail/:id" component={Detail} />
            <Route component={NotFound} />
          </Switch>
        </Content>
        <HomeBtn onClick={() => props.history.push("/")} />
      </Container>
    </div>
  );
}

const iconStyle = {
  transform: "scale(0.7)",
  marginRight: "-0.3em",
};

const Container = styled.div`
  background-color: ${COLORS.ivory};
  width: 100%;
  height: 100%;
  border-radius: 40px;
  padding: 1em;
  position: relative;
  overflow-y: hidden;
`;

const TopWrap = styled.section`
  display: flex;
  justify-content: space-between;
  height: 1.5em;
  margin-top: -15px;
`;

const Notch = styled.div`
  position: absolute;
  background-color: ${COLORS.white};
  width: 50%;
  height: 1.5em;
  left: 50%;
  transform: translateX(-50%);
  margin-top: -5px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const Icons = styled.span`
  font-size: 0.5rem;
  padding: 0.25em 0.5em;
`;

const Content = styled.section`
  background-color: ${COLORS.white};
  overflow-y: scroll;
  height: 83%;
  border-radius: 25px;
  padding: 1em;
`;

const HomeBtn = styled.button`
  position: absolute;
  width: 40%;
  height: 8px;
  border-radius: 4px;
  border: none;
  bottom: 30px;
  left: 30%;
  cursor: pointer;
  background-color: ${COLORS.gray};
  &:active,
  &:focus {
    outline: none;
  }
  &:active {
    background-color: ${COLORS.darkGray};
  }
`;

export default withRouter(App);
