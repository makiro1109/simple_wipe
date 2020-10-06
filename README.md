# Simple Wipe for TyranoScript v5

___

## 概要

TyranoScript v5.00向けのプラグインです。（ES2015記法のため)

![ティラノスクリプト解説 2020_10_06 15_10_17](https://user-images.githubusercontent.com/47486806/95165447-f2a98300-07e6-11eb-90f8-eafabc3213f0.png)

ゲーム画面にワイプ（テレビでVTR中に芸能人が小さく表示されているやつ）が表示できます。
TyranoScript公式の[機能デモ](https://tyrano.jp/sample2/code/siryou/21#demo)にもほぼ同様の動作をするchara_modを使ったマクロがあります。

### 特徴

- JavaScriptでタグ自体を実装してあります。
- ワイプ要素のCSS変更が比較的容易です。(simple_wipe/style.css)
- chara\_系のタグの使用感に寄せて作ってあります。
- メッセージウインドウレイヤ(`.message${layer_num}_fore`)にワイプを追加して表示させています。

## 使い方

simple_wipeフォルダをそのままプロジェクトの「data/others/plugin/」に入れてください。

その後、first.ksに`@plugin name="simple_wipe"`を追記してください。
この記述の直後からプラグインが使用できるようになります。

### タグ一覧

```
; ワイプ窓表示
[wipe_show layer="message_layer_num"]

; ワイプ窓非表示
[wipe_show layer="message_layer_num"]

; ワイプで使うキャラの登録(storageはdata/fgimage/以下の画像)
[wipe_chara_new name="chara_name" storage="image_path_from_fgimage/" face="image_name"]

; ワイプで使うキャラの表情の登録(storageはdata/fgimage/以下の画像)
[wipe_chara_face name="chara_name" storage="image_path_from_fgimage/ " face="image_name"]

; ワイプにキャラ表示(すでに表示されていても問題ない)
[wipe_chara_show name="chara_name" face="image_name" layer="message_layer_num"]

; wipe_chara_showと同じ（chara_modとあわせて使うことを想定したエイリアス)
[wipe_chara_mod name="chara_name" face="image_name" layer="message_layer_num"]

; ワイプに表示されているキャラを隠す
[wipe_chara_hide layer="message_layer_num"]
```

具体的な使用例はsimple_wipe/sample.ksにあります。
