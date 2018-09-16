import WebGL = Laya.WebGL;
import Handler = Laya.Handler;

//全局参数
let bonesConfig = GameGlobal.BONESCONFIG;

import Background = BackgroundUI.Backgrounds;
import Bone = BoneModal.Bone;
import Character = CharacterModal.Character;
import CharacterCon = CharacterControl.Control;

let gloablWidth = 600;
let gloablHeight = 400;
let b = false;
// 程序入口
class GameMain {
    constructor() {

        
        let caster: Character = new Character('caster', 150, 300);
        caster.CharacterPos(gloablWidth/2, gloablHeight/2);
        caster.loadImage('../laya/assets/white.png', 0, 0, caster.width, caster.height);

        Laya.stage.addChild(caster);

        let casterControl: CharacterCon = new CharacterCon(caster);

        Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.rightMouseHandler, [casterControl]);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler, [casterControl, caster]);
    }

    private mouseHandler(casterControl: CharacterCon, character: Character, e: Event): void {
        if (b) {
            casterControl.Wlak(200);
        }
    }
    private rightMouseHandler(casterControl: CharacterCon, e: Event): void {
        if (b)
            casterControl.Hide();
        else {
            casterControl.Show();
            casterControl.ResetBones();
        }
        b = !b;
    }
}

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(gloablWidth, gloablHeight, WebGL);
//开启统计信息
Laya.Stat.show();

new GameMain();
//'portrait'
//window.innerWidth
//window.innerHeight