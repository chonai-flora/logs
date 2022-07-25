import './App.css';
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Bookshelf from './components/Bookshelf';
import Memo from './components/Memo';

const urls = [
  "https://icy-bush-05a9b0900.1.azurestaticapps.net/",
  "https://purple-river-0a58d6b00.1.azurestaticapps.net/"
];

const Home = () => {
  return (
    <>
      <Container className="home">
        <Row>
          <Col md={12}>
            <p style={{ fontSize: '1.5rem' }}>物置き</p>

            <Link to="/bookshelf">本棚</Link>
            <p>好きな作品とかルーツとか。設営中です。</p>
            <a href={urls[0]}>Sysken Wordle</a>
            <p>レクリエーション用につくったWordleもどきです。</p>
            <a href={urls[1]}>将棋</a>
            <p>p5.jsとReactでつくりました。2人対戦用です。
              王手判定とかいろいろ力技で実装したのでパフォーマンス的にはよくないかも...。</p>
            <Link to="/memo">メモ</Link>
            <p>メモです。</p>
          </Col>
        </Row>
      </Container >
    </>
  );
}

const App = () => {
  return (
    <>
      <Helmet>
        <title>物置き</title>
        <meta name="description" content="いろいろ置く" />
      </Helmet>
      <header>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              物置き
            </Typography>
          </Toolbar>
        </AppBar>
      </header>

      <div className="component">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/memo" element={<Memo />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;