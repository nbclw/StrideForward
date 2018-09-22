import WebGL = Laya.WebGL;
import Handler = Laya.Handler;
import Tween = Laya.Tween;
import Ease = Laya.Ease;

//全局参数
let bonesConfig = GameGlobal.BONESCONFIG;
//进度条
import Progress = LoadProgress.Progress;
//背景ui
import Background = BackgroundUI.Backgrounds;
//角色
import Bone = BoneModal.Bone;
import Character = CharacterModal.Character;
import CharacterCon = CharacterControl.Control;
//路
import Road = EndlessRoadModal.EndlessRoad;
import RoadSign = RoadSignModal.RoadSign;
//游戏控制器
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
        progress.progressBar.changeHandler = new Handler(this, this.progressBar_Changed, [progress]);

        //clw
        Laya.timer.loop(100, this, function () {
            progress.progressBar.value += 0.2;
        });
    }

    private progressBar_Changed(progress: Progress, value: number): void {
        if (value >= 1) {
            Laya.timer.clearAll(this);
            this.GameInit();
            Tween.to(progress, { y: -gloablHeight }, GameGlobal.TWEENTIME, Ease['expoOut'], Handler.create(this, function () {
                Laya.stage.removeChild(progress);
            }));
        }
    }

    private GameInit(): void {
        let gameControl: GameCon = new GameCon();
        gameControl.StageInit();
    }
}

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(gloablWidth, gloablHeight, WebGL);
//开启统计信息
Laya.Stat.show(gloablWidth - 120, gloablHeight - 80);

new GameMain();
//'portrait'
//window.innerWidth
//window.innerHeight