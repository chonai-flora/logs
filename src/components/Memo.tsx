import { For } from "react-loops";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Sticky } from "../types";

import stickies01to05 from "../others/stickies/01to05";

export const stickies: Sticky[] = [
    ...stickies01to05,
].sort((a, b) => a.createdDate.getDate() - b.createdDate.getDate());

const Memo = () => {
    return (
        <>
            <Helmet>
                <title>メモ</title>
                <meta name="description" content="忘備録とかライブレポとか。" />
            </Helmet>

            <p style={{ fontSize: '1.5rem' }}>メモ</p>
            <p>忘備録とかライブレポとか。</p><hr />

            <For of={stickies}>{(sticky, index) => {
                const id = String(index.index + 1).padStart(2, '0')
                const date = sticky.createdDate.toLocaleDateString();
                return (
                    <>
                        <br />
                        <Link to={`/memo/${id}`}>{sticky.title}</Link>
                        <p style={{ fontSize: '0.8rem' }}>
                            &emsp;作成日 : {date}</p>
                    </>);
            }
            }</For>
        </>
    );
}

export default Memo;