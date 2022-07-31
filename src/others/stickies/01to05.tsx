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
        `
    },
    {
        isPublic: true,
        category: 'ゼミ資料',
        createdDate: new Date(2022, 4, 20),
        title: "三角関数で考えるチェスの動き",
        body: `
愚直に実装すると多少面倒くさそうなチェスの駒の動きを、三角関数を用いて実装します。

## はじめに

- ポーンは前進以外できないため除外します。
- 今回は駒の動きにのみ注目するため、盤上にほかの駒はいないものとします。
- 実装にはProcessingを使用しています(別サイトではp5.jsを使用していましたが書き換えました)。

## ひな型

~~~java
final int block = 90;

void setup() {
    size(720, 720);
    noStroke();
    PFont font = createFont("Segoe UI Symbol", block);
    textFont(font);
    textAlign(LEFT, TOP);

    for (int i = 0; i < 8; i++) {
        for (int j = 0; j < 8; j++) {
            fill((i + j) % 2 == 0 ? 255 : 128);
            square(i * block, j * block, block);
        }
    }
}
~~~

![00.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/f00c79ed-8625-91b6-2d8d-bc382ca97e20.png)

この盤面を使って実装していきます。


## [ナイト - Knight](https://ja.wikipedia.org/wiki/%E3%83%8A%E3%82%A4%E3%83%88_(%E3%83%81%E3%82%A7%E3%82%B9))

ナイトは将棋の桂馬のような駒で、アルファベットの「Y」の字を4方向に広げたような動きになります。単位円でみたときにそれぞれの象限に2種類ずつ、合計で8種類のマスに移動することができます。

![01.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/5041c3e0-5e73-26b1-b102-5e5934d6809c.png)

駒の座標を(w, h)とします。

~~~java
// 駒の座標
int w = 3;
int h = 3;
~~~

次に移動可能な座標を計算します。
先ほどの図から分かるようにナイトは30°からスタートし、45°ずつ角度を増やした位置に移動することができます。

~~~java
for (int angle = 30; angle < 360 + 30; angle += 45) {
    // x座標(round()で整数に変換)
    int p = round(2 * cos(PI / 180.0 * angle)) + w;
    // y座標(round()で整数に変換)
    int q = round(2 * sin(PI / 180.0 * angle)) + h;

    // 移動可能な位置を描写
    fill(192);
    circle(p * block + block / 2, q * block + block / 2, block / 2);

    // 駒の配置
    fill(0);
    text("♞", w * block, h * block);
}
~~~

まとめるとこのようになります。

~~~java
final int block = 90;

void setup() {
    size(720, 720);
    noStroke();
    PFont font = createFont("Segoe UI Symbol", block);
    textFont(font);
    textAlign(LEFT, TOP);

    for (int i = 0; i < 8; i++) {
        for (int j = 0; j < 8; j++) {
            fill((i + j) % 2 == 0 ? 255 : 128);
            square(i * block, j * block, block);
        }
    }

    // (3, 3)に配置
    drawKnight(3, 3);
}

void drawKnight(int w, int h) {
    for (int angle = 30; angle < 360 + 30; angle += 45) {
        int p = round(2 * cos(PI / 180.0 * angle)) + w;
        int q = round(2 * sin(PI / 180.0 * angle)) + h;

        // 盤面の範囲内でなければパス
        if (p < 0 || p >= 8 || q < 0 || q >= 8) continue;

        fill(192);
        circle(p * block + block / 2, q * block + block / 2, block / 2);
    }

    // 駒の配置
    fill(0);
    text("♞", w * block, h * block);
}
~~~

![02.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/eb0da196-e3b4-e07b-f127-65e0ca7f6df6.png)

## [ビショップ - Bishop](https://ja.wikipedia.org/wiki/%E3%83%93%E3%82%B7%E3%83%A7%E3%83%83%E3%83%97)

ビショップは現在位置から斜め方向に何マスでも移動することができます。

![03.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/79eb9e02-ce68-1bea-69ad-475eb5b57d41.png)

先ほどのナイトと同じように実装していきますが、ナイトよりも動ける範囲が広いため、ループを増やしてやる必要があります。

~~~java
int w = 3;
int h = 3;

for (int angle = 45; angle < 360 + 45; angle += 90) {
    // for文を追加
    for (int radius = 1; radius < 8; radius++) {
    int p = round(radius * cos(PI / 180.0 * angle)) + w;
    int q = round(radius * sin(PI / 180.0 * angle)) + h;

    // 盤面の範囲内でなければパス
    if (p < 0 || p >= 8 || q < 0 || q >= 8) continue;

    // 移動可能な位置を描写
    fill(192);
    circle(p * block + block / 2, q * block + block / 2, block / 2);
    }
}

// 駒の配置
fill(0);
text("♝", w * block, h * block);
~~~

![04.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/ceabbc65-c8ad-6de5-8a46-1446c9d07265.png)

できました。

しかし、これだと座標によってはうまく計算できていない部分もあります。たとえば、座標を(0, 1) とするとこのようになってしまいます。

![05.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/a2fb6f8b-f99b-8a88-a7b8-a34fbaf15da8.png)

for文の範囲を変更する必要があります。 \`8 * √2 ≒ 11\` なので、 \`1 <= radius < 8\` から \`1 <= radius < 11\` に変更することでうまく実装することができます。

~~~java
final int block = 90;

void setup() {
    size(720, 720);
    noStroke();
    PFont font = createFont("Segoe UI Symbol", block);
    textFont(font);
    textAlign(LEFT, TOP);

    for (int i = 0; i < 8; i++) {
        for (int j = 0; j < 8; j++) {
            fill((i + j) % 2 == 0 ? 255 : 128);
            square(i * block, j * block, block);
        }
    }

    // (0, 1)に配置
    drawBishop(0, 1);
}

void drawBishop(int w, int h) {
    for (int angle = 45; angle < 360 + 45; angle += 90) {
        for (int radius = 1; radius < 11; radius++) {
            int p = round(radius * cos(PI / 180.0 * angle)) + w;
            int q = round(radius * sin(PI / 180.0 * angle)) + h;

            // 盤面の範囲内でなければパス
            if (p < 0 || p >= 8 || q < 0 || q >= 8) continue;

            // 移動可能な位置を描写
            fill(192);
            circle(p * block + block / 2, q * block + block / 2, block / 2);
        }
    }

    // 駒の配置
    fill(0);
    text("♝", w * block, h * block);
}

~~~

![06.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/51b80a39-61a5-c897-b07d-a7a26956f24b.png)

## [ルーク - Rook](https://ja.wikipedia.org/wiki/%E3%83%AB%E3%83%BC%E3%82%AF)

ビショップが斜め移動だったのに対し、ルークは縦横に何マスでも移動することができます。

![07.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/5e312619-503b-5807-6125-17a9fc2d3020.png)

ビショップと同じように実装します。

~~~java
final int block = 90;

void setup() {
    size(720, 720);
    noStroke();
    PFont font = createFont("Segoe UI Symbol", block);
    textFont(font);
    textAlign(LEFT, TOP);

    for (int i = 0; i < 8; i++) {
        for (int j = 0; j < 8; j++) {
            fill((i + j) % 2 == 0 ? 255 : 128);
            square(i * block, j * block, block);
        }
    }

    // (4, 5)に配置
    drawRook(4, 5);
}

void drawRook(int w, int h) {
    for (int angle = 0; angle < 360; angle += 90) {
    // ビショップと違い縦横なので8で良い
        for (int radius = 1; radius < 8; radius++) {
            int p = round(radius * cos(PI / 180.0 * angle)) + w;
            int q = round(radius * sin(PI / 180.0 * angle)) + h;

            // 盤面の範囲内でなければパス
            if (p < 0 || p >= 8 || q < 0 || q >= 8) continue;

            // 移動可能な位置を描写
            fill(192);
            circle(p * block + block / 2, q * block + block / 2, block / 2);
        }
    }

    // 駒の配置
    fill(0);
    text("♜", w * block, h * block);
}
~~~

![08.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/adaef4e1-d9fa-d215-6e20-4fbe67ac2eb2.png)

## [クイーン - Queen](https://ja.wikipedia.org/wiki/%E3%82%AF%E3%82%A4%E3%83%BC%E3%83%B3_(%E3%83%81%E3%82%A7%E3%82%B9))

最強の駒と呼ばれるクイーンはビショップとナイトを足し合わせた動き、つまり縦横斜めを自由に移動することができます。

![09.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/f30fde26-59f5-14f5-f7c7-5bcdc61873b6.png)

四方八方に動くといっても、実装自体はビショップとナイトを組み合わせるだけです。

~~~java
final int block = 90;

void setup() {
    size(720, 720);
    noStroke();
    PFont font = createFont("Segoe UI Symbol", block);
    textFont(font);
    textAlign(LEFT, TOP);

    for (int i = 0; i < 8; i++) {
        for (int j = 0; j < 8; j++) {
            fill((i + j) % 2 == 0 ? 255 : 128);
            square(i * block, j * block, block);
        }
    }

    // (3, 5)に配置
    drawQueen(3, 5);
}

void drawQueen(int w, int h) {
    // 45°ずつ移動
    for (int angle = 0; angle < 360; angle += 45) {
        for (int radius = 1; radius < 11; radius++) {
            int p = round(radius * cos(PI / 180.0 * angle)) + w;
            int q = round(radius * sin(PI / 180.0 * angle)) + h;

            // 盤面の範囲内でなければパス
            if (p < 0 || p >= 8 || q < 0 || q >= 8) continue;

            // 移動可能な位置を描写
            fill(192);
            circle(p * block + block / 2, q * block + block / 2, block / 2);
        }
    }

    // 駒の配置
    fill(0);
    text("♛", w * block, h * block);
}
~~~

![10.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/ad3c0362-00e7-76bd-a162-135ec40ebabe.png)

## [キング - King](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%B3%E3%82%B0_(%E3%83%81%E3%82%A7%E3%82%B9))

チェスの王を表すキングは、基本自分の位置から縦横斜め1マスだけ移動することができます(実際のルールではもっと複雑ですが...)。

![11.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/d9bb4f5b-1918-00ab-b7a8-41f69415e42c.png)

クイーンのfor文をひとつ減らしてやります。

~~~java

final int block = 90;

void setup() {
    size(720, 720);
    noStroke();
    PFont font = createFont("Segoe UI Symbol", block);
    textFont(font);
    textAlign(LEFT, TOP);

    for (int i = 0; i < 8; i++) {
        for (int j = 0; j < 8; j++) {
            fill((i + j) % 2 == 0 ? 255 : 128);
            square(i * block, j * block, block);
        }
    }

    // (4, 0)に配置
    drawKing(4, 0);
}

void drawKing(int w, int h) {
    // 45°ずつ移動
    for (int angle = 0; angle < 360; angle += 45) {
        // 1マス分移動
        int p = round(cos(PI / 180.0 * angle)) + w;
        int q = round(sin(PI / 180.0 * angle)) + h;

        // 盤面の範囲内でなければパス
        if (p < 0 || p >= 8 || q < 0 || q >= 8) continue;

        // 移動可能な位置を描写
        fill(192);
        circle(p * block + block / 2, q * block + block / 2, block / 2);
    }

    // 駒の配置
    fill(0);
    text("♚", w * block, h * block);
}
~~~

![12.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/8470e9ab-8261-44e4-5f36-c02de9e024ca.png)

実際のルールにのっとって実装するともう少し複雑な処理も必要ですが、基本的な動きは上記のように三角関数で表すことができます。
        `
    },
    {
        isPublic: true,
        category: 'ライブレポ',
        createdDate: new Date(2022, 7, 25),
        title: "ゴーゴーメモリーズ！2022夏 感想殴り書き",
        body: `
ずっと憧れてたネクライトーキーのライブ、今回ようやく機会が巡ってきたため参戦してきました。その感想です。オタクの殴り書きなのであまり気にしないでください…。興奮で記憶曖昧なので一部誤りあるかもしれません。

---

+ もっさがステージに上がった時マジで心臓止まりかけた。映像でみたもっさの何倍も可愛くて感情爆発した……………。トーク下手くそで、でも曲に入るとギターかかえてガシガシ弾いて、めちゃくちゃ歌上手くて、、。溜まってた疲れとか色々吹き飛んだ！
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
    },
    {
        isPublic: true,
        category: '忘備録',
        createdDate: new Date(2022, 7, 29),
        title: "procon32競技部門の簡易手動シミュレータ",
        body: `
少し前にprocon32の競技部門の課題を手動でシミュレーションするプログラムを作ったので供養です。Processingです。

~~~java
final int block = 90; // ピースの大きさ
final int row = 8, col = 8; // 分割数

PImage[][] pieces = new PImage[col][row];
int[][] angles = new int[col][row];
int swapX = row, swapY = col;

void setPieces(String fileName, boolean shuffle) { // 画像を分割
  PImage sourceImage = loadImage(fileName);
  sourceImage.resize(width, height);

  for (int c = 0; c < col; c++) {
    for (int r = 0; r < row; r++) {
      pieces[c][r] = sourceImage.get(r * block, c * block, block, block);
      angles[c][r] = 0;
    }
  }

  if (shuffle) { // シャッフルするかどうか
    for (int i = 0; i < row * col * 2; i++) {
      int r1 = int(random(row)), c1 = int(random(col));
      int r2 = int(random(row)), c2 = int(random(col));

      swapPiece(r1, c1, r2, c2);
      rotatePiece(r1, c1); rotatePiece(r2, c2);
    }
  }
}

void setup() {
  size(720, 720);
  noLoop();
  noFill();
  strokeWeight(2);
  rectMode(CENTER);
  imageMode(CENTER);

  setPieces("1-1.png", true);
}

void draw() {
  background(192);
  for (int c = 0; c < col; c++) {
    for (int r = 0; r < row; r++) {
      push();
      translate((r + 0.5) * block, (c + 0.5) * block);
      rotate(PI / 2.0 * angles[c][r]);
      image(pieces[c][r], 0, 0);
      pop();
    }
  }
  square((swapX + 0.5) * block, (swapY + 0.5) * block, block);
}

void mousePressed() { // 左クリックで入れ替え 右クリックで回転
  int x = floor(mouseX / block);
  int y = floor(mouseY / block);

  if (mouseButton == LEFT) {
    if (swapX == row && swapY == col) {
      swapX = x; swapY = y;
    } else {
      swapPiece(swapX, swapY, x, y);
      swapX = row; swapY = col;
    }
  } else {
    rotatePiece(x, y);
    swapX = row; swapY = col;
  }

  redraw();
}

void rotatePiece(int x, int y) { // 90°ずつ回転
  angles[y][x] = (angles[y][x] + 1) % 4;
}

void swapPiece(int x1, int y1, int x2, int y2) { // 画像の入れ替え
  PImage pieceTmp = pieces[y1][x1];
  pieces[y1][x1] = pieces[y2][x2];
  pieces[y2][x2] = pieceTmp;

  int angleTmp = angles[y1][x1];
  angles[y1][x1] = angles[y2][x2];
  angles[y2][x2] = angleTmp;
}

void keyPressed() { // Enterキーで保存
  if (key == ENTER || key == RETURN) {
    String title =
      nf(year(), 4) +
      nf(month(), 2) +
      nf(day(), 2) +
      nf(hour(), 2) +
      nf(minute(), 2) +
      nf(second(), 2);
    save(title + ".png");
  }
}
~~~

![01.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1889756/3f92650d-7395-bf9c-f256-2dedf0481435.png)

左クリックでピースを選択・交換、右クリックで回転です。

結局使う機会がなかったので簡易的なプログラムですが、そのうち何らかの形で供養してあげたいですね。
        `
    }
];

export default stickies01to05;
