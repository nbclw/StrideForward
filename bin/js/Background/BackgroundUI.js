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
    var Backgrounds = /** @class */ (function (_super) {
        __extends(Backgrounds, _super);
        function Backgrounds() {
            var _this = _super.call(this) || this;
            _this.size(gloablWidth, gloablHeight);
            _this.btnWidth = _this.width / 10;
            _this.btnHeight = _this.btnWidth / 2;
            _this.CreateUI();
            _this.addChild(_this.initArea);
            _this.bgStatus = BackgroundStatus.INIT;
            return _this;
        }
        Backgrounds.prototype.LoadInitArea = function () {
            if (this.bgStatus == BackgroundStatus.INIT)
                return;
            this.RemoveAllArea();
            this.addChild(this.initArea);
        };
        Backgrounds.prototype.LoadGameArea = function () {
            if (this.bgStatus == BackgroundStatus.GAMING)
                return;
            this.RemoveAllArea();
            this.addChild(this.gameArea);
        };
        Backgrounds.prototype.RemoveAllArea = function () {
            for (var i = 0; i < this._childs.length; i++)
                this.removeChild(this._childs[i]);
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
            this.btnBack = new Button();
            this.btnBack.size(this.btnWidth, this.btnHeight);
            this.btnBack.pos(this.btnHeight, this.btnHeight);
            this.btnBack.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnBack.width, this.btnBack.height);
            this.btnBack.label = '返回';
            this.gameArea.addChild(this.btnBack);
            this.btnPause = new Button();
            this.btnPause.size(this.btnWidth, this.btnHeight);
            this.btnPause.pos(this.btnWidth + this.btnHeight, this.btnHeight);
            this.btnPause.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnPause.width, this.btnPause.height);
            this.btnPause.label = '暂停';
            this.gameArea.addChild(this.btnPause);
            this.btnRePlay = new Button();
            this.btnRePlay.size(this.btnWidth, this.btnHeight);
            this.btnRePlay.pos(2 * (this.btnWidth + this.btnHeight), this.btnHeight);
            this.btnRePlay.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnRePlay.width, this.btnRePlay.height);
            this.btnRePlay.label = '重玩';
            this.gameArea.addChild(this.btnRePlay);
            this.btnPlay = new Button();
            this.btnPlay.size(this.btnWidth, this.btnHeight);
            this.btnPlay.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnPlay.width, this.btnPlay.height);
            this.btnPlay.label = '继续';
        };
        return Backgrounds;
    }(View));
    BackgroundUI.Backgrounds = Backgrounds;
})(BackgroundUI || (BackgroundUI = {}));
//# sourceMappingURL=BackgroundUI.js.map