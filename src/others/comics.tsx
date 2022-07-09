export type Comic = {
    name: string;
    howRead: string;
    describe: JSX.Element;
}

const getInitial = (comic: Comic) => {
    const initial = comic.howRead[0];
    if ("ぁ" <= initial && initial <= "お") {
        return "あ";
    } else if (initial <= "ご") {
        return "か";
    } else if (initial <= "ぞ") {
        return "さ";
    } else if (initial <= "ど") {
        return "た";
    } else if (initial <= "の") {
        return "な";
    } else if (initial <= "ぽ") {
        return "は";
    } else if (initial <= "も") {
        return "ま";
    } else if (initial <= "よ") {
        return "や";
    } else if (initial <= "ろ") {
        return "ら";
    }
    return initial;
}

const comics = () => {
    const comics: Comic[] = [
        {
            name: "ドラゴンボール",
            howRead: "どらごんぼーる",
            describe: (
                <>
                    人生で初めて読んだ漫画。
                    何年経っても好き。
                    作品として最高なのはもちろんこれをきっかけに漫画の楽しさを知りました。
                </>
            ),
        },
        {
            name: "Dr. スランプ",
            howRead: "どくたーすらんぷ",
            describe: (
                <>
                    ドラゴンボールの後に買い集めた作品。
                    少年漫画らしいギャグマンガだけど鳥山先生のセンスが盛り込まれてて大好き。
                    本編もだけどちょくちょく挟まれる4コマとかおまけページがめっちゃ好きでした。
                </>
            ),
        },
        {
            name: "ロトの紋章",
            howRead: "ろとのもんしょう",
            describe: (
                <>
                    ドラゴンボールの次に読んだ作品。
                    ドラクエが好きで読み始めたのかこれをきっかけにドラクエ始めたのか忘れたけどめっちゃ好きです。
                    ドラクエの世界観をしっかり残しつつオリジナルの設定とか呪文もたくさん織り込まれてていいよなーー。
                </>
            ),
        },
        {
            name: "金色のガッシュ!!",
            howRead: "こんじきのがっしゅ",
            describe: (
                <>
                    正真正銘の名作。
                    魔物と人間のパートナーの関係や魔本の設定が秀逸だし、何よりもすべてのキャラクターが魅力的でそれぞれのドラマに毎回心を打たれました。
                    ガッシュⅡも激アツで目が離せない。
                </>
            ),
        },
        {
            name: "海月姫",
            howRead: "くらげひめ",
            describe: (
                <>
                    つらいときはチャットモンチー流して夜通し海月姫読んで嫌なこと忘れてました。
                    私の憧れとロマンが詰まってます。
                    どうでもいいけど全漫画の登場人物でトップ争うレベルでファヨンが好き。
                    あとカイ社長と一緒にフィッシュカレー食べたい。
                </>
            ),
        },
        {
            name: "東京タラレバ娘",
            howRead: "とうきょうたらればむすめ",
            describe: (
                <>
                    まずタイトルがいいなーと毎回思う。
                    巻数は少ないけど毎回読み切った時の充実感が半端ないです。
                    「30代未婚女性が幸せを追い求めて四苦八苦する」をテーマにこれだけユーモラスに、かつリアルに描写してくれる東村アキコさんは最高です。
                </>
            ),
        },
        {
            name: "主に泣いてます",
            howRead: "おもにないてます",
            describe: (
                <>
                    ほかの東村作品にはない栄養を摂取できる(と思ってる)。センス爆発してて好きです。
                    ギャグ要素満載で疲れるくらい盛り込まれてるけどそれでいてシリアスなシーンもあって。
                    ツネちゃん大好きだったので最後影薄かったのがちょっと残念です。
                </>
            ),
        },
        {
            name: "MAO",
            howRead: "まお",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "境界のRINNE",
            howRead: "きょうかいのりんね",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "犬夜叉",
            howRead: "いぬやしゃ",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "らんま1/2",
            howRead: "らんまにぶんのいち",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "めぞん一刻",
            howRead: "めぞんいっこく",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "うる星やつら",
            howRead: "うるせいやつら",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "君に届け",
            howRead: "きみにとどけ",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "ダイの大冒険",
            howRead: "だいのだいぼうけん",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "冒険王ビィト",
            howRead: "ぼうけんおうびぃと",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "るろうに剣心",
            howRead: "るろうにけんしん",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "もやしもん",
            howRead: "もやしもん",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "ちはやふる",
            howRead: "ちはやふる",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "銀の匙",
            howRead: "ぎんのさじ",
            describe: (
                <>
                </>
            ),
        },
        {
            name: "チェーンソーマン",
            howRead: "ちぇーんそーまん",
            describe: (
                <>
                </>
            ),
        },
    ];

    let orderedComics = new Map<string, Set<Comic>>();
    comics.forEach((comic) => {
        const initial = getInitial(comic);
        if (!orderedComics.has(initial)) {
            orderedComics.set(initial, new Set());
        }
        orderedComics.get(initial)?.add(comic);
    });

    return orderedComics;
}

export default comics;