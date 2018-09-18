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
var skins = ['../laya/assets/white.png', '../laya/assets/defeaultSkin.png', '../laya/assets/gamearea.png'];
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.loader.load(skins, Handler.create(this, this.GameInit));
    }
    GameMain.prototype.GameInit = function () {
        var caster = new Character('caster', 150, 300);
        caster.CharacterPos(gloablWidth / 2, gloablHeight / 2);
        caster.loadImage(skins[0], 0, 0, caster.width, caster.height);
        var casterControl = new CharacterCon(caster);
        var bg = new Background();
        var gameControl = new GameCon(caster, casterControl, bg);
        gameControl.StageInit();
        gameControl.StageEventInit();
        gameControl.GameStart();
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