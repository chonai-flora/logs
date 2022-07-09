import { Helmet } from "react-helmet";
import { List } from "@material-ui/core";
import comics from "../others/comics";

const Bookshelf = () => {
    let bookshelf = comics();

    const toArray = <T, _>(what: IterableIterator<T>): T[] => {
        let entries: T[] = [];
        for (let it = what.next(); !it.done; it = what.next()) {
            entries.push(it.value);
        }
        return entries;
    };

    const compareAsString = <T, _>(func: (arg: T) => string) => {
        return (a: T, b: T) => {
            const x = func(a);
            const y = func(b);
            return x > y ? 1 : x === y ? 0 : -1;
        };
    };

    return (
        <div>
            <Helmet>
                <title>本棚</title>
                <meta name="description" content="ルーツとか" />
            </Helmet>
            <div style={{ padding: "10px" }}>
                <h1>本棚</h1>
                <p>ルーツとか</p>
                <List>{
                    toArray(bookshelf.entries())
                        .sort(compareAsString((wordSet) => wordSet[0]))
                        .map((comic) => (
                            <li key={comic[0] + "li"}>
                                <h2 key={comic[0] + "h2"}>{comic[0]}</h2>
                                <hr key={comic[0] + "hr"} />
                                {toArray(comic[1].values())
                                    .sort(compareAsString((word) => word.howRead))
                                    .map((item) => (
                                        <div key={item.name}>
                                            <h3>{`${item.name} - ${item.howRead}`}</h3>
                                            {item.describe}
                                            <hr key={comic[1] + "hr"} />
                                        </div>
                                    ))}
                            </li>
                        ))
                }</List>
            </div>
        </div>
    );
}

export default Bookshelf;