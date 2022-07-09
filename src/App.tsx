import './App.css';
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Bookshelf from './components/Bookshelf';

const Home = () => {
  return (
    <>
      <Container className="home">
        <Row>
          <Col md={12}>
            <p>いろいろ置く(かもしれない)</p>
            <Link to="/bookshelf">本棚</Link><br />
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

      <div className='component'>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;