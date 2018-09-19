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
* name
*/
var LoadProgress;
(function (LoadProgress) {
    var View = Laya.View;
    var Sprite = Laya.Sprite;
    var ProgressBar = Laya.ProgressBar;
    var Progress = /** @class */ (function (_super) {
        __extends(Progress, _super);
        function Progress() {
            var _this = _super.call(this) || this;
            _this.loadArea = new Sprite();
            _this.loadArea.size(gloablWidth, gloablHeight);
            _this.loadArea.loadImage(GameGlobal.RESOURCES.IMG.LOADAREA, 0, 0, _this.loadArea.width, _this.loadArea.height);
            _this.progressBar = new ProgressBar(GameGlobal.RESOURCES.IMG.PROGRESS);
            _this.progressBar.size(gloablWidth * 4 / 5, gloablWidth / 40);
            _this.progressBar.pos((gloablWidth - _this.progressBar.width) / 2, gloablHeight / 2);
            _this.progressBar.value = 0;
            _this.loadArea.addChild(_this.progressBar);
            _this.addChild(_this.loadArea);
            return _this;
        }
        return Progress;
    }(View));
    LoadProgress.Progress = Progress;
})(LoadProgress || (LoadProgress = {}));
//# sourceMappingURL=LoadProgress.js.map