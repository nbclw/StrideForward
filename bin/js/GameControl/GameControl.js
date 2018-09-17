/**
* 游戏控制器
*/
var GameControl;
(function (GameControl) {
    var b = false;
    var Control = /** @class */ (function () {
        function Control(character, characterControl, bg) {
            this.character = character;
            this.characterControl = characterControl;
            this.bg = bg;
        }
        Control.prototype.StageInit = function () {
            Laya.stage.addChild(this.character);
            Laya.stage.addChild(this.bg);
        };
        Control.prototype.StageEventInit = function () {
            Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.rightMouseHandler);
            this.bg.btnWalk20.clickHandler = Handler.create(this, this.mouseHandler, [20], false);
            this.bg.btnWalk30.clickHandler = Handler.create(this, this.mouseHandler, [30], false);
            this.bg.btnWalk50.clickHandler = Handler.create(this, this.mouseHandler, [50], false);
        };
        Control.prototype.mouseHandler = function (dis, e) {
            if (b) {
                this.characterControl.Wlak(dis);
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