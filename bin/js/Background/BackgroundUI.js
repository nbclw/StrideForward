var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* UI
*/
var BackgroundUI;
(function (BackgroundUI) {
    var View = Laya.View;
    var Sprite = Laya.Sprite;
    var Button = Laya.Button;
    var Dialog = Laya.Dialog;
    var Backgrounds = /** @class */ (function (_super) {
        __extends(Backgrounds, _super);
        function Backgrounds() {
            var _this = _super.call(this) || this;
            _this.currArea = null; //当前的区域
            _this.size(gloablWidth, gloablHeight);
            _this.btnWidth = _this.width / 10;
            _this.btnHeight = _this.btnWidth / 2;
            _this.CreateUI();
            _this.bgStatus = BackgroundStatus.LOADING;
            return _this;
        }
        Backgrounds.prototype.LoadInitArea = function (dir) {
            if (this.bgStatus == BackgroundStatus.INIT)
                return;
            var btns = [this.btnRank, this.btnEnter];
            this.SetButtonsDisabled(btns, true);
            this.LoadArea(this.initArea, dir, btns);
            this.bgStatus = BackgroundStatus.INIT;
        };
        Backgrounds.prototype.LoadGameArea = function (dir) {
            if (this.bgStatus == BackgroundStatus.GAMING)
                return;
            var btns = [this.btnBack, this.btnPause, this.btnRePlay];
            this.SetButtonsDisabled(btns, true);
            this.LoadArea(this.gameArea, dir, btns);
            this.bgStatus = BackgroundStatus.GAMING;
        };
        //区域画面的进出
        Backgrounds.prototype.LoadArea = function (area, dir, btns, banTween) {
            this.addChild(area);
            if (banTween) {
                if (this.currArea != null)
                    this.removeChild(this.currArea);
                this.currArea = area;
                this.SetButtonsDisabled(btns, false);
            }
            else {
                var initX = 0, initY = 0;
                switch (dir) {
                    case LoadDirection.UP:
                        initY = -this.height;
                        break;
                    case LoadDirection.DOWN:
                        initY = this.height;
                        break;
                    case LoadDirection.LEFT:
                        initX = -this.width;
                        break;
                    case LoadDirection.RIGHT:
                        initX = this.width;
                        break;
                }
                if (initX != 0 || initY != 0) {
                    area.pos(initX, initY);
                    if (this.currArea != null) {
                        Tween.to(this.currArea, { x: -initX, y: -initY }, GameGlobal.TWEENTIME, Ease['expoOut'], Handler.create(this, function () {
                            this.removeChild(this.currArea);
                            this.currArea = area;
                        }));
                    }
                    else
                        this.currArea = area;
                    Tween.to(area, { x: 0, y: 0 }, GameGlobal.TWEENTIME, Ease['expoOut'], Handler.create(this, function () {
                        this.SetButtonsDisabled(btns, false);
                    }));
                }
                else {
                    area.pos(0, 0);
                    if (this.currArea != null)
                        this.removeChild(this.currArea);
                    this.currArea = area;
                    this.SetButtonsDisabled(btns, false);
                }
            }
        };
        Backgrounds.prototype.SetButtonsDisabled = function (btns, disabled) {
            for (var i = 0; i < btns.length; i++)
                btns[i].disabled = disabled;
        };
        //创建各个元素
        Backgrounds.prototype.CreateUI = function () {
            this.initArea = new Sprite();
            this.initArea.size(this.width, this.height);
            this.initArea.loadImage(GameGlobal.RESOURCES.IMG.INITAREA, 0, 0, this.initArea.width, this.initArea.height);
            this.btnEnter = new Button();
            this.btnEnter.size(this.btnWidth, this.btnHeight);
            this.btnEnter.pos((this.width - this.btnWidth) / 2, this.height / 2 - 2 * this.btnHeight);
            this.btnEnter.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnEnter.width, this.btnEnter.height);
            this.btnEnter.label = '开始游戏';
            this.initArea.addChild(this.btnEnter);
            this.btnRank = new Button();
            this.btnRank.size(this.btnWidth, this.btnHeight);
            this.btnRank.pos((this.width - this.btnWidth) / 2, this.height / 2);
            this.btnRank.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnRank.width, this.btnRank.height);
            this.btnRank.label = '排行榜';
            this.initArea.addChild(this.btnRank);
            this.gameArea = new Sprite();
            this.gameArea.size(this.width, this.height);
            this.gameArea.loadImage(GameGlobal.RESOURCES.IMG.GAMEAREA, 0, 0, this.gameArea.width, this.gameArea.height);
            this.hitArea = new Sprite();
            this.hitArea.size(this.gameArea.width, this.gameArea.height - this.btnHeight);
            this.hitArea.pos(0, this.btnHeight);
            this.hitArea.loadImage(GameGlobal.RESOURCES.IMG.HITAREA, 0, 0, this.gameArea.width, this.gameArea.height - this.btnHeight);
            this.gameArea.addChild(this.hitArea);
            this.redLine = new Sprite();
            this.redLine.pos(0, this.hitArea.height * 11 / 16);
            this.redLine.graphics.drawLine(0, 0, this.hitArea.width, 0, 'red', 2);
            this.redLine.alpha = 0.3;
            this.hitArea.addChild(this.redLine);
            this.redLine.zOrder = 999;
            var txt = new Laya.Text();
            txt.text = 'score:0';
            txt.fontSize = 20;
            this.scoreInfo = new Sprite();
            this.scoreInfo.pos(this.width / 2, 0);
            this.scoreInfo.addChild(txt);
            this.hitArea.addChild(this.scoreInfo);
            this.btnBack = new Button();
            this.btnBack.size(this.btnWidth, this.btnHeight);
            this.btnBack.pos(this.btnHeight, 0);
            this.btnBack.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnBack.width, this.btnBack.height);
            this.btnBack.label = '返回';
            this.gameArea.addChild(this.btnBack);
            this.btnPause = new Button();
            this.btnPause.size(this.btnWidth, this.btnHeight);
            this.btnPause.pos(this.btnWidth + 2 * this.btnHeight, 0);
            this.btnPause.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnPause.width, this.btnPause.height);
            this.btnPause.label = '暂停';
            this.gameArea.addChild(this.btnPause);
            this.btnRePlay = new Button();
            this.btnRePlay.size(this.btnWidth, this.btnHeight);
            this.btnRePlay.pos(2 * (this.btnWidth + this.btnHeight) + this.btnHeight, 0);
            this.btnRePlay.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnRePlay.width, this.btnRePlay.height);
            this.btnRePlay.label = '重玩';
            this.gameArea.addChild(this.btnRePlay);
            this.dlgPause = new Dialog();
            this.dlgPause.size(this.width, this.height);
            this.btnPlay = new Button();
            this.btnPlay.size(this.btnWidth, this.btnHeight);
            this.btnPlay.pos((this.dlgPause.width - this.btnPlay.width) / 2, (this.dlgPause.height - this.btnPlay.height) / 2);
            this.btnPlay.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnPlay.width, this.btnPlay.height);
            this.btnPlay.label = '继续';
            this.dlgPause.addChild(this.btnPlay);
            this.dlgOver = new Dialog();
            this.dlgOver.size(this.width, this.height);
            this.btnGoOn = new Button();
            this.btnGoOn.size(this.btnWidth, this.btnHeight);
            this.btnGoOn.pos((this.dlgOver.width - this.btnGoOn.width) / 2, (this.dlgOver.height - this.btnGoOn.height) / 2);
            this.btnGoOn.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnGoOn.width, this.btnGoOn.height);
            this.btnGoOn.label = '继续上次';
            this.dlgOver.addChild(this.btnGoOn);
        };
        return Backgrounds;
    }(View));
    BackgroundUI.Backgrounds = Backgrounds;
})(BackgroundUI || (BackgroundUI = {}));
//# sourceMappingURL=BackgroundUI.js.map