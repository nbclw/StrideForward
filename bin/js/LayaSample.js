var WebGL = Laya.WebGL;
var Handler = Laya.Handler;
//全局参数
var bonesConfig = GameGlobal.BONESCONFIG;
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
        this.GameInit();
    }
    GameMain.prototype.GameInit = function () {
        var gameControl = new GameCon();
        gameControl.StageInit();
        //gameControl.StageEventInit();
        //gameControl.GameStart();
    };
    return GameMain;
}());
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
//# sourceMappingURL=LayaSample.js.map