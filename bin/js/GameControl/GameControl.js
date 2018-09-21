/**
* 游戏控制器
*/
var GameControl;
(function (GameControl) {
    var Control = /** @class */ (function () {
        function Control() {
            this.pressUnitTime = 50; //按下的单位时间，毫秒为单位
            this.pressMaxTime = 1000; //按下的最大时间，毫秒为单位
            this.CreateAction();
        }
        Control.prototype.CreateAction = function () {
            this.character = new Character('caster', 150, 300);
            this.character.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.character.width, this.character.height);
            this.characterControl = new CharacterCon(this.character);
            this.bg = new Background();
        };
        Control.prototype.StageInit = function () {
            Laya.stage.addChild(this.bg);
            this.StageEventInit();
            this.bg.LoadInitArea(LoadDirection.DOWN);
        };
        Control.prototype.StageEventInit = function () {
            this.bg.btnEnter.clickHandler = Handler.create(this, function () {
                this.bg.LoadGameArea(LoadDirection.DOWN);
                this.GameStart();
            }, [], false);
            this.bg.btnRank.clickHandler = Handler.create(this, function () {
                console.log('排行榜');
            }, [], false);
            this.bg.btnBack.clickHandler = Handler.create(this, function () {
                this.GameStop();
                this.bg.LoadInitArea(LoadDirection.UP);
            }, [], false);
            this.bg.btnPause.clickHandler = Handler.create(this, function () {
                this.bg.dlgPause.popup();
            }, [], false);
            this.bg.btnPlay.clickHandler = Handler.create(this, function () {
                this.bg.dlgPause.close();
            }, [], false);
            this.bg.btnRePlay.clickHandler = Handler.create(this, function () {
                this.GameReset();
            }, [], false);
        };
        Control.prototype.GameStart = function () {
            this.bg.hitArea.addChild(this.character);
            this.character.pos(10, (this.bg.hitArea.height - this.character.height) / 2);
            this.characterControl.Show();
            this.characterControl.ResetCharacter();
            this.bg.hitArea.on(Laya.Event.MOUSE_DOWN, this, this.MouseDownEvent);
            this.bg.hitArea.on(Laya.Event.MOUSE_UP, this, this.MouseUpEvent);
            this.bg.hitArea.on(Laya.Event.MOUSE_OUT, this, this.MouseOutEvent); //防止意外，按住的时候移动到别的位置，就监听不到mouseup事件了
        };
        Control.prototype.GameStop = function () {
            this.characterControl.Hide();
            this.bg.hitArea.removeChild(this.character);
            this.bg.hitArea.off(Laya.Event.MOUSE_DOWN, this, this.MouseDownEvent);
            this.bg.hitArea.off(Laya.Event.MOUSE_UP, this, this.MouseUpEvent);
            this.bg.hitArea.off(Laya.Event.MOUSE_OUT, this, this.MouseOutEvent);
        };
        Control.prototype.GameReset = function () {
            this.characterControl.ResetCharacter();
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
            console.log(pre);
        };
        Control.prototype.LogMouseDownTime = function () {
            this.pressTime += this.pressUnitTime;
        };
        return Control;
    }());
    GameControl.Control = Control;
})(GameControl || (GameControl = {}));
//# sourceMappingURL=GameControl.js.map