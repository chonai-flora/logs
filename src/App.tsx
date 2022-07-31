import './App.css';
import { Helmet } from "react-helmet";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookshelf from "./components/Bookshelf";
import Memo from "./components/Memo";
import Article from "./components/Article";
import { stickies } from "./components/Memo";

const urls = [
  "https://icy-bush-05a9b0900.1.azurestaticapps.net/",
  "https://purple-river-0a58d6b00.1.azurestaticapps.net/"
];

const Home = () => {
  return (
    <div className="home">
      <p style={{ fontSize: '1.5rem' }}>物置き</p>
      <Link to="/bookshelf" className="link">本棚</Link>
      <p>好きな作品とかルーツとか。設営中です。</p>
      <a href={urls[0]} className="link">Sysken Wordle</a>
      <p>レクリエーション用につくったWordleもどきです。</p>
      <a href={urls[1]} className="link">将棋</a>
      <p>p5.jsとReactでつくりました。2人対戦用です。
        王手判定とかいろいろ力技で実装したのでパフォーマンス的にはよくないかも...。</p>
      <Link to="/memo" className="link">メモ</Link>
      <p>雑記です。</p>

      <br />
      <p style={{ fontSize: '1.5rem' }}>ライブ等参戦歴</p>
      <ul>
        <li>Perfume 8th Tour 2020 "P Cubed" in Dome<br />
          2020/2/8 福岡 ヤフオク!ドーム</li>
        <li>Reframe THEATER EXPERIMENCE with you - 前夜祭<br />
          2020/9/3 ユナイテッド・シネマ キャナルシティ</li>
        <li>Perfume LIVE 2021 [polygon wave] - ライブ・ビューイング<br />
          2021/8/15 熊本ピカデリー</li>
        <li>Perfume Reframe Tour 2021 - ライブ・ビューイング<br />
          2021/12/18 熊本ピカデリー</li>
        <li>HIGH FIVE 2022<br />
          2022/2/27 Zepp Fukuoka</li>
        <li>Cö shu Nie TOUR 2022 "Flos Ex Machina"<br />
          2022/5/14 B.9 V1</li>
        <li>ネクライトーキー「MEMORIES2」リリースツアー「ゴーゴーメモリーズ！2022 夏」<br />
          2022/7/24 福岡 DRUM Be-1</li>
      </ul>
    </div >
  );
}

const NotFound = () => {
  return (
    <h1>404 - Not found</h1>
  );
}

const App = () => {
  return (
    <div className="app">
      <Helmet>
        <title>物置き</title>
        <meta name="description" content="いろいろ置く" />
      </Helmet>
      <header className="app">
        <a href="/logs" style={{ textDecoration: "none" }}>
          <h2 style={{ fontWeight: "400", textAlign: "center" }}>
            物置き</h2><hr />
        </a>
      </header>

      <div className="component">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/memo" element={<Memo />} />
            {stickies.map((_, index) => {
              const id = String(index + 1).padStart(2, '0');
              return (<Route path={`/memo/${id}`} element={<Article index={index} />} />);
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;