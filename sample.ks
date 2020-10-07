; 画像がない・初期化をしていないのでこのままでは動きません
; ティラノスクリプト公式様のscene1.ksの改変です

; このサンプルを動かす手順
; 0. 新しいプロジェクトを立ち上げてください
; 1. first.ksに`@plugin name="simple_wipe"` を追加してください(@jumpの前)
; 2. scene1.ksをこのsample.ksの内容で上書きしてください

*start

[cm  ]
[clearfix]
[start_keyconfig]

[bg storage="room.jpg" time="100"]

;メニューボタンの表示
@showmenubutton

;メッセージウィンドウの設定
[position layer="message0" left=270 top=500 width=1000 height=200 page=fore visible=true]

;文字が表示される領域を調整
[position layer=message0 page=fore margint="45" marginl="150" marginr="70" marginb="60"]


;メッセージウィンドウの表示
@layopt layer=message0 visible=true

;キャラクターの名前が表示される文字領域
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=280 y=510]

;上記で定義した領域がキャラクターの名前表示であることを宣言（これがないと#の部分でエラーになります）
[chara_config ptext="chara_name_area"]

;このゲームで登場するキャラクターを宣言
;akane
[chara_new  name="akane" storage="chara/akane/normal.png" jname="あかね"  ]
;キャラクターの表情登録
[chara_face name="akane" face="angry" storage="chara/akane/angry.png"]
[chara_face name="akane" face="doki" storage="chara/akane/doki.png"]
[chara_face name="akane" face="happy" storage="chara/akane/happy.png"]
[chara_face name="akane" face="sad" storage="chara/akane/sad.png"]


;yamato
[chara_new  name="yamato"  storage="chara/yamato/normal.png" jname="やまと" ]

; ワイプに表示されるキャラの設定（画像ファイルはdata/fgimage/wipe_charaに格納)
[wipe_chara_new  name="akane" face="default" storage="wipe_chara/akane/normal.png"]
[wipe_chara_face name="akane" face="angry"   storage="wipe_chara/akane/angry.png"]
[wipe_chara_face name="akane" face="doki"    storage="wipe_chara/akane/doki.png"]
[wipe_chara_face name="akane" face="happy"   storage="wipe_chara/akane/happy.png"]
[wipe_chara_face name="akane" face="sad"     storage="wipe_chara/akane/sad.png"]

[wipe_chara_new  name="yamato" face="default" storage="wipe_chara/yamato/normal.png"]
[wipe_chara_face name="yamato" face="angry"   storage="wipe_chara/yamato/angry.png"]
[wipe_chara_face name="yamato" face="happy"   storage="wipe_chara/yamato/happy.png"]
[wipe_chara_face name="yamato" face="sad"     storage="wipe_chara/yamato/sad.png"]
[wipe_chara_face name="yamato" face="tohoho"  storage="wipe_chara/yamato/tohoho.png"]

; ワイプ窓表示
[wipe_window_show]
; ワイプにキャラ表示
[wipe_chara_show name="yamato"]
#
さて、ゲームが簡単に作れるというから、来てみたものの[p]

誰もいねぇじゃねぇか。[p]
……[p]
; ワイプのキャラの表情変更
[wipe_chara_mod name="yamato" face="sad"]
帰るか。。。[p]

[font  size="30"   ]
#?
ちょっとまったーーーーー[p]
[resetfont  ]
[wipe_chara_mod name="yamato" face="angry"]
#
誰だ！？[p]

;キャラクター登場
[chara_show  name="akane" wait="false"]
; chara_showのwaitをfalseにすると同じタイミングで表示されます
[wipe_chara_show name="akane"]
#?
こんにちは。[p]
私の名前はあかね。[p]
#あかね
もしかして、ノベルゲームの開発に興味があるの？[p]

; ワイプのキャラを非表示
[wipe_chara_hide]
#
[glink  color="blue"  storage="scene1.ks"  size="28"  x="360"  width="500"  y="150"  text="はい。興味あります"  target="*selectinterest"  ]
[glink  color="blue"  storage="scene1.ks"  size="28"  x="360"  width="500"  y="250"  text="興味あります！"  target="*selectinterest"  ]
[glink  color="blue"  storage="scene1.ks"  size="28"  x="360"  width="500"  y="350"  text="どちらかと言うと興味あり"  target="*selectinterest"  ]
[s  ]
*selectinterest

[chara_mod  name="akane" face="happy"  wait="false"]
; wipe_chara_modはwipe_chara_showのエイリアスなので、どちらを使ってもよい
[wipe_chara_mod  name="akane" face="happy"  ]
#あかね
わー。興味あるなんて、嬉しいなー。[p]

[wipe_chara_show name="yamato"]
#
・・・・・[p]
まぁ、作ってみたい気持ちはあるけど、むずかしいんでしょ？[p]
[wipe_chara_mod name="yamato" face="tohoho"]
プログラミングとかやったことないし、、、[p]

[chara_mod name="akane" face="default" wait="false"]
[wipe_chara_mod name="akane" face="default"]

#あかね
そんな君に、耳寄りな情報があるんだけど[p]
ききたい？　ききたいよね？[p]

[chara_hide name="akane" wait="false"]
[wipe_chara_hide]
[wipe_window_hide]
; ループ
[jump target="*start"]
