import WebGL = Laya.WebGL;
import Handler = Laya.Handler;

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
        caster.CharacterPos(300, 200);
        caster.loadImage('../laya/assets/white.png', 0, 0, caster.width, caster.height);

        Laya.stage.addChild(caster);

        let casterControl: CharacterCon = new CharacterCon(caster);



        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler, [casterControl])

    }

    private mouseHandler(casterControl: CharacterCon, e: Event): void {
        if (b) 
            casterControl.Hide();
        else
            casterControl.Show();
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