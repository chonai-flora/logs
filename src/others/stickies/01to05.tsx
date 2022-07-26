import { Sticky } from "../../types";

const stickies01to05: Sticky[] = [
    {
        isPublic: true,
        category: '忘備録',
        createdDate: new Date(2022, 4, 20),
        title: "C++でUnicodeコードポイントから文字を生成",
        body: `
Unicodeコードポイントから文字を生成する方法は言語や環境によって異なります。

~~~python
# Python3
code_point = 0x1F642
emoji = chr(code_point)
print(emoji)  # 🙂
~~~

~~~java
// Java
class Main {  
    public static void main(String args[]) { 
        int codePoint = 0x1F604;
        String emoji = new String(Character.toChars(codePoint));
        System.out.println(emoji);  // 😄
    } 
}
~~~

~~~js
// JavaScript
const codePoint = 0x1F606;
const emoji = String.fromCodePoint(codePoint);
console.log(emoji);  // 😆
~~~

ただ、これらのメソッドに相当するものがC++でみつからなかったので、適当に調べて実装しました。
コードポイントの桁数に合わせてビット演算し、ワイド文字にキャストして生成します(語彙力)。

~~~cpp
#include <iostream>
#include <string>

std::wstring to_utf8(unsigned int code_point) {
    if (code_point < 0x80) {
        return std::wstring({
            (wchar_t)code_point
        });
    }
    
    else if (code_point < 0x800) {
        return std::wstring({
            (wchar_t)(code_point >> 6 | 0x1C0),
            (wchar_t)(code_point & 0x3F | 0x80)
        });
    }
    
    else if (code_point < 0xD800 ||
        (0xDFFF < code_point && code_point < 0x10000)) {
        return std::wstring({
            (wchar_t)(code_point >> 12 | 0xE0),
            (wchar_t)((code_point >> 6 & 0x3F) | 0x80),
            (wchar_t)((code_point & 0x3F) | 0x80)
        });
    }
    
    else if (code_point < 0x110000) {
        return std::wstring({
            (wchar_t)(code_point >> 18 | 0xF0),
            (wchar_t)((code_point >> 12 & 0x3F) | 0x80),
            (wchar_t)((code_point >> 6 & 0x3F) | 0x80),
            (wchar_t)((code_point & 0x3F) | 0x80)
        });
    }
    
    return std::wstring({
        (wchar_t)0xEF,
        (wchar_t)0xBF,
        (wchar_t)0xBD
    });
}

int main() {
    unsigned int code_point = 0x3042;
    std::wcout << to_utf8(code_point) << std::endl;
    return 0;
}
~~~

これだと文字化けしました。私のPCはWindowsなので、\`SetConsoleOutputCP()\` でコンソールの出力コードを設定してやります。

~~~cpp
#include <iostream>
#include <string>
#include <Windows.h>

std::wstring to_utf8(unsigned int code_point) {
    if (code_point < 0x80) {
        return std::wstring({
            (wchar_t)code_point
        });
    }
    
    else if (code_point < 0x800) {
        return std::wstring({
            (wchar_t)(code_point >> 6 | 0x1C0),
            (wchar_t)(code_point & 0x3F | 0x80)
        });
    }
    
    else if (code_point < 0xD800 ||
        (0xDFFF < code_point && code_point < 0x10000)) {
        return std::wstring({
            (wchar_t)(code_point >> 12 | 0xE0),
            (wchar_t)((code_point >> 6 & 0x3F) | 0x80),
            (wchar_t)((code_point & 0x3F) | 0x80)
        });
    }
    
    else if (code_point < 0x110000) {
        return std::wstring({
            (wchar_t)(code_point >> 18 | 0xF0),
            (wchar_t)((code_point >> 12 & 0x3F) | 0x80),
            (wchar_t)((code_point >> 6 & 0x3F) | 0x80),
            (wchar_t)((code_point & 0x3F) | 0x80)
        });
    }
    
    return std::wstring({
        (wchar_t)0xEF,
        (wchar_t)0xBF,
        (wchar_t)0xBD
    });
}

int main() {
// 出力コードを設定
    SetConsoleOutputCP(CP_UTF8);
    
    unsigned int code_point = 0x1F60C;
    std::wcout << to_utf8(code_point) << std::endl;
    return 0;
}
~~~

ただしく😌が表示されました。
    `
    },
    {
        isPublic: true,
        category: 'ゼミ資料',
        createdDate: new Date(2022, 4, 20),
        title: "React AppをGitHub Pagesにデプロイする",
        body: `
ReactでつくったWebアプリケーションをGitHub Pagesに公開するだけの記事です。

# 事前確認
Node.jsとnpmがインストールされているか確認します。
~~~console
$ node -v
v16.13.2
$ npm -v
8.1.2
~~~

# Reactプロジェクト作成
~~~console
$ npx create-react-app react-sample
$ cd react-sample/
~~~
普通に \`create-react-app\` します。今回は \`react-sample\` というプロジェクト名で進めていきます。任意で変更してください。
その後作成したフォルダに移動します。

TypeScriptを使用する場合は \`--template typescript\` を加えて実行します。
~~~console
$ npx create-react-app react-sample --template typescript
~~~

# プロジェクトを起動
~~~console
$ npm start
~~~
ローカルホストにアクセスし、以下の画面が表示されれば起動完了です。 \`Ctrl + C\`で終了します。
![01.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/c7891a18-d77d-1c5c-e0c8-822f50aa43dd.png)

# タイトルを変更
任意で行ってください。そのままでいい方は飛ばして大丈夫です。
\`public/index.html\` を編集します。
~~~html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the \`public\` folder during the build.
      Only files inside the \`public\` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running \`npm run build\`.
    -->

  <!-- ここを修正 -->
  <title>React Sample</title>

</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run \`npm start\` or \`yarn start\`.
      To create a production bundle, use \`npm run build\` or \`yarn build\`.
    -->
</body>

</html>
~~~

# package.jsonを修正
\`package.json\` の \`"scripts"\` を修正し、新たに \`"homepage"\` を追加します。
~~~json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build && rm -rf docs/ && mv build/ docs/",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "homepage": "https://{username}.github.io/react-sample"
}
~~~
\`"scripts"\` 内の \`"build"\` コマンドを修正しました。Reactで \`npm run build\` を実行すると \`build/\` というフォルダにプロジェクトがビルドされるのですが、今回は \`docs/\` にファイルをまとめてデプロイしたいのでこのように修正しました。
そのまま \`mv\` するとファイルが混同する可能性があるため一度 \`rm\` しています。\`"homepage"\` 内の \`{username}\` には自分のGitHubアカウントのユーザーネームを入力してください。

# ビルド
~~~console
$ npm run build
~~~
\`docs/\` フォルダが作られ、無事ビルドできたと思います。

# GitHubリポジトリ作成
GitHubのリポジトリ(今回は \`react-sample\` )を作成します。無料で公開する場合はPublicに設定します。

その後GitHub上にローカルのプロジェクトをpushします。
~~~console
$ git init
$ git add .
$ git commit -m "first commit"
$ git branch -M main
$ git remote add origin https://github.com/{username}/react-sample.git
$ git push -u origin main
~~~

# GitHub Pagesの設定
リポジトリの \`Settings\` から \`Pages\` を選び、branchを \`main\` 、folderを \`/docs\` にしてSaveをクリックします。
![02.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/cc854f97-a078-8e73-edb4-7f08686e6b32.png)

https://{username}.github.io/react-sample/ にアクセスし、ローカルの内容が公開できていたら成功です！

(Markdownだと画像サイズの調整が難しい...。)
    `
    },
    {
        isPublic: true,
        category: 'ライブレポ',
        createdDate: new Date(2022, 7, 25),
        title: "ゴーゴートーキーズ！2022夏 感想殴り書き",
        body: `
ずっと憧れてたネクライトーキーのライブ、今回ようやく機会が巡ってきたため参戦してきました。その感想です。オタクの殴り書きなのであまり気にしないでください…。興奮で記憶曖昧なので一部誤りあるかもしれません。

---

+ もっさがステージに上がった時マジで心臓止まりかけた。映像でみたもっさの何倍も可愛くて感情爆発した……………。藤田さんと並ぶと頭1個分くらい小柄で、トーク下手くそで、でも曲に入るとギターかかえてガシガシ弾いて、めちゃくちゃ歌上手くて、、。溜まってた疲れとか色々吹き飛んだ！
+ おじって歳でもないしちょい失礼かもしれないけど朝日さんリアルで見ると何倍もイケおじ感あってイカしてた。MCも色んな話聞けて楽しかったなぁ。沢山会場沸かしてくれてありがとうございました！！
+ 藤田さんかっこよすぎたなぁ。ほんとに。特にいなせなガールはワイルドなベースに力強いボーカルでマジかっこよかった。途中メンバー同士でイチャついてたの推せる。
+ ドラムスカズマタケイ！！MCは少なかったけどハイレベルなドラム沢山聴けて幸せでした。あとタケイ氏シンプルにイケメンすぎた。ドラムの名前忘れた。空振り三振最高でした。
+ むーさんもかっこよかった！！！オシャレ大作戦のキーずっと聴きたかったから生で聴けてよかった…。あとむーさんが着てたシャツオシャレでめちゃめちゃ似合ってたから買えばよかったなーと。
+ 聴きたい曲沢山聴けて幸せでした。興奮しすぎてセトリの記憶曖昧だけどすげー楽しかった。だけじゃないBABYの「ちょっとは元気を出しな」でたくさん元気出た。CHAKAPOCO楽しかった。他にも沢山あったので徐々にセトリ思い出しますね…。
+ ラストのいなせとだれかとぼくら、アンコールのティーンエイジ・ネクラポップ、これでラストかーっていう寂しさを上回るくらい楽しかった。特にネクラポップには励まされたし沁みた。
+ どの曲もノリノリで楽しめたけど、ゆうなだけはあまりにも歌詞と歌声が良すぎて盛り上がる余裕もないくらいしっかり聴き込んでしまった。沁みまくった。
+ もし機会があれば個人的に好きな明日にだってと放課後の記憶、ライブ映像で楽しそうだなーってずっと思ってた許せ！服部も聴きたい。絶対またライブ行く。
+ グッズ買いすぎたなーとも思いましたが、6月は土日毎日バイト入ったし金額以上に楽しめたのでまた頑張ります。
+ 朝「傘あんまり売れてらしいな？？あんな可愛い黒猫の傘なのに」藤「そういえば夜から雨らしいな」も「買った方がええんちゃう？ﾌﾋﾋ」セリフちょっと違うかもしれないけどこのくだり好きだった。
+ ネクライトーキーありがとう！！！ここ数年アーティストのことをこうやって語ったりするのがダサい、みたいにどこか少し冷めた感じの自分がいたけど、今回のライブで楽しさを思い出せた気がします。バイトやら学校やらで溜まってたモヤモヤが吹き飛びました。あと今度はトーキー好きの友達見つけて一緒に参戦したい。最高でした！
    `
    }
];

export default stickies01to05;