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

// 程序入口
class GameMain {
    constructor() {
        this.GameInit();
    }
    private GameInit(): void {
        let gameControl: GameCon = new GameCon();
        gameControl.StageInit();
        //gameControl.StageEventInit();
        //gameControl.GameStart();
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