import WebGL = Laya.WebGL;
import Handler = Laya.Handler;

//全局参数
let bonesConfig = GameGlobal.BONESCONFIG;

import Progress = LoadProgress.Progress;
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
        Laya.loader.load([GameGlobal.RESOURCES.IMG.PROGRESS, GameGlobal.RESOURCES.IMG.PROGRESS_EMPTY], Handler.create(this, this.Loading));
    }
    private Loading(): void {
        let progress: Progress = new Progress();
        Laya.stage.addChild(progress);
        progress.progressBar.changeHandler = new Handler(this, this.progressBar_Changed,[progress]);

        //clw
        Laya.timer.loop(1000, this, function () {
            progress.progressBar.value += 0.2;
        });
    }

    private progressBar_Changed(progress: Progress, value: number): void {
        if (value >= 1) {
            Laya.timer.clearAll(this);
            //Laya.stage.removeChild(progress);
            progress.alpha=0.5
            //this.GameInit();
        }
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