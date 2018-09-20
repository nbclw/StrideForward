var WebGL = Laya.WebGL;
var Handler = Laya.Handler;
var Tween = Laya.Tween;
var Ease = Laya.Ease;
//全局参数
var bonesConfig = GameGlobal.BONESCONFIG;
var Progress = LoadProgress.Progress;
var Background = BackgroundUI.Backgrounds;
var Bone = BoneModal.Bone;
var Character = CharacterModal.Character;
var CharacterCon = CharacterControl.Control;
var GameCon = GameControl.Control;
var gloablWidth = 600;
var gloablHeight = 400;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.loader.load([GameGlobal.RESOURCES.IMG.PROGRESS, GameGlobal.RESOURCES.IMG.PROGRESS_EMPTY], Handler.create(this, this.Loading));
    }
    GameMain.prototype.Loading = function () {
        var progress = new Progress();
        Laya.stage.addChild(progress);
        progress.progressBar.changeHandler = new Handler(this, this.progressBar_Changed, [progress]);
        //clw
        Laya.timer.loop(100, this, function () {
            progress.progressBar.value += 0.2;
        });
    };
    GameMain.prototype.progressBar_Changed = function (progress, value) {
        if (value >= 1) {
            Laya.timer.clearAll(this);
            this.GameInit();
            Tween.to(progress, { y: -gloablHeight }, GameGlobal.TWEENTIME, Ease['expoOut'], Handler.create(this, function () {
                Laya.stage.removeChild(progress);
            }));
        }
    };
    GameMain.prototype.GameInit = function () {
        var gameControl = new GameCon();
        gameControl.StageInit();
    };
    return GameMain;
}());
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
//# sourceMappingURL=LayaSample.js.map