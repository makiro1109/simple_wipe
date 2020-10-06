(() => {

    const tagNames = [
        'wipe_window_show', // ワイプ窓表示
        'wipe_window_hide', // ワイプ窓非表示
        'wipe_chara_new',  // ワイプで使うキャラの宣言
        'wipe_chara_face', // ワイプで使うキャラの表情の登録
        'wipe_chara_show', // ワイプにキャラ表示、表情指定あり
        'wipe_chara_mod',  // wipe_chara_showと同じ（chara_modとあわせて使うことを想定したエイリアス)
        'wipe_chara_hide', // ワイプに表示されているキャラを隠す
    ];

    // タグ定義(vitalは必要な引数, pmはデフォルト引数)

    /**
     * [wipe_show layer="message_layer_num"]
     * ワイプ窓表示
     */
    tyrano.plugin.kag.tag.wipe_window_show = {
        vital: [],
        pm   : { layer: 0 },
        start: (args) => {
            if (!$(`.message${args.layer}_fore .wipe_window`).get(0)) {
                 $(`.message${args.layer}_fore`).append('<div class="wipe_window"></div>');
            }
            $(`.message${args.layer}_fore .wipe_window`).animate({ 'opacity': '1' }, 100, 'linear');
            TYRANO.kag.ftag.nextOrder();
        }
    }

    /**
     * [wipe_show layer="message_layer_num"]
     * ワイプ窓非表示
     */
    tyrano.plugin.kag.tag.wipe_window_hide = {
        vital: [],
        pm   : { layer: 0 },
        start: (args) => {
            $(`.message${args.layer}_fore .wipe_window`).animate({ 'opacity': '0' }, 100, 'linear');
            TYRANO.kag.ftag.nextOrder();
        }
    }

    /**
     * [wipe_chara_new name="chara_name" storage="image_path_from_fgimage/" face="image_name"]
     * ワイプで使うキャラの宣言
     * storageにはdata/fgimage/以下の画像しか使えない
     */
    tyrano.plugin.kag.tag.wipe_chara_new = {
        vital: ['name', 'storage'],
        pm   : { name: '', storage: '', face: 'default' },
        start: (args) => {
            const TG = TYRANO.kag;
            if (!TG.stat.wipe_charas)
                 TG.stat.wipe_charas = {};
            TG.stat.wipe_charas[args.name] = { map_face: {} };
            TG.stat.wipe_charas[args.name].map_face[args.face] = args.storage;
            TG.ftag.nextOrder();
        }
    }

    /**
     * [wipe_chara_face name="chara_name" storage="image_path_from_fgimage/ " face="image_name"]
     * ワイプで使うキャラの表情の登録
     * storageにはdata/fgimage/以下の画像しか使えない
     */
    tyrano.plugin.kag.tag.wipe_chara_face = {
        vital: ['name', 'storage', 'face'],
        pm   : { name: '', storage: '', face: '' },
        start: (args) => {
            const TG = TYRANO.kag;
            const wc = TG.stat.wipe_charas;
            if (!(wc && wc[args.name]))
                TG.error(`wipe_chara_face: ${args.name}が定義されていないようです。`); 
            else
                wc[args.name].map_face[args.face] = args.storage;
            TG.ftag.nextOrder();
        }
    }

    /**
     * [wipe_chara_show name="chara_name" face="image_name" layer="message_layer_num"]
     * ワイプにキャラ表示、表情指定あり
     * すでに表示されていても問題ない
     */
    tyrano.plugin.kag.tag.wipe_chara_show = {
        vital: ['name'],
        pm   : { name: '', face: 'default', layer: 0},
        start: (args) => {
            const TG = TYRANO.kag;
            const wipe_window = $(`.message${args.layer}_fore .wipe_window`);

            if (!TG.stat.current_wipe) 
                TG.stat.current_wipe = [];
            else if (TG.stat.current_wipe[args.layer] instanceof jQuery)
                TG.stat.current_wipe[args.layer].animate({ 'opacity': '0' }, 100, 'linear');
            else if (!wipe_window.get(0)) {
                wipe_window.append('<div class="wipe_window"></div>');
            }
            wipe_window.animate({ 'opacity': '1' }, 100, 'linear');

            const wc = TG.stat.wipe_charas;
            if (!(wc && wc[args.name] && wc[args.name].map_face[args.face])) {
                TG.error(`wipe_chara_show: [${args.name}]か[${args.face}]が定義されていないようです。`);
                TG.ftag.nextOrder();
            }
            // ローカルの画像しか使えない
            TG.stat.current_wipe[args.layer] = $('<img class="wipe_chara_img chara_img" />')
                .attr('src',   './data/fgimage/' + wc[args.name].map_face[args.face]);
            wipe_window.empty().append(TG.stat.current_wipe[args.layer]);
            TG.stat.current_wipe[args.layer].animate({ 'opacity': '1' }, 100, 'linear', () => {
                TG.ftag.nextOrder();
            });
        }
    }

    /**
     * [wipe_chara_mod name="chara_name" face="image_name" layer="message_layer_num"]
     * ワイプにキャラ表示、表情指定あり
     * wipe_chara_showと同じ（chara_modとあわせて使うことを想定したエイリアス)
     */
    tyrano.plugin.kag.tag.wipe_chara_mod = tyrano.plugin.kag.tag.wipe_chara_show;

    /**
     * [wipe_chara_hide layer="message_layer_num"]
     * ワイプに表示されているキャラを隠す
     */
    tyrano.plugin.kag.tag.wipe_chara_hide = {
        vital: [],
        pm   : { layer: 0 },
        start: (args) => {
            const TG = TYRANO.kag;
            if (TG.stat.current_wipe[args.layer] instanceof jQuery)
                TG.stat.current_wipe[args.layer].animate({ 'opacity': '0' }, 100, 'linear');
            TG.ftag.nextOrder();
        } 
    }

    tagNames.forEach((tagName) => {
        tyrano.plugin.kag.ftag.master_tag[tagName] = object(tyrano.plugin.kag.tag[tagName]);
    });
})();