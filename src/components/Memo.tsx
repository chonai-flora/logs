import { For } from "react-loops";
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

const stickies: string[] = [];

const Memo = () => {
    return (
        <>
            <p style={{ fontSize: '1.5rem' }}>メモ</p>
            <p>忘備録とかライブレポとか。</p>
            <For of={stickies}>{(sticky) =>
                <>
                    <Link to={`/memo/${sticky}`}>{sticky}</Link>
                    <br /><br />
                </>
            }</For>
        </>
    );
}

export default Memo;