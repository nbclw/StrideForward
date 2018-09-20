/**
* 游戏控制器
*/
var GameControl;
(function (GameControl) {
    var b = false;
    var Control = /** @class */ (function () {
        function Control() {
            this.pressUnitTime = 100; //按下的单位时间，毫秒为单位
            this.pressMaxTime = 4000; //按下的最大时间，毫秒为单位
            this.ActionInit();
        }
        Control.prototype.ActionInit = function () {
            this.character = new Character('caster', 150, 300);
            this.character.CharacterPos(gloablWidth / 2, gloablHeight / 2);
            this.character.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.character.width, this.character.height);
            this.characterControl = new CharacterCon(this.character);
            this.bg = new Background();
        };
        Control.prototype.StageInit = function () {
            Laya.stage.addChild(this.bg);
            this.bg.LoadInitArea(LoadDirection.DOWN);
            //Laya.stage.addChild(this.character);
        };
        Control.prototype.StageEventInit = function () {
            //Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.rightMouseHandler);
            this.bg.btnWalk20.clickHandler = Handler.create(this, this.btnClick, [0.2], false);
            this.bg.btnWalk30.clickHandler = Handler.create(this, this.btnClick, [0.3], false);
            this.bg.btnWalk50.clickHandler = Handler.create(this, this.btnClick, [0.5], false);
            this.bg.btnWalk100.clickHandler = Handler.create(this, this.btnClick, [1], false);
        };
        Control.prototype.GameStart = function () {
            // this.bg.gameArea.on(Laya.Event.MOUSE_DOWN, this, this.MouseDownEvent);
            // this.bg.gameArea.on(Laya.Event.MOUSE_UP, this, this.MouseUpEvent);
            // this.bg.gameArea.on(Laya.Event.MOUSE_OUT, this, this.MouseOutEvent);//防止意外，按住的时候移动到别的位置，就监听不到mouseup事件了
        };
        Control.prototype.MouseDownEvent = function (e) {
            this.pressTime = 0;
            Laya.timer.loop(this.pressUnitTime, this, this.LogMouseDownTime);
        };
        Control.prototype.MouseOutEvent = function (e) {
            Laya.timer.clear(this, this.LogMouseDownTime);
        };
        Control.prototype.MouseUpEvent = function (e) {
            Laya.timer.clear(this, this.LogMouseDownTime);
            var pre = this.pressTime < this.pressMaxTime ? this.pressTime / this.pressMaxTime : 1;
            this.characterControl.Wlak(pre);
        };
        Control.prototype.LogMouseDownTime = function () {
            this.pressTime += this.pressUnitTime;
        };
        Control.prototype.btnClick = function (pre, e) {
            if (b) {
                this.characterControl.Wlak(pre);
            }
        };
        Control.prototype.rightMouseHandler = function (e) {
            if (b)
                this.characterControl.Hide();
            else {
                this.characterControl.Show();
                this.characterControl.ResetBones();
            }
            b = !b;
        };
        return Control;
    }());
    GameControl.Control = Control;
})(GameControl || (GameControl = {}));
//# sourceMappingURL=GameControl.js.map