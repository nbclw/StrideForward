import WebGL = Laya.WebGL;
import Handler = Laya.Handler;

//全局参数
let bonesConfig = GameGlobal.BONESCONFIG;

import Background = BackgroundUI.Backgrounds;
import Bone = BoneModal.Bone;
import Character = CharacterModal.Character;
import CharacterCon = CharacterControl.Control;
import GameCon = GameControl.Control;

let gloablWidth = 600;
let gloablHeight = 400;
let skins: string[] = ['../laya/assets/white.png', '../laya/assets/defeaultSkin.png','../laya/assets/gamearea.png'];

// 程序入口
class GameMain {
    constructor() {
        Laya.loader.load(skins, Handler.create(this, this.GameInit));
    }
    private GameInit(): void {
        let caster: Character = new Character('caster', 150, 300);
        caster.CharacterPos(gloablWidth / 2, gloablHeight / 2);
        caster.loadImage(skins[0], 0, 0, caster.width, caster.height);

        let casterControl: CharacterCon = new CharacterCon(caster);

        let bg: Background = new Background();

        let gameControl: GameCon = new GameCon(caster, casterControl, bg);
        gameControl.StageInit();
        gameControl.StageEventInit();
        gameControl.GameStart();
    }
}

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(gloablWidth, gloablHeight, WebGL);
//开启统计信息
Laya.Stat.show(0, 200);

new GameMain();
//'portrait'
//window.innerWidth
//window.innerHeight