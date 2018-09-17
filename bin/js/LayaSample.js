var WebGL = Laya.WebGL;
var Handler = Laya.Handler;
//全局参数
var bonesConfig = GameGlobal.BONESCONFIG;
var Background = BackgroundUI.Backgrounds;
var Bone = BoneModal.Bone;
var Character = CharacterModal.Character;
var CharacterCon = CharacterControl.Control;
var gloablWidth = 600;
var gloablHeight = 400;
var b = false;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        var caster = new Character('caster', 150, 300);
        caster.CharacterPos(gloablWidth / 2, gloablHeight / 2);
        caster.loadImage('../laya/assets/white.png', 0, 0, caster.width, caster.height);
        Laya.stage.addChild(caster);
        var casterControl = new CharacterCon(caster);
        var bg = new Background();
        Laya.stage.addChild(bg);
        console.log(bg.btnWalk20);
        bg.btnWalk20.clickHandler.setTo(this, this.rightMouseHandler, [casterControl], false);
        Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.rightMouseHandler, [casterControl]);
    }
    GameMain.prototype.mouseHandler = function (casterControl, e) {
        if (b) {
            casterControl.Wlak(90);
        }
    };
    GameMain.prototype.rightMouseHandler = function (casterControl, e) {
        if (b)
            casterControl.Hide();
        else {
            casterControl.Show();
            casterControl.ResetBones();
        }
        b = !b;
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